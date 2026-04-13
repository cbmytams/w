"use client";

import React, { useEffect, useState } from "react";
import { FieldType } from "@/lib/questionnaireMap";
import { type QuestionValue } from "@/lib/questionnaireIntegrity";

interface FieldDisplayProps {
  label: string;
  value: QuestionValue;
  type: FieldType;
  required: boolean;
  questionType?: "BRANDS" | "TALENTS";
  fieldKey?: string;
}

type QuestionnaireType = "BRANDS" | "TALENTS";
type OptionLookup = Record<string, Record<string, string>>;
type QuestionLike = {
  id?: unknown;
  questions?: unknown;
  options?: unknown;
};

const optionLookupPromiseCache = new Map<
  QuestionnaireType,
  Promise<OptionLookup>
>();

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const flattenQuestions = (questions: unknown): QuestionLike[] => {
  if (!Array.isArray(questions)) return [];

  const hasSections = questions.some(
    (entry) =>
      isRecord(entry) &&
      Array.isArray((entry as { questions?: unknown }).questions)
  );

  if (!hasSections) {
    return questions.filter((entry): entry is QuestionLike => isRecord(entry));
  }

  return questions.flatMap((section) => {
    if (!isRecord(section) || !Array.isArray(section.questions)) return [];
    return section.questions.filter((entry): entry is QuestionLike =>
      isRecord(entry)
    );
  });
};

const buildOptionLookup = (questions: unknown): OptionLookup => {
  const lookup: OptionLookup = {};
  for (const question of flattenQuestions(questions)) {
    if (typeof question.id !== "string" || !Array.isArray(question.options))
      continue;

    const optionMap: Record<string, string> = {};
    for (const option of question.options) {
      if (!isRecord(option)) continue;

      const optionId = typeof option.id === "string" ? option.id : null;
      const optionLabel =
        typeof option.label === "string" ? option.label : null;
      if (!optionId || !optionLabel) continue;

      optionMap[optionId] =
        typeof option.emoji === "string" && option.emoji.trim().length > 0
          ? `${optionLabel} ${option.emoji}`
          : optionLabel;
    }

    if (Object.keys(optionMap).length > 0) {
      lookup[question.id] = optionMap;
    }
  }
  return lookup;
};

const loadOptionLookup = async (
  questionType: QuestionnaireType
): Promise<OptionLookup> => {
  const response = await fetch(
    `/api/v1/questionnaires/current?type=${questionType}`,
    {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "no-store",
    }
  ).catch(() => null);

  if (!response || !response.ok) return {};

  const payload = (await response.json().catch(() => null)) as {
    success?: boolean;
    data?: {
      questions?: unknown;
    };
  } | null;

  if (!payload?.success) return {};
  return buildOptionLookup(payload.data?.questions);
};

const getOptionLookup = (questionType: QuestionnaireType) => {
  const cached = optionLookupPromiseCache.get(questionType);
  if (cached) return cached;

  const request = loadOptionLookup(questionType).catch(() => ({}));
  optionLookupPromiseCache.set(questionType, request);
  return request;
};

export function FieldDisplay({
  label,
  value,
  type,
  required,
  questionType,
  fieldKey,
}: FieldDisplayProps) {
  const [optionLookup, setOptionLookup] = useState<OptionLookup>({});

  useEffect(() => {
    if (!questionType) return;

    let active = true;
    void getOptionLookup(questionType).then((lookup) => {
      if (!active) return;
      setOptionLookup(lookup);
    });

    return () => {
      active = false;
    };
  }, [questionType]);

  const getOptionLabel = (key: string, val: string) => {
    const optionMap = optionLookup[key];
    return optionMap?.[val] ?? val;
  };

  const isMissing =
    required && (value === undefined || value === null || value === "");
  const isPresentWithEmpty =
    !required && (value === undefined || value === null || value === "");

  const renderValue = () => {
    if (isMissing || isPresentWithEmpty) {
      return <span className="text-slate-500 italic">Non renseigné</span>;
    }

    if (type === "scale") {
      return (
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">{value} / 10</span>
          <div className="flex-1 h-1.5 bg-questionnaire-muted rounded-full overflow-hidden max-w-xs">
            <div
              className="h-full bg-questionnaire-primary"
              style={{ width: `${(Number(value) / 10) * 100}%` }}
            />
          </div>
        </div>
      );
    }

    if (type === "multiple" && Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2 mt-1">
          {value.map((v, i) => {
            const formatted =
              questionType && fieldKey ? getOptionLabel(fieldKey, v) : v;
            return (
              <span
                key={i}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-200"
              >
                {formatted}
              </span>
            );
          })}
        </div>
      );
    }

    if (type === "file") {
      return (
        <a
          href={value as string}
          target="_blank"
          rel="noreferrer"
          className="text-questionnaire-primary hover:underline text-sm flex items-center gap-1"
        >
          Voir le fichier ↗
        </a>
      );
    }

    if (type === "url") {
      return (
        <a
          href={value as string}
          target="_blank"
          rel="noreferrer"
          className="text-questionnaire-primary hover:underline text-sm truncate max-w-full"
        >
          {value}
        </a>
      );
    }

    const formattedValue =
      type === "single" && questionType && fieldKey && typeof value === "string"
        ? getOptionLabel(fieldKey, value)
        : String(value);

    return <span className="text-white">{formattedValue}</span>;
  };

  return (
    <div
      className={`p-4 rounded-xl bg-white/[0.015] border ${isMissing ? "border-red-500/20 bg-red-500/[0.02]" : "border-white/5"} flex flex-col gap-1.5 transition-colors hover:bg-white/[0.03]`}
    >
      <label className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="text-sm">{renderValue()}</div>
    </div>
  );
}
