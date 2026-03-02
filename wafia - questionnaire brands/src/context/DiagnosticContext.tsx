import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { ALL_QUESTIONS } from '../constants/questions';
import { PILLARS } from '../constants/pillars';
import type { Pillar, PillarKey, Question } from '../types';

interface DiagnosticContextType {
    questions: Question[];
    pillars: Record<PillarKey, Pillar>;
    updateQuestion: (id: string, updates: Partial<Question>) => Promise<void>;
    addQuestion: (question: Question) => Promise<void>;
    deleteQuestion: (id: string) => Promise<void>;
    reorderQuestions: (startIndex: number, endIndex: number) => Promise<void>;
    savePartialProgress: (answers: Record<string, unknown>) => Promise<void>;
    resetToDefaults: () => Promise<void>;
    isLoading: boolean;
}

const DiagnosticContext = createContext<DiagnosticContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = 'wafia_questions_v1';
const LOCAL_FALLBACK_ALLOWED = import.meta.env.DEV && import.meta.env.VITE_ALLOW_LOCAL_QUESTION_FALLBACK === 'true';

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
    const maxRetries = init?.method && init.method !== 'GET' ? 1 : 2;
    let attempt = 0;
    let lastError: Error | null = null;

    while (attempt <= maxRetries) {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch(url, {
                credentials: 'include',
                ...init,
                signal: controller.signal
            });

            if (!response.ok) {
                const payload = await response.json().catch(() => ({})) as { error?: string };
                throw new Error(payload.error || `Request failed (${response.status})`);
            }

            return response.json() as Promise<T>;
        } catch (error) {
            lastError = error instanceof Error ? error : new Error('Unknown request error');
            if (attempt >= maxRetries) {
                throw lastError;
            }
            attempt += 1;
            await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
        } finally {
            window.clearTimeout(timeoutId);
        }
    }

    throw lastError || new Error('Request failed');
}

function loadLocalQuestions(): Question[] {
    if (typeof window === 'undefined') return ALL_QUESTIONS;
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!saved) return ALL_QUESTIONS;
    try {
        const parsed = JSON.parse(saved) as Question[];
        return Array.isArray(parsed) ? parsed : ALL_QUESTIONS;
    } catch {
        return ALL_QUESTIONS;
    }
}

function persistLocalQuestions(questions: Question[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questions));
}

export function DiagnosticProvider({ children }: { children: ReactNode }) {
    const [questions, setQuestions] = useState<Question[]>(ALL_QUESTIONS);
    const [pillars] = useState(PILLARS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            try {
                const payload = await fetchJson<{ questions?: Question[] }>('/api/v1/questionnaires/current');
                if (payload.questions && payload.questions.length > 0) {
                    setQuestions(payload.questions);
                } else {
                    setQuestions(ALL_QUESTIONS);
                }
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.warn('Questionnaire API unavailable', error);
                }
                if (LOCAL_FALLBACK_ALLOWED) {
                    setQuestions(loadLocalQuestions());
                } else {
                    setQuestions(ALL_QUESTIONS);
                }
            } finally {
                setIsLoading(false);
            }
        };

        void initData();
    }, []);

    useEffect(() => {
        if (LOCAL_FALLBACK_ALLOWED) {
            persistLocalQuestions(questions);
        }
    }, [questions]);

    const replaceQuestionSet = async (next: Question[], actionErrorMessage: string) => {
        const previous = questions;
        setQuestions(next);

        try {
            await fetchJson('/api/v1/questionnaires/current', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    version: 'v1',
                    questions: next
                })
            });
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error(actionErrorMessage, error);
            }
            if (!LOCAL_FALLBACK_ALLOWED) {
                setQuestions(previous);
            }
            toast.error(actionErrorMessage);
        }
    };

    const updateQuestion = async (id: string, updates: Partial<Question>) => {
        const next = questions.map((question) => question.id === id ? { ...question, ...updates } : question);
        setQuestions(next);

        try {
            await fetchJson(`/api/v1/questionnaires/questions/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updates })
            });
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Failed to update question on API', error);
            }
            if (!LOCAL_FALLBACK_ALLOWED) {
                setQuestions(questions);
            }
            toast.error('Impossible de sauvegarder la question.');
        }
    };

    const addQuestion = async (question: Question) => {
        const next = [...questions, question];
        setQuestions(next);

        try {
            await fetchJson('/api/v1/questionnaires/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            });
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Failed to add question on API', error);
            }
            if (!LOCAL_FALLBACK_ALLOWED) {
                setQuestions(questions);
            }
            toast.error('Impossible de créer la question.');
        }
    };

    const deleteQuestion = async (id: string) => {
        const next = questions.filter((question) => question.id !== id);
        setQuestions(next);

        try {
            await fetchJson(`/api/v1/questionnaires/questions/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Failed to delete question on API', error);
            }
            if (!LOCAL_FALLBACK_ALLOWED) {
                setQuestions(questions);
            }
            toast.error('Impossible de supprimer la question.');
        }
    };

    const reorderQuestions = async (startIndex: number, endIndex: number) => {
        const reordered = [...questions];
        const [removed] = reordered.splice(startIndex, 1);
        reordered.splice(endIndex, 0, removed);

        setQuestions(reordered.map((question, index) => ({
            ...question,
            order_index: index
        } as Question)));

        try {
            await fetchJson('/api/v1/questionnaires/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ startIndex, endIndex })
            });
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Failed to reorder questions on API', error);
            }
            if (!LOCAL_FALLBACK_ALLOWED) {
                setQuestions(questions);
            }
            toast.error("Impossible d'enregistrer le nouvel ordre.");
        }
    };

    const savePartialProgress = async (answers: Record<string, unknown>) => {
        void answers;
        // Intentional no-op in client context; handled by diagnostic flow persistence.
    };

    const resetToDefaults = async () => {
        if (!confirm('Are you sure you want to reset all questions to default? This cannot be undone.')) {
            return;
        }

        await replaceQuestionSet(ALL_QUESTIONS, 'Impossible de réinitialiser les questions.');
        if (typeof window !== 'undefined') {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            window.location.reload();
        }
    };

    return (
        <DiagnosticContext.Provider value={{
            questions,
            pillars,
            updateQuestion,
            addQuestion,
            deleteQuestion,
            reorderQuestions,
            savePartialProgress,
            resetToDefaults,
            isLoading
        }}
        >
            {children}
        </DiagnosticContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDiagnosticData() {
    const context = useContext(DiagnosticContext);
    if (context === undefined) {
        throw new Error('useDiagnosticData must be used within a DiagnosticProvider');
    }
    return context;
}
