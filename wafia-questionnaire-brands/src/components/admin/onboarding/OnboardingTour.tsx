import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface TourStep {
    target: string; // CSS selector or data-tour attribute
    title: string;
    description: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const TOUR_STEPS: TourStep[] = [
    {
        target: 'body',
        title: '👋 Bienvenue dans votre Dashboard Wafia !',
        description: 'Voici un tour rapide pour vous familiariser avec les fonctionnalités principales.',
        position: 'center'
    },
    {
        target: '[data-tour="metrics"]',
        title: '📊 Métriques Clés',
        description: 'Suivez en temps réel vos indicateurs de performance : nombre de prospects, taux de conversion, scores moyens...',
        position: 'bottom'
    },
    {
        target: '[data-tour="leads-tab"]',
        title: '👥 Gestion des Prospects',
        description: 'Gérez votre pipeline de vente en Kanban : déplacez les prospects de "Nouveau" à "Signé"',
        position: 'right'
    },
    {
        target: '[data-tour="config-tab"]',
        title: '⚙️ Configuration',
        description: 'Modifiez les questions du diagnostic, ajustez les logiques conditionnelles, et personnalisez l\'expérience',
        position: 'right'
    },
    {
        target: '[data-tour="help-button"]',
        title: '❓ Besoin d\'Aide ?',
        description: 'Activez le mode aide à tout moment pour voir des explications contextuelles sur chaque élément',
        position: 'bottom'
    }
];

export function OnboardingTour() {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Check if user has seen the tour
        const hasSeenTour = localStorage.getItem('admin_tour_completed');
        if (!hasSeenTour) {
            // Delay to let the DOM render
            setTimeout(() => setIsActive(true), 1000);
        }
    }, []);

    useEffect(() => {
        if (!isActive) return;

        const step = TOUR_STEPS[currentStep];
        if (!step) return;

        if (step.target === 'body') return;

        const element = document.querySelector(step.target) as HTMLElement | null;

        // Scroll element into view
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isActive, currentStep]);

    const handleNext = () => {
        if (currentStep < TOUR_STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        localStorage.setItem('admin_tour_completed', 'true');
        setIsActive(false);
    };

    const handleComplete = () => {
        localStorage.setItem('admin_tour_completed', 'true');
        setIsActive(false);
    };

    const step = TOUR_STEPS[currentStep];
    if (!isActive || !step) return null;

    const isCenter = step.position === 'center';
    const targetElement = step.target === 'body'
        ? null
        : (document.querySelector(step.target) as HTMLElement | null);

    // Get position for spotlight and tooltip
    const getTooltipPosition = () => {
        if (isCenter || !targetElement) {
            return {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            };
        }

        const rect = targetElement.getBoundingClientRect();
        const position: React.CSSProperties = { position: 'fixed' };

        switch (step.position) {
            case 'bottom':
                position.top = rect.bottom + 20;
                position.left = rect.left + rect.width / 2;
                position.transform = 'translateX(-50%)';
                break;
            case 'top':
                position.bottom = window.innerHeight - rect.top + 20;
                position.left = rect.left + rect.width / 2;
                position.transform = 'translateX(-50%)';
                break;
            case 'left':
                position.top = rect.top + rect.height / 2;
                position.right = window.innerWidth - rect.left + 20;
                position.transform = 'translateY(-50%)';
                break;
            case 'right':
                position.top = rect.top + rect.height / 2;
                position.left = rect.right + 20;
                position.transform = 'translateY(-50%)';
                break;
        }

        return position;
    };

    return (
        <AnimatePresence>
            {isActive && (
                <>
                    {/* Backdrop with spotlight */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9997] pointer-events-none"
                        style={{
                            background: targetElement && !isCenter
                                ? `radial-gradient(circle at ${targetElement.getBoundingClientRect().left + targetElement.getBoundingClientRect().width / 2}px ${targetElement.getBoundingClientRect().top + targetElement.getBoundingClientRect().height / 2}px, transparent 0px, transparent ${Math.max(targetElement.getBoundingClientRect().width, targetElement.getBoundingClientRect().height) / 2 + 20}px, rgba(0,0,0,0.85) ${Math.max(targetElement.getBoundingClientRect().width, targetElement.getBoundingClientRect().height) / 2 + 40}px)`
                                : 'rgba(0, 0, 0, 0.85)'
                        }}
                        onClick={handleSkip}
                    />

                    {/* Highlight ring around target */}
                    {targetElement && !isCenter && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="fixed z-[9998] pointer-events-none"
                            style={{
                                left: targetElement.getBoundingClientRect().left - 8,
                                top: targetElement.getBoundingClientRect().top - 8,
                                width: targetElement.getBoundingClientRect().width + 16,
                                height: targetElement.getBoundingClientRect().height + 16,
                                border: '3px solid #3b82f6',
                                borderRadius: '12px',
                                boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.4)'
                            }}
                        />
                    )}

                    {/* Tooltip Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed z-[9999] w-full max-w-md pointer-events-auto"
                        style={getTooltipPosition() as React.CSSProperties}
                    >
                        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-blue-500/30 rounded-2xl p-6 shadow-2xl mx-4">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{step.title}</h3>
                                        <p className="text-xs text-zinc-500">
                                            Étape {currentStep + 1} sur {TOUR_STEPS.length}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSkip}
                                    className="text-zinc-500 hover:text-white transition-colors p-1"
                                    aria-label="Fermer le tour"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                                {step.description}
                            </p>

                            {/* Progress bar */}
                            <div className="w-full h-1 bg-zinc-800 rounded-full mb-6 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handleSkip}
                                    className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                                >
                                    Passer le tour
                                </button>

                                <div className="flex items-center gap-2">
                                    {currentStep > 0 && (
                                        <button
                                            onClick={handlePrevious}
                                            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors flex items-center gap-2"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Précédent
                                        </button>
                                    )}

                                    <button
                                        onClick={handleNext}
                                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors flex items-center gap-2"
                                    >
                                        {currentStep < TOUR_STEPS.length - 1 ? (
                                            <>
                                                Suivant
                                                <ChevronRight className="w-4 h-4" />
                                            </>
                                        ) : (
                                            'Terminer'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
