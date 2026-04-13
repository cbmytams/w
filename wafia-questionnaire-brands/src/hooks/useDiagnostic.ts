/**
 * WAFIA BRAND DIAGNOSTIC - DIAGNOSTIC HOOK
 * Hook principal gérant l'état et la logique du diagnostic marque
 * Flow: landing → quick_lead → deep_qualification → results
 */

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import type {
  DiagnosticState,
  AnswerValue,
  CalibrationData,
  BrandDiagnosticResult,
  DiagnosticPhase,
  BrandSection,
  Answers,
  NorthStarObjective,
} from "../types";
import {
  CALIBRATION_QUESTIONS,
  MAIN_QUESTIONS,
  INITIAL_SCORES,
} from "../constants";
import {
  calculateScores,
  generateDiagnosticResult,
  getLevelLabel,
} from "../utils/scoring";
import { filterVisibleQuestions } from "../utils/conditions";

const safeLocalStorage = () => {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
};

const getInitialPhase = (): DiagnosticPhase => {
  if (typeof window === "undefined") return "landing";
  const path = window.location.pathname;
  if (path.includes("/admin")) return "admin";
  if (path.includes("/fiche") || path.includes("/results")) return "results";
  return "landing";
};

const createSessionId = () => {
  const cryptoRef =
    typeof globalThis !== "undefined" ? globalThis.crypto : undefined;
  if (cryptoRef?.randomUUID) return cryptoRef.randomUUID();
  return `sid_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
};

const EMPTY_CALIBRATION: CalibrationData = {
  northStar: null,
  companyName: null,
  contactName: null,
  contactEmail: null,
  budget: null,
  urgency: null,
};

const SENSITIVE_ANSWER_KEY_PATTERN =
  /email|phone|tel|mobile|name|prenom|nom|contact|company|societe|agency|linkedin|instagram|tiktok|youtube|portfolio|site|url/i;

const sanitizeAnswersForStorage = (answers: Answers): Answers => {
  return Object.entries(answers).reduce<Answers>((acc, [key, value]) => {
    if (!SENSITIVE_ANSWER_KEY_PATTERN.test(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

const buildInitialState = (
  phase: DiagnosticPhase,
  answers?: Answers
): DiagnosticState => {
  // Route protection: prevent accessing results without data
  if (phase === "results" && (!answers || Object.keys(answers).length === 0)) {
    if (import.meta.env.DEV) {
      console.warn(
        "⚠️ Attempted to access /results without completing diagnostic. Redirecting to landing."
      );
    }
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", "/");
    }
    return {
      phase: "landing",
      currentQuestionIndex: 0,
      calibration: { ...EMPTY_CALIBRATION },
      answers: {},
      scores: { ...INITIAL_SCORES },
      interstitial: undefined,
    };
  }

  return {
    phase,
    currentQuestionIndex: 0,
    calibration: answers
      ? deriveCalibrationFromAnswers(answers)
      : { ...EMPTY_CALIBRATION },
    answers: answers || {},
    scores: { ...INITIAL_SCORES },
    interstitial: undefined,
  };
};

const deriveCalibrationFromAnswers = (answers: Answers): CalibrationData => ({
  northStar:
    (answers["ql_objective"] as NorthStarObjective) ||
    (answers["b_north_star"] as NorthStarObjective) ||
    null,
  companyName: (answers["ql_company"] as string) || null,
  contactName: (answers["ql_name"] as string) || null,
  contactEmail: (answers["ql_email"] as string) || null,
  budget:
    (answers["ql_budget"] as string) ||
    (answers["f_budget_global"] as string) ||
    null,
  urgency: (answers["ql_urgency"] as string) || null,
});

export const hasLeadIdentity = (answers: Answers) =>
  typeof answers.ql_name === "string" ||
  typeof answers.ql_company === "string" ||
  typeof answers.ql_email === "string";

type SubmitResult = {
  ok: boolean;
  status: number | null;
  responseId: string | null;
  payload: unknown;
};

export async function submitBrandQuestionnaire(
  answers: Answers,
  signal?: AbortSignal
): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/v1/questionnaires/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type: "BRANDS",
        responses: answers,
      }),
      signal,
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        responseId: null,
        payload,
      };
    }

    return {
      ok: true,
      status: response.status,
      responseId:
        (payload as { data?: { id?: string } } | null)?.data?.id ?? null,
      payload,
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      responseId: null,
      payload: error,
    };
  }
}

const getSessionId = () => {
  const storage = safeLocalStorage();
  if (!storage) return "server-side";
  let sid = storage.getItem("wafia_brand_session_id");
  if (!sid) {
    sid = createSessionId();
    storage.setItem("wafia_brand_session_id", sid);
  }
  return sid;
};

/**
 * Hook principal pour la gestion du diagnostic marque
 */
export function useDiagnostic() {
  const [sessionId] = useState(getSessionId());
  const submissionAttemptedRef = useRef(false);

  const [state, setState] = useState<DiagnosticState>(() => {
    // 1. Rehydrate answers from localStorage
    let savedAnswers: Answers = {};
    try {
      const storage = safeLocalStorage();
      const raw = storage?.getItem(`wafia_brand_answers_${sessionId}`);
      if (raw) {
        const parsed = JSON.parse(raw) as Answers;
        savedAnswers = sanitizeAnswersForStorage(parsed);
      }
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error("Failed to rehydrate answers:", e);
      }
    }

    // 2. Determine phase from URL
    const initialPhase = getInitialPhase();

    return {
      ...buildInitialState(initialPhase, savedAnswers),
      answers: savedAnswers,
      calibration: deriveCalibrationFromAnswers(savedAnswers),
    };
  });

  // Active questions based on current phase
  const activeQuestions = useMemo(() => {
    if (state.phase === "quick_lead") {
      return CALIBRATION_QUESTIONS;
    }
    if (state.phase === "deep_qualification") {
      return filterVisibleQuestions(MAIN_QUESTIONS, state.answers);
    }
    return [];
  }, [state.phase, state.answers]);

  // Current question
  const currentQuestion = useMemo(() => {
    if (
      state.currentQuestionIndex >= 0 &&
      state.currentQuestionIndex < activeQuestions.length
    ) {
      return activeQuestions[state.currentQuestionIndex];
    }
    return null;
  }, [activeQuestions, state.currentQuestionIndex]);

  // Progress
  const progress = useMemo(() => {
    const total = activeQuestions.length;
    const current = state.currentQuestionIndex + 1;
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return { current, total, percentage };
  }, [activeQuestions.length, state.currentQuestionIndex]);

  // Diagnostic result
  const result = useMemo((): BrandDiagnosticResult | null => {
    if (state.phase !== "results") return null;

    const allQuestions = [...CALIBRATION_QUESTIONS, ...MAIN_QUESTIONS];
    const scores = calculateScores(state.answers, allQuestions);
    return generateDiagnosticResult(
      scores,
      state.answers,
      allQuestions,
      state.calibration
    );
  }, [state.phase, state.answers, state.calibration]);

  // === ACTIONS ===

  /**
   * Lance le Quick Lead (Level 1)
   */
  const startDiagnostic = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: "quick_lead",
      currentQuestionIndex: 0,
    }));
  }, []);

  /**
   * Lance directement le Deep Qualification (Level 2)
   * (skips Quick Lead)
   */
  const startDeepQualification = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: "deep_qualification",
      currentQuestionIndex: 0,
      interstitial: {
        prevCategory: "QUICK_LEAD",
        nextCategory: "IDENTIFICATION" as BrandSection,
      },
    }));
  }, []);

  /**
   * Enregistre une réponse
   */
  const setAnswer = useCallback(
    async (questionId: string, value: AnswerValue) => {
      let newAnswers: Answers | null = null;

      setState((prev) => {
        newAnswers = {
          ...prev.answers,
          [questionId]: value,
        };

        // Persist to localStorage immediately
        try {
          const storage = safeLocalStorage();
          storage?.setItem(
            `wafia_brand_answers_${sessionId}`,
            JSON.stringify(sanitizeAnswersForStorage(newAnswers))
          );
        } catch (e) {
          if (import.meta.env.DEV) {
            console.warn("Failed to persist answers locally", e);
          }
        }

        return {
          ...prev,
          answers: newAnswers,
        };
      });

      // V1: No Supabase integration — console.warn only
      if (newAnswers) {
        if (import.meta.env.DEV) {
          console.debug("[Brand Diagnostic] Answer saved locally:", questionId);
        }
      }
    },
    [sessionId]
  );

  /**
   * Passe à la question suivante
   */
  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const questions =
        prev.phase === "quick_lead"
          ? CALIBRATION_QUESTIONS
          : filterVisibleQuestions(MAIN_QUESTIONS, prev.answers);

      const currentQ = questions[prev.currentQuestionIndex];
      const nextIndex = prev.currentQuestionIndex + 1;

      // End of Quick Lead → transition to deep qualification or results
      if (
        prev.phase === "quick_lead" &&
        nextIndex >= CALIBRATION_QUESTIONS.length
      ) {
        const calibration = deriveCalibrationFromAnswers(prev.answers);

        return {
          ...prev,
          phase: "deep_qualification",
          currentQuestionIndex: 0,
          calibration,
          interstitial: {
            prevCategory: "QUICK_LEAD",
            nextCategory: "IDENTIFICATION" as BrandSection,
          },
        };
      }

      // End of deep qualification → results
      if (
        prev.phase === "deep_qualification" &&
        nextIndex >= questions.length
      ) {
        const allQuestions = [...CALIBRATION_QUESTIONS, ...MAIN_QUESTIONS];
        const scores = calculateScores(prev.answers, allQuestions);

        return {
          ...prev,
          phase: "results",
          scores,
          interstitial: undefined,
        };
      }

      // Calculate next question
      const nextQ = questions[nextIndex];

      // Detect section change for interstitial
      if (
        prev.phase === "deep_qualification" &&
        currentQ &&
        nextQ &&
        currentQ.category !== nextQ.category
      ) {
        return {
          ...prev,
          interstitial: {
            prevCategory: currentQ.category,
            nextCategory: nextQ.category as BrandSection,
          },
          currentQuestionIndex: nextIndex,
        };
      }

      // Standard next question
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        interstitial: undefined,
      };
    });
  }, []);

  /**
   * Complete interstitial transition
   */
  const completeInterstitial = useCallback(() => {
    setState((prev) => ({
      ...prev,
      interstitial: undefined,
    }));
  }, []);

  /**
   * Go to previous question
   */
  const previousQuestion = useCallback(() => {
    setState((prev) => {
      // From start of deep qualification → back to quick lead
      if (
        prev.phase === "deep_qualification" &&
        prev.currentQuestionIndex === 0
      ) {
        return {
          ...prev,
          phase: "quick_lead",
          currentQuestionIndex: CALIBRATION_QUESTIONS.length - 1,
          interstitial: undefined,
        };
      }

      // From start of quick lead → back to landing
      if (prev.phase === "quick_lead" && prev.currentQuestionIndex === 0) {
        return {
          ...prev,
          phase: "landing",
        };
      }

      // Previous question
      return {
        ...prev,
        currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1),
        interstitial: undefined,
      };
    });
  }, []);

  /**
   * Affiche le formulaire de contact rapide
   */
  const startContact = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: "contact",
    }));
  }, []);

  /**
   * Reset diagnostic
   */
  const resetDiagnostic = useCallback(() => {
    try {
      const storage = safeLocalStorage();
      storage?.removeItem(`wafia_brand_answers_${sessionId}`);
    } catch (e) {
      if (import.meta.env.DEV) {
        console.warn("Failed to clear local answers", e);
      }
    }

    setState(buildInitialState("landing"));
  }, [sessionId]);

  /**
   * Can proceed to next question?
   */
  const canProceed = useMemo(() => {
    if (!currentQuestion) return false;

    const answer = state.answers[currentQuestion.id];

    // Non-required questions can always proceed
    if (currentQuestion.required === false) return true;

    if (answer === undefined || answer === null) return false;

    switch (currentQuestion.type) {
      case "single":
      case "dropdown":
        return typeof answer === "string" && answer.length > 0;
      case "multiple":
        return Array.isArray(answer) && answer.length > 0;
      case "scale":
        return typeof answer === "number";
      case "text":
      case "email":
      case "tel":
      case "url":
        return typeof answer === "string" && answer.trim().length > 0;
      default:
        return true;
    }
  }, [currentQuestion, state.answers]);

  // Persist final results locally
  useEffect(() => {
    if (state.phase !== "results" || !result) return;

    try {
      const storage = safeLocalStorage();
      storage?.setItem(
        `wafia_brand_result_${sessionId}`,
        JSON.stringify({
          leadScore: result.leadScore,
          northStar: result.northStar,
          package: result.package.tier,
          level: getLevelLabel(result.level),
          completedAt: new Date().toISOString(),
        })
      );
    } catch (e) {
      if (import.meta.env.DEV) {
        console.warn("Failed to persist final result locally", e);
      }
    }
  }, [state.phase, result, sessionId]);

  // Submit final answers to Next API once per session when results are reached.
  useEffect(() => {
    if (state.phase !== "results" || submissionAttemptedRef.current) return;

    const storage = safeLocalStorage();
    const submissionStorageKey = `wafia_brand_submission_${sessionId}`;
    if (storage?.getItem(submissionStorageKey)) {
      submissionAttemptedRef.current = true;
      return;
    }

    if (!hasLeadIdentity(state.answers)) {
      if (import.meta.env.DEV) {
        console.warn(
          "[Brand Diagnostic] Submit skipped: missing ql_name/ql_company/ql_email."
        );
      }
      return;
    }

    submissionAttemptedRef.current = true;
    const controller = new AbortController();

    void (async () => {
      const submitResult = await submitBrandQuestionnaire(
        state.answers,
        controller.signal
      );
      if (!submitResult.ok) {
        if (!controller.signal.aborted && import.meta.env.DEV) {
          console.warn(
            "[Brand Diagnostic] Submit failed",
            submitResult.status,
            submitResult.payload
          );
        }
        return;
      }

      try {
        storage?.setItem(
          submissionStorageKey,
          JSON.stringify({
            submittedAt: new Date().toISOString(),
            responseId: submitResult.responseId,
          })
        );
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn(
            "[Brand Diagnostic] Failed to persist submission marker",
            error
          );
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [state.phase, state.answers, sessionId]);

  return {
    // State
    phase: state.phase,
    currentQuestion,
    answers: state.answers,
    scores: state.scores,
    calibration: state.calibration,
    interstitial: state.interstitial,
    progress,
    result,
    canProceed,

    // Actions
    startDiagnostic,
    startDeepQualification,
    setAnswer,
    nextQuestion,
    previousQuestion,
    resetDiagnostic,
    completeInterstitial,
    startContact,
  };
}
