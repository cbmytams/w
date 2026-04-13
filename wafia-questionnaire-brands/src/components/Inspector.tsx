import { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Save,
  Trash2,
  Plus,
  AlertCircle,
  ArrowRight,
  Target,
} from "lucide-react";
import { useDiagnosticData } from "../context/DiagnosticContext";
import type {
  Question,
  QuestionType,
  BrandSection,
  BrandPillarKey,
  Condition,
  ConditionOperator,
  Impact,
  Option,
} from "../types";

interface InspectorProps {
  questionId: string | null;
  onClose: () => void;
}

export function Inspector({ questionId, onClose }: InspectorProps) {
  const { questions, updateQuestion, deleteQuestion, pillars } =
    useDiagnosticData();
  const [draft, setDraft] = useState<Question | null>(() => {
    if (!questionId) return null;
    const original = questions.find((q) => q.id === questionId);
    return original ? JSON.parse(JSON.stringify(original)) : null;
  });
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    if (draft && questionId) {
      updateQuestion(questionId, draft);
      setHasChanges(false);
    }
  };

  const handleDelete = () => {
    if (
      confirm(
        "⚠️ ATTENTION: Supprimer cette question peut casser la logique du diagnostic. Êtes-vous sûr ?"
      )
    ) {
      if (questionId) deleteQuestion(questionId);
      onClose();
    }
  };

  const updateDraft = (updates: Partial<Question>) => {
    if (!draft) return;
    setDraft((prev) => ({ ...prev!, ...updates }));
    setHasChanges(true);
  };

  // --- SUB-EDITORS ---

  const addCondition = () => {
    if (!draft) return;
    const newCondition: Condition = {
      questionId: questions[0]?.id || "",
      operator: "equals",
      value: "",
    };
    updateDraft({ conditions: [...(draft.conditions || []), newCondition] });
  };

  const updateCondition = (index: number, update: Partial<Condition>) => {
    if (!draft?.conditions) return;
    const newConditions = [...draft.conditions];
    newConditions[index] = { ...newConditions[index], ...update };
    updateDraft({ conditions: newConditions });
  };

  const removeCondition = (index: number) => {
    if (!draft?.conditions) return;
    updateDraft({ conditions: draft.conditions.filter((_, i) => i !== index) });
  };

  const addOption = () => {
    if (!draft) return;
    const newOption: Option = {
      id: `opt_${Date.now()}`,
      label: "New Option",
      impacts: [],
    };
    updateDraft({ options: [...(draft.options || []), newOption] });
  };

  const updateOption = (index: number, update: Partial<Option>) => {
    if (!draft?.options) return;
    const newOptions = [...draft.options];
    newOptions[index] = { ...newOptions[index], ...update };
    updateDraft({ options: newOptions });
  };

  const addImpact = (optionIndex: number) => {
    if (!draft?.options) return;
    const newImpact: Impact = { pillar: "STRATEGY", weight: 5 };
    const newOptions = [...draft.options];
    newOptions[optionIndex].impacts = [
      ...newOptions[optionIndex].impacts,
      newImpact,
    ];
    updateDraft({ options: newOptions });
  };

  const updateImpact = (
    optionIndex: number,
    impactIndex: number,
    update: Partial<Impact>
  ) => {
    if (!draft?.options) return;
    const newOptions = [...draft.options];
    newOptions[optionIndex].impacts[impactIndex] = {
      ...newOptions[optionIndex].impacts[impactIndex],
      ...update,
    };
    updateDraft({ options: newOptions });
  };

  const removeImpact = (optionIndex: number, impactIndex: number) => {
    if (!draft?.options) return;
    const newOptions = [...draft.options];
    newOptions[optionIndex].impacts = newOptions[optionIndex].impacts.filter(
      (_, i) => i !== impactIndex
    );
    updateDraft({ options: newOptions });
  };

  if (!questionId || !draft) return null;

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="w-[600px] border-l border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col h-full shadow-2xl absolute right-0 top-0 bottom-0 z-50"
    >
      {/* HEADER */}
      <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a] shrink-0 relative overflow-hidden">
        {/* Ambient Category Glow */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none transition-colors duration-500"
          style={{
            backgroundColor:
              draft.category === "QUICK_LEAD"
                ? "#ffffff"
                : (pillars as Record<string, { color: string }>)[draft.category]
                    ?.color || "#ffffff",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                draft.category === "QUICK_LEAD"
                  ? "bg-zinc-800 border-zinc-700 text-zinc-400"
                  : "bg-white/5 border-white/10 text-white"
              }`}
              style={{
                borderColor:
                  draft.category !== "QUICK_LEAD"
                    ? (pillars as Record<string, { color: string }>)[
                        draft.category
                      ]?.color
                    : undefined,
              }}
            >
              {draft.category}
            </span>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              {draft.type}
            </span>
          </div>
          <div className="font-mono font-bold text-white text-lg tracking-tight flex items-center gap-2">
            <span className="opacity-30">#</span>
            {draft.id}
          </div>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          {hasChanges && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400 text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              <Save className="w-3 h-3" /> Save
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-10">
          {/* 1. BASIC INFORMATION */}
          <section className="space-y-4">
            <SectionHeader icon={Target} title="Définition de Base" />

            <div className="space-y-4">
              <div className="relative group">
                <label className="block text-[10px] uppercase text-zinc-600 font-bold mb-1.5 transition-colors group-focus-within:text-[var(--heat-start)]">
                  The Question
                </label>
                <textarea
                  value={draft.question}
                  onChange={(e) => updateDraft({ question: e.target.value })}
                  className="w-full bg-[#0f0f12] border-b-2 border-white/5 rounded-t-lg p-4 text-base text-white focus:border-[var(--heat-start)] outline-none min-h-[100px] font-medium resize-none transition-all placeholder-zinc-700 hover:bg-white/[0.02]"
                  placeholder="What do you want to ask?"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase text-zinc-600 font-bold mb-1.5">
                    Context / Subtitle
                  </label>
                  <input
                    value={draft.subtitle || ""}
                    onChange={(e) => updateDraft({ subtitle: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-2 text-sm text-zinc-400 focus:border-white focus:text-white outline-none transition-colors placeholder-zinc-800"
                    placeholder="Add helper text..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-zinc-600 font-bold mb-1.5">
                      Input Type
                    </label>
                    <select
                      value={draft.type}
                      onChange={(e) =>
                        updateDraft({ type: e.target.value as QuestionType })
                      }
                      className="w-full bg-[#0f0f12] border border-white/10 rounded-lg p-2 text-sm text-white focus:border-white/20 outline-none hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <option value="single">Single Select</option>
                      <option value="multiple">Multi Select</option>
                      <option value="scale">Linear Scale</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-zinc-600 font-bold mb-1.5">
                      Pillar
                    </label>
                    <select
                      value={draft.category}
                      onChange={(e) =>
                        updateDraft({
                          category: e.target.value as BrandSection,
                        })
                      }
                      className="w-full bg-[#0f0f12] border border-white/10 rounded-lg p-2 text-sm text-white focus:border-white/20 outline-none hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <option value="QUICK_LEAD">Quick Lead</option>
                      {Object.keys(pillars).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. LOGIC BUILDER (SENTENCE STYLE) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <SectionHeader
                icon={AlertCircle}
                title="Conditions d'Affichage"
              />
              <button
                onClick={addCondition}
                className="text-[10px] uppercase font-bold text-zinc-500 hover:text-[var(--heat-start)] flex items-center gap-1 transition-colors px-2 py-1 hover:bg-white/5 rounded"
              >
                <Plus className="w-3 h-3" /> Ajouter une règle
              </button>
            </div>

            <div className="space-y-2">
              {(!draft.conditions || draft.conditions.length === 0) && (
                <div className="p-4 rounded-lg border border-dashed border-white/10 text-zinc-600 text-xs text-center font-mono">
                  Cette question est toujours affichée.
                </div>
              )}
              {draft.conditions?.map((cond, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-[#0f0f12] border border-white/5 rounded-xl group hover:border-white/10 transition-colors"
                >
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    AFFICHER SI
                  </div>

                  {/* Question Selector */}
                  <div className="relative">
                    <select
                      value={cond.questionId}
                      onChange={(e) =>
                        updateCondition(idx, { questionId: e.target.value })
                      }
                      className="appearance-none bg-white/5 border border-white/5 rounded px-3 py-1.5 text-xs text-emerald-400 font-mono focus:border-emerald-500 outline-none pr-8 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      {questions.map((q) => (
                        <option key={q.id} value={q.id}>
                          {q.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Operator */}
                  <select
                    value={cond.operator}
                    onChange={(e) =>
                      updateCondition(idx, {
                        operator: e.target.value as ConditionOperator,
                      })
                    }
                    className="bg-transparent border-b border-zinc-700 text-xs text-zinc-300 font-mono focus:border-white outline-none text-center w-16 px-0 py-1"
                  >
                    <option value="equals">est</option>
                    <option value="not_equals">n'est pas</option>
                    <option value="contains">contient</option>
                    <option value="greater_than">&gt;</option>
                    <option value="less_than">&lt;</option>
                  </select>

                  {/* Value */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={
                        Array.isArray(cond.value)
                          ? cond.value.join(",")
                          : cond.value
                      }
                      onChange={(e) =>
                        updateCondition(idx, { value: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-dashed border-zinc-700 py-1 text-xs text-white font-mono focus:border-[var(--heat-start)] outline-none placeholder-zinc-700"
                      placeholder="Match value..."
                    />
                  </div>

                  <button
                    onClick={() => removeCondition(idx)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 3. OPTIONS & IMPACT MATRIX */}
          {/* 3. OPTIONS & IMPACT MATRIX */}
          {(draft.type === "single" || draft.type === "multiple") && (
            <section className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <SectionHeader icon={ArrowRight} title="Réponses et Impacts" />
                <button
                  onClick={addOption}
                  className="text-[10px] uppercase font-bold text-zinc-500 hover:text-[var(--heat-start)] flex items-center gap-1 transition-colors px-2 py-1 hover:bg-white/5 rounded"
                >
                  <Plus className="w-3 h-3" /> Ajouter un choix
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {draft.options?.map((opt, optIdx) => (
                  <div
                    key={optIdx}
                    className="group relative overflow-hidden bg-[#0f0f12] border border-white/5 rounded-xl hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
                  >
                    {/* OPTION HEADER */}
                    <div className="p-4 flex items-start gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/5 group-hover:border-[var(--heat-start)]/50 transition-colors">
                        <input
                          value={opt.emoji || ""}
                          onChange={(e) =>
                            updateOption(optIdx, { emoji: e.target.value })
                          }
                          className="w-full h-full text-center bg-transparent border-none text-xl outline-none"
                          placeholder="Icon"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          value={opt.label}
                          onChange={(e) =>
                            updateOption(optIdx, { label: e.target.value })
                          }
                          className="w-full bg-transparent border-none text-white font-medium placeholder-zinc-600 focus:ring-0 p-0 text-base outline-none"
                          placeholder="Option Label..."
                        />
                        <div className="flex gap-2">
                          <div className="bg-black/40 rounded px-2 py-0.5 text-[10px] text-zinc-500 font-mono border border-white/5 flex items-center gap-2">
                            <span>ID:</span>
                            <input
                              value={opt.id}
                              onChange={(e) =>
                                updateOption(optIdx, { id: e.target.value })
                              }
                              className="bg-transparent text-zinc-300 outline-none w-20"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newOptions = draft.options?.filter(
                            (_, i) => i !== optIdx
                          );
                          updateDraft({ options: newOptions });
                        }}
                        className="p-2 text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* IMPACT MATRIX (Slide down on hover or always visible?) - Let's keep it visible but subtle */}
                    <div className="bg-black/20 border-t border-white/5 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider flex items-center gap-1">
                          <Target className="w-3 h-3" /> Scores d'Impact
                        </span>
                        <button
                          onClick={() => addImpact(optIdx)}
                          className="text-[10px] text-[var(--heat-end)] hover:text-white transition-colors"
                        >
                          + Ajouter Score
                        </button>
                      </div>

                      <div className="space-y-2">
                        {opt.impacts.length === 0 && (
                          <div className="text-[10px] text-zinc-700 italic px-2">
                            Neutre (Aucun impact)
                          </div>
                        )}
                        {opt.impacts.map((imp, impIdx) => (
                          <div
                            key={impIdx}
                            className="flex items-center gap-2 bg-white/5 rounded pl-1 pr-2 py-1"
                          >
                            {/* Pillar Color Dot */}
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor:
                                  pillars[imp.pillar]?.color || "#fff",
                              }}
                            />

                            <select
                              value={imp.pillar}
                              onChange={(e) =>
                                updateImpact(optIdx, impIdx, {
                                  pillar: e.target.value as BrandPillarKey,
                                })
                              }
                              className="bg-transparent border-none text-[10px] text-zinc-300 outline-none w-24 font-bold uppercase"
                            >
                              {Object.keys(pillars).map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>

                            <div className="flex-1 h-px bg-white/5 mx-2" />

                            <input
                              type="number"
                              value={imp.weight}
                              onChange={(e) =>
                                updateImpact(optIdx, impIdx, {
                                  weight: parseInt(e.target.value) || 0,
                                })
                              }
                              className="w-10 bg-transparent text-[10px] text-white font-mono outline-none text-right font-bold"
                            />
                            <span className="text-[10px] text-zinc-600">
                              pts
                            </span>

                            <button
                              onClick={() => removeImpact(optIdx, impIdx)}
                              className="ml-2 text-zinc-700 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* DANGER ZONE */}
        <div className="p-6 mt-8 border-t border-white/10 bg-red-500/5">
          <button
            onClick={handleDelete}
            className="w-full py-3 flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-sm font-bold uppercase tracking-wider border border-red-500/20 hover:border-red-500/50"
          >
            <Trash2 className="w-4 h-4" /> Supprimer la Question
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <h3 className="flex items-center gap-2 text-xs font-bold uppercase text-zinc-400 tracking-wider">
      <Icon className="w-3 h-3 text-[var(--heat-start)]" />
      {title}
    </h3>
  );
}
