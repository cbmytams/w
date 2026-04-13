/**
 * WAFIA DIAGNOSTIC TOOL - QUESTION CARD
 * Direction: Editorial Asymmetry & Social Heat
 */

import { useState, useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import DOMPurify from "dompurify";
import type { Question, AnswerValue, CalibrationData } from "../types";
import { cn } from "../utils/cn";
import { replaceTemplateVariables } from "../utils/text";

interface QuestionCardProps {
  question: Question;
  answer: AnswerValue | undefined;
  onAnswer: (value: AnswerValue) => void;
  calibration: CalibrationData;
  onSubmit?: () => void;
  questionNumber?: number;
}

const STAGGER_DELAY = 0.05;

// Shared "Heat" Spotlight
const useSpotlight = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    // Disable on touch devices to avoid stuck spotlight
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return { containerRef, mousePosition, handleMouseMove };
};

export function QuestionCard({
  question,
  answer,
  onAnswer,
  calibration,
  onSubmit,
  questionNumber,
}: QuestionCardProps) {
  const { containerRef, mousePosition, handleMouseMove } = useSpotlight();
  const [isDragging, setIsDragging] = useState(false);

  const handleAnswer = (value: AnswerValue) => {
    if (!isDragging) {
      onAnswer(value);
    }
  };

  // Generate unique IDs for ARIA
  const questionLabelId = `question-label-${question.id}`;
  const MAX_TEXT_LENGTH = 500;

  // Derived State for Scale
  const scaleValue =
    typeof answer === "number"
      ? answer
      : Math.floor(((question.min || 1) + (question.max || 10)) / 2);

  const processedQuestion = replaceTemplateVariables(
    question.question,
    calibration
  );
  const processedSubtitle = replaceTemplateVariables(
    question.subtitle,
    calibration
  );
  const processedPlaceholder = replaceTemplateVariables(
    question.placeholder,
    calibration
  );

  const renderInput = () => {
    switch (question.type) {
      case "single": {
        const optionCount = question.options?.length ?? 0;
        // Editorial Layout: Grid for many options, stacked for few
        const layoutClass =
          optionCount >= 3
            ? "grid grid-cols-1 md:grid-cols-2 gap-4"
            : "flex flex-col gap-4 max-w-xl";

        return (
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={cn("w-full", layoutClass)}
            role="radiogroup"
            aria-labelledby={questionLabelId}
            aria-required={question.required !== false}
          >
            {question.options?.map((option, index) => {
              const isSelected = answer === option.id;
              const isLastWide = optionCount === 3 && index === 2;
              return (
                <motion.button
                  key={option.id}
                  layoutId={`opt-${option.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * STAGGER_DELAY }}
                  onClick={() => onAnswer(option.id)}
                  role="radio"
                  aria-checked={isSelected}
                  aria-labelledby={`option-label-${option.id}`}
                  data-option-id={option.id}
                  data-testid="option-button"
                  className={cn(
                    "group relative py-4 sm:py-6 px-5 sm:px-8 min-h-[48px] text-left transition-all duration-300 border backdrop-blur-md rounded-xl overflow-hidden",
                    isSelected
                      ? "border-[var(--heat-start)] bg-[var(--heat-start)]/10 shadow-[0_0_30px_-5px_var(--heat-start)]"
                      : "glass-panel border-white/5 hover:border-white/20",
                    isLastWide && "md:col-span-2"
                  )}
                >
                  {/* Heat Spotlight */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--heat-start), transparent 40%)`,
                    }}
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    {option.emoji && (
                      <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all">
                        {option.emoji}
                      </span>
                    )}
                    <div className="flex-1">
                      <div
                        id={`option-label-${option.id}`}
                        className={cn(
                          "text-lg font-bold leading-tight mb-1 transition-colors",
                          isSelected
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-white"
                        )}
                      >
                        {replaceTemplateVariables(option.label, calibration)}
                      </div>
                      {option.description && (
                        <div className="text-sm text-zinc-500 group-hover:text-zinc-400 leading-snug">
                          {replaceTemplateVariables(
                            option.description,
                            calibration
                          )}
                        </div>
                      )}
                    </div>
                    <div
                      className={cn(
                        "w-7 h-7 sm:w-6 sm:h-6 shrink-0 rounded-full border flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-[var(--heat-start)] border-[var(--heat-start)] text-white"
                          : "border-zinc-700"
                      )}
                    >
                      {isSelected && (
                        <Check
                          className="w-3.5 h-3.5 sm:w-3 sm:h-3"
                          strokeWidth={4}
                        />
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        );
      }
      case "multiple": {
        const selectedIds = Array.isArray(answer) ? answer : [];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {question.options?.map((option, index) => {
              const isSelected = selectedIds.includes(option.id);
              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * STAGGER_DELAY }}
                  onClick={() => {
                    const newSelection = isSelected
                      ? selectedIds.filter((id) => id !== option.id)
                      : [...selectedIds, option.id];
                    onAnswer(newSelection);
                  }}
                  data-option-id={option.id}
                  data-testid="option-button"
                  className={cn(
                    "group relative p-4 sm:p-6 min-h-[48px] text-left transition-all duration-300 border rounded-2xl flex items-start gap-4 overflow-hidden",
                    isSelected
                      ? "border-[var(--heat-end)] bg-[var(--heat-end)]/10 shadow-[0_0_20px_-5px_var(--heat-end)]"
                      : "glass-panel border-white/5 hover:border-white/20"
                  )}
                >
                  <span className="text-2xl shrink-0 leading-none mt-1">
                    {option.emoji}
                  </span>
                  <div className="flex-1 font-semibold text-lg leading-tight text-left">
                    {replaceTemplateVariables(option.label, calibration)}
                  </div>
                  <div
                    className={cn(
                      "w-7 h-7 sm:w-6 sm:h-6 shrink-0 rounded-md border flex items-center justify-center transition-all mt-0.5",
                      isSelected
                        ? "bg-[var(--heat-end)] border-[var(--heat-end)] text-white"
                        : "border-zinc-700"
                    )}
                  >
                    {isSelected && (
                      <Check className="w-4 h-4" strokeWidth={3} />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        );
      }
      case "scale": {
        const min = question.min || 1;
        const max = question.max || 10;
        const intensity = (scaleValue - min) / (max - min);
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center py-4 sm:py-8"
          >
            <div className="relative mb-8 sm:mb-12">
              <span className="text-[15vw] sm:text-[20vw] md:text-[8rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 opacity-20 absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none blur-sm">
                {scaleValue}
              </span>
              <span className="text-[12vw] sm:text-[15vw] md:text-[6rem] font-black leading-none tracking-tighter text-white relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                {scaleValue}
              </span>
            </div>

            <div className="relative w-full h-14 flex items-center group">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-white/10 rounded-full" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)] rounded-full shadow-[0_0_15px_var(--heat-end)]"
                style={{ width: `${intensity * 100}%` }}
              />
              <input
                type="range"
                min={min}
                max={max}
                value={scaleValue}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  handleAnswer(v);
                }}
                data-testid="scale-input"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-8 w-8 sm:h-6 sm:w-6 bg-white rounded-full shadow-[0_0_20px_white] pointer-events-none z-20 flex items-center justify-center border-2 border-[var(--heat-start)]"
                style={{
                  left: `${intensity * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full bg-[var(--heat-start)]" />
              </div>
            </div>
            <div className="w-full flex justify-between mt-4 text-xs font-bold tracking-widest uppercase text-zinc-600">
              <span>{question.labels?.min}</span>
              <span>{question.labels?.max}</span>
            </div>
          </motion.div>
        );
      }
      case "text":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div className="relative group w-full">
              <textarea
                value={typeof answer === "string" ? answer : ""}
                onChange={(e) => {
                  const sanitized = DOMPurify.sanitize(e.target.value, {
                    ALLOWED_TAGS: [],
                    ALLOWED_ATTR: [],
                  });
                  onAnswer(sanitized);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit?.();
                  }
                }}
                placeholder={processedPlaceholder}
                rows={1}
                maxLength={MAX_TEXT_LENGTH}
                data-testid="text-input"
                aria-label={processedQuestion}
                className="w-full bg-transparent border-none py-4 text-2xl sm:text-4xl md:text-5xl font-bold text-white placeholder-white/30 resize-none focus:outline-none leading-tight tracking-tight min-h-[80px] sm:min-h-[120px]"
                autoFocus
              />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
                <div className="h-full bg-[var(--heat-start)] w-0 group-focus-within:w-full transition-all duration-500 ease-out shadow-[0_0_20px_var(--heat-start)]" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-zinc-500 text-sm items-center gap-2 opacity-0 group-focus-within:opacity-100 transition-opacity hidden sm:flex">
                  <span>Press Enter</span> <ArrowRight className="w-4 h-4" />
                </div>
                <p className="text-xs text-zinc-600">
                  {typeof answer === "string" ? answer.length : 0}/
                  {MAX_TEXT_LENGTH} caractères
                </p>
              </div>
            </div>
          </motion.div>
        );
      case "email":
      case "tel":
      case "url":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div className="relative group w-full">
              <input
                type={question.type}
                value={typeof answer === "string" ? answer : ""}
                onChange={(e) => {
                  const sanitized = DOMPurify.sanitize(e.target.value, {
                    ALLOWED_TAGS: [],
                    ALLOWED_ATTR: [],
                  });
                  onAnswer(sanitized);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSubmit?.();
                  }
                }}
                placeholder={processedPlaceholder}
                data-testid={`${question.type}-input`}
                aria-label={processedQuestion}
                autoComplete={
                  question.type === "email"
                    ? "email"
                    : question.type === "tel"
                      ? "tel"
                      : "url"
                }
                className="w-full bg-transparent border-none py-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white placeholder-white/30 focus:outline-none leading-tight tracking-tight"
                autoFocus
              />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
                <div className="h-full bg-[var(--heat-start)] w-0 group-focus-within:w-full transition-all duration-500 ease-out shadow-[0_0_20px_var(--heat-start)]" />
              </div>
              <div className="mt-3 flex items-center gap-2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                <span className="text-zinc-500 text-sm hidden sm:flex items-center gap-2">
                  Press Enter <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        );
      case "dropdown":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div className="relative w-full">
              <select
                value={typeof answer === "string" ? answer : ""}
                onChange={(e) => onAnswer(e.target.value)}
                data-testid="dropdown-input"
                aria-label={processedQuestion}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-lg font-semibold text-white focus:outline-none focus:border-[var(--heat-start)] focus:shadow-[0_0_20px_-5px_var(--heat-start)] transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-zinc-900 text-zinc-400">
                  Sélectionnez une option…
                </option>
                {question.options?.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    className="bg-zinc-900 text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ArrowRight className="w-5 h-5 text-zinc-500 rotate-90" />
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <LayoutGroup>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="w-full flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-24 items-start"
          role="region"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Left Column: Question Text (Editorial Style) */}
          <div className="flex-1 min-w-0 md:sticky md:top-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="sr-only" aria-live="polite">
                Question {questionNumber || ""} sur{" "}
                {/* total will be added via context */}
              </span>
              <span className="text-[var(--heat-start)] font-mono text-xs tracking-widest uppercase mb-3 sm:mb-4 block">
                Question {questionNumber || ""}
              </span>
              <h2
                id={questionLabelId}
                className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tighter mb-4 sm:mb-6 text-white"
              >
                {processedQuestion}
              </h2>
              {processedSubtitle && (
                <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-lg border-l-2 border-white/10 pl-4 sm:pl-6">
                  {processedSubtitle}
                </p>
              )}
            </motion.div>
          </div>

          {/* Right Column: Inputs */}
          <div
            className="w-full md:w-[500px] flex-shrink-0 pt-0 sm:pt-4"
            data-testid="question-input"
            data-question-type={question.type}
            data-question-id={question.id}
          >
            {renderInput()}
          </div>
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
