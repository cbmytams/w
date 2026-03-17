/**
 * WAFIA BRAND DIAGNOSTIC
 * Direction: Brand Heat — Strategic Diagnostic
 */

import { useMemo, useEffect } from 'react';
import { useDiagnostic } from './hooks/useDiagnostic';
import {
  DiagnosticLanding,
  ProgressBar,
  QuestionCard,
  NavigationButtons,
  BackgroundWrapper,
  InterstitialScreen,
  QuantumThread,
} from './components';
import { BrandResultsSummary } from './components/BrandResultsSummary';
import { ContactForm } from './components/ContactForm';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DiagnosticProvider } from './context/DiagnosticContext';
import { CALIBRATION_QUESTIONS, MAIN_QUESTIONS } from './constants';
import { filterVisibleQuestions } from './utils/conditions';

function App() {
  const {
    phase,
    currentQuestion,
    answers,
    calibration,
    progress,
    result,
    canProceed,
    startDiagnostic,
    startDeepQualification,
    setAnswer,
    nextQuestion,
    previousQuestion,
    resetDiagnostic,
    interstitial,
    completeInterstitial,
  } = useDiagnostic();

  // Dynamic document title based on phase
  useEffect(() => {
    const titles: Record<string, string> = {
      landing: 'Wafia — Diagnostic Marques',
      quick_lead: `Contact Express ${progress.current}/${progress.total} | Wafia`,
      deep_qualification: `Diagnostic ${progress.current}/${progress.total} | Wafia`,
      results: 'Vos Résultats | Wafia',
    };
    document.title = titles[phase] || 'Wafia — Diagnostic Marques';
  }, [phase, progress]);

  // Is this the last question in the current phase?
  const isLastQuestion = useMemo(() => {
    if (phase === 'quick_lead') {
      return progress.current === CALIBRATION_QUESTIONS.length;
    }
    if (phase === 'deep_qualification') {
      const visibleQuestions = filterVisibleQuestions(MAIN_QUESTIONS, answers);
      return progress.current === visibleQuestions.length;
    }
    return false;
  }, [phase, progress, answers]);

  // Render content based on phase
  const renderContent = () => {
    switch (phase) {
      case 'landing':
        return (
          <DiagnosticLanding
            onStart={startDiagnostic}
          />
        );

      case 'quick_lead':
      case 'deep_qualification':
        // Show interstitial between sections
        if (interstitial) {
          return (
            <InterstitialScreen
              prevCategory={interstitial.prevCategory}
              nextCategory={interstitial.nextCategory}
              onComplete={completeInterstitial}
            />
          );
        }

        if (!currentQuestion) return null;

        return (
          <>
            <ProgressBar
              current={progress.current}
              total={progress.total}
              percentage={progress.percentage}
              phase={phase}
            />

            {/* Main Stage */}
            <div className="h-full flex flex-col relative w-full overflow-hidden overflow-y-auto pt-16 pb-44 sm:pt-20 sm:pb-32">
              <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-12 flex-1 flex flex-col justify-start sm:justify-center min-h-0">
                <QuestionCard
                  key={currentQuestion.id}
                  question={currentQuestion}
                  calibration={calibration}
                  answer={answers[currentQuestion.id]}
                  onAnswer={(value) => setAnswer(currentQuestion.id, value)}
                  onSubmit={() => {
                    if (canProceed) nextQuestion();
                  }}
                  questionNumber={progress.current}
                />
              </div>
            </div>

            <NavigationButtons
              onPrevious={previousQuestion}
              onNext={nextQuestion}
              canProceed={canProceed}
              showPrevious={true}
              isLastQuestion={isLastQuestion}
            />

            {/* Skip to deep qualification — only during quick lead */}
            {phase === 'quick_lead' && progress.current >= 3 && (
              <div className="fixed bottom-2 right-4 z-50">
                <button
                  onClick={startDeepQualification}
                  className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors underline underline-offset-2"
                >
                  Passer au diagnostic complet →
                </button>
              </div>
            )}
          </>
        );

      case 'results':
        if (!result) return null;
        return <BrandResultsSummary result={result} onReset={resetDiagnostic} />;

      case 'contact':
        return <ContactForm onBack={resetDiagnostic} />;

      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <DiagnosticProvider>
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="skip-link sr-only focus:not-sr-only"
        >
          Aller au contenu principal
        </a>

        <div
          id="main-content"
          className="h-[100dvh] overflow-hidden antialiased selection:bg-orange-500 selection:text-white"
          role="main"
        >
          <BackgroundWrapper phase={phase} currentQuestion={currentQuestion}>
            <QuantumThread isActive={phase === 'deep_qualification'} />
            {renderContent()}
          </BackgroundWrapper>
        </div>
      </DiagnosticProvider>
    </ErrorBoundary>
  );
}

export default App;
