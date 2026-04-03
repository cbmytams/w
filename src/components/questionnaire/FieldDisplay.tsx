import React from 'react';
import { FieldType } from '@/lib/questionnaireMap';
import { BRANDS_QUESTIONS, TALENTS_QUESTIONS } from '@/lib/questionnaireData'; import { type QuestionValue } from '@/lib/questionnaireIntegrity';

interface FieldDisplayProps {
    label: string;
    value: QuestionValue;
    type: FieldType;
    required: boolean;
    questionType?: 'BRANDS' | 'TALENTS';
    fieldKey?: string;
}

const getOptionLabel = (questionType: 'BRANDS' | 'TALENTS', key: string, val: string) => {
    const list = questionType === 'BRANDS' ? BRANDS_QUESTIONS : TALENTS_QUESTIONS;
    const q = list.find(q => q.id === key);
    if (!q || !q.options) return val;
    const opt = q.options.find(o => o.id === val);
    if (!opt) return val;
    return opt.emoji ? `${opt.label} ${opt.emoji}` : opt.label;
}

export function FieldDisplay({ label, value, type, required, questionType, fieldKey }: FieldDisplayProps) {
    const isMissing = required && (value === undefined || value === null || value === '');
    const isPresentWithEmpty = !required && (value === undefined || value === null || value === '');

    const renderValue = () => {
        if (isMissing || isPresentWithEmpty) {
            return <span className="text-slate-500 italic">Non renseigné</span>;
        }

        if (type === 'scale') {
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

        if (type === 'multiple' && Array.isArray(value)) {
            return (
                <div className="flex flex-wrap gap-2 mt-1">
                    {value.map((v, i) => {
                        const formatted = (questionType && fieldKey) ? getOptionLabel(questionType, fieldKey, v) : v;
                        return (
                            <span key={i} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-200">
                                {formatted}
                            </span>
                        );
                    })}
                </div>
            );
        }

        if (type === 'file') {
            return (
                <a href={value as string} target="_blank" rel="noreferrer" className="text-questionnaire-primary hover:underline text-sm flex items-center gap-1">
                    Voir le fichier ↗
                </a>
            )
        }

        if (type === 'url') {
            return (
                <a href={value as string} target="_blank" rel="noreferrer" className="text-questionnaire-primary hover:underline text-sm truncate max-w-full">
                    {value}
                </a>
            )
        }

        const formattedValue = (type === 'single' && questionType && fieldKey && typeof value === 'string')
            ? getOptionLabel(questionType, fieldKey, value)
            : String(value);

        return <span className="text-white">{formattedValue}</span>;
    }

    return (
        <div className={`p-4 rounded-xl bg-white/[0.015] border ${isMissing ? 'border-red-500/20 bg-red-500/[0.02]' : 'border-white/5'} flex flex-col gap-1.5 transition-colors hover:bg-white/[0.03]`}>
            <label className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="text-sm">
                {renderValue()}
            </div>
        </div>
    );
}
