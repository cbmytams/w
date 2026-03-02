"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRANDS_QUESTIONS, TALENTS_QUESTIONS, QuestionData } from "@/lib/questionnaireData";

interface Props {
    type: "TALENTS" | "BRANDS";
}

export function QuestionnaireEngine({ type }: Props) {
    // Use the recovered question objects that contain all options/branching rules.
    const questionsList = type === "BRANDS" ? BRANDS_QUESTIONS : TALENTS_QUESTIONS;

    const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // Evaluate jump logic: filter questions that should be shown based on conditions.
    const visibleQuestions = useMemo(() => {
        return questionsList.filter((q) => {
            if (!q.conditions || q.conditions.length === 0) return true;
            return q.conditions.every((cond) => {
                const dependentAnswer = answers[cond.questionId];
                if (cond.operator === "equals") return dependentAnswer === cond.value;
                if (cond.operator === "not_equals") return dependentAnswer !== cond.value;
                if (cond.operator === "contains" && Array.isArray(dependentAnswer)) {
                    return dependentAnswer.includes(cond.value);
                }
                return false;
            });
        });
    }, [answers, questionsList]);

    // Adjust current index if it goes out of bounds after filtering
    useEffect(() => {
        if (currentStepIndex >= visibleQuestions.length && visibleQuestions.length > 0) {
            setCurrentStepIndex(visibleQuestions.length - 1);
        }
    }, [visibleQuestions, currentStepIndex]);

    const currentQuestion = visibleQuestions[currentStepIndex];
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === visibleQuestions.length - 1;
    const progressPercent = ((currentStepIndex) / visibleQuestions.length) * 100;

    const handleNext = () => {
        if (!isLastStep) setCurrentStepIndex(i => i + 1);
    };

    const handleBack = () => {
        if (!isFirstStep) setCurrentStepIndex(i => i - 1);
    };

    const setAnswer = (id: string, value: string | string[] | number) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // POST the payload to our existing unified API endpoint
            const response = await fetch('/api/v1/questionnaires/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type,
                    responses: answers
                }),
            });
            if (!response.ok) throw new Error("Erreur serveur lors de la soumission");
            setHasSubmitted(true);
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue lors de la soumission.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ---------------------------------------------------------------------------
    // RENDER INTERFACE UI
    // ---------------------------------------------------------------------------

    if (!currentQuestion) return null;

    if (hasSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-500/10 text-green-400 p-6 rounded-full inline-block mb-6 shadow-lg border border-green-500/20"
                >
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>
                <h1 className="text-3xl font-bold mb-4 tracking-tight">C'est noté !</h1>
                <p className="text-zinc-400 max-w-md mx-auto mb-8 text-lg font-light leading-relaxed">
                    Merci pour vos réponses. Notre équipe va analyser votre diagnostic et vous recontacter rapidement.
                </p>
                <a href="/" className="inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide text-white transition-all duration-200 bg-white/10 rounded-full hover:bg-white/20 hover:scale-105 active:scale-95">
                    Retour au site
                </a>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen relative tracking-tight selection:bg-purple-500/30">

            {/* 1. Header & ProgressBar */}
            <header className="fixed top-0 left-0 right-0 z-50 p-6 border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <a href={`/for-${type.toLowerCase()}`} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-200">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                        Retour
                    </a>

                    <div className="flex flex-col items-center flex-1 mx-8 max-w-xs">
                        <span className="text-[10px] font-bold tracking-widest text-[#5E5EDD] uppercase mb-2 block">
                            {progressPercent.toFixed(0)}% COMPLÉTÉ
                        </span>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#5E5EDD] to-purple-500 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
                        </div>
                    </div>

                    <div className="w-16"></div> {/* Spacer for symmetry */}
                </div>
            </header>

            {/* 2. Main Question Area */}
            <main className="flex-1 flex flex-col justify-center items-center p-6 mt-20 mb-24">
                <div className="w-full max-w-2xl relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full"
                        >
                            {/* CATEGORY CHIP */}
                            <div className="mb-6 flex justify-center">
                                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-white/[0.03] border border-white/5 text-zinc-400">
                                    {currentQuestion.category.replace('_', ' ')}
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center text-white/90">
                                {currentQuestion.question}
                            </h2>
                            {currentQuestion.subtitle && (
                                <p className="text-zinc-500 text-center mb-10 text-sm md:text-base font-light">
                                    {currentQuestion.subtitle}
                                </p>
                            )}

                            {/* DYNAMIC FIELD RENDERING */}
                            <div className="mt-8 space-y-3">
                                <StepRenderer
                                    question={currentQuestion}
                                    value={answers[currentQuestion.id]}
                                    onChange={(val) => setAnswer(currentQuestion.id, val)}
                                    onAutoNext={handleNext}
                                />
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* 3. Footer Navigation Controls */}
            <footer className="fixed bottom-0 left-0 right-0 z-40 p-6 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none">
                <div className="max-w-4xl mx-auto flex justify-between items-center pointer-events-auto">

                    <button
                        onClick={handleBack}
                        disabled={isFirstStep}
                        className={`flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all ${isFirstStep ? 'opacity-0 cursor-default' : 'opacity-100'}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>

                    {isLastStep ? (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="h-12 px-8 flex items-center justify-center rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Validation...
                                </span>
                            ) : 'Terminer & Envoyer'}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    )}

                </div>
            </footer>

        </div>
    );
}

// ---------------------------------------------------------------------------
// RENDERER POUR CHAQUE TYPE DE QUESTION
// ---------------------------------------------------------------------------

function StepRenderer({ question, value, onChange, onAutoNext }: { question: QuestionData, value: any, onChange: (v: any) => void, onAutoNext: () => void }) {

    // SINGLE CHOICE
    if (question.type === "single" && question.options) {
        return (
            <div className="grid gap-3 w-full max-w-lg mx-auto">
                {question.options.map((opt) => {
                    const isSelected = value === opt.id;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => {
                                onChange(opt.id);
                                // Auto-advance softly for single choices
                                setTimeout(onAutoNext, 300);
                            }}
                            className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-4 group 
                ${isSelected ? 'bg-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'bg-white/[0.02] border-white/[0.05] hover:border-white/20'}`}
                        >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors 
                ${isSelected ? 'border-purple-400 bg-purple-500/20' : 'border-white/20'}`}>
                                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />}
                            </div>
                            <div className="flex-1">
                                <span className="block font-medium text-white/90">{opt.emoji} {opt.label}</span>
                                {opt.description && <span className="block text-sm text-zinc-500 mt-0.5">{opt.description}</span>}
                            </div>
                        </button>
                    );
                })}
            </div>
        );
    }

    // MULTIPLE CHOICE
    if (question.type === "multiple" && question.options) {
        const selectedArray = Array.isArray(value) ? value : [];
        const toggleOption = (id: string) => {
            if (selectedArray.includes(id)) {
                onChange(selectedArray.filter(v => v !== id));
            } else {
                onChange([...selectedArray, id]);
            }
        };
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mx-auto">
                {question.options.map((opt) => {
                    const isSelected = selectedArray.includes(opt.id);
                    return (
                        <button
                            key={opt.id}
                            onClick={() => toggleOption(opt.id)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3
                ${isSelected ? 'bg-white/10 border-white/30' : 'bg-white/[0.02] border-white/[0.05] hover:border-white/20'}`}
                        >
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors 
                ${isSelected ? 'border-purple-400 bg-purple-400' : 'border-white/20'}`}>
                                {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                            </div>
                            <div className="flex-1">
                                <span className="block font-medium text-sm md:text-base text-white/90">{opt.emoji} {opt.label}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        );
    }

    // TEXT / EMAIL / TEL / URL
    if (['text', 'email', 'tel', 'url'].includes(question.type)) {
        return (
            <div className="w-full max-w-lg mx-auto">
                <input
                    type={question.type}
                    placeholder={question.placeholder || "Votre réponse..."}
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && value) onAutoNext();
                    }}
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 px-2 text-2xl md:text-3xl text-white placeholder:text-zinc-700 outline-none focus:border-white/50 transition-colors"
                    autoFocus
                />
            </div>
        );
    }

    // SCALE
    if (question.type === "scale") {
        const min = question.min || 1;
        const max = question.max || 10;
        const scaleValues = Array.from({ length: max - min + 1 }, (_, i) => min + i);

        return (
            <div className="w-full max-w-2xl mx-auto py-8">
                <div className="flex justify-between gap-2 overflow-x-auto pb-4">
                    {scaleValues.map((v) => {
                        const isSelected = value === v;
                        return (
                            <button
                                key={v}
                                onClick={() => {
                                    onChange(v);
                                    setTimeout(onAutoNext, 300);
                                }}
                                className={`flex-shrink-0 w-12 h-16 md:w-16 md:h-20 flex items-center justify-center rounded-2xl border text-xl md:text-2xl font-light transition-all
                  ${isSelected ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:bg-white/5'}`}
                            >
                                {v}
                            </button>
                        );
                    })}
                </div>
                {(question.labels) && (
                    <div className="flex justify-between text-zinc-500 text-sm mt-2 px-2 uppercase tracking-wider font-bold">
                        <span>{question.labels.min || min}</span>
                        <span>{question.labels.max || max}</span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto p-4 text-center border border-dashed border-white/10 rounded-xl text-zinc-500">
            Type de champ non pris en charge ({question.type})
        </div>
    );
}
