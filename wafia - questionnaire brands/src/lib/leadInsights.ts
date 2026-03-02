import { ALL_QUESTIONS, PILLARS, PILLAR_ORDER, SECTION_LABELS } from '../constants';
import type { Lead, Answers } from '../types';
import { calculateScores } from '../utils/scoring';

const questionIndex = new Map(ALL_QUESTIONS.map((q, i) => [q.id, i]));

const getAnswers = (lead: Lead): Answers => (lead.answers || {}) as Answers;

const getAnswerKeys = (lead: Lead) => Object.keys(getAnswers(lead));

export const getLeadCompletionPercent = (lead: Lead) => {
    const count = getAnswerKeys(lead).length;
    if (!ALL_QUESTIONS.length) return 0;
    return Math.round((count / ALL_QUESTIONS.length) * 100);
};

export const getLeadProgress = (lead: Lead) => {
    const answers = getAnswerKeys(lead);
    if (answers.length === 0) {
        return { label: 'Aucune réponse', pillar: null, question: null };
    }

    const ordered = answers
        .filter((id) => questionIndex.has(id))
        .sort((a, b) => (questionIndex.get(a) || 0) - (questionIndex.get(b) || 0));

    const lastId = ordered.length > 0 ? ordered[ordered.length - 1] : answers[answers.length - 1];
    const question = ALL_QUESTIONS.find((q) => q.id === lastId);
    const pillar = question?.category && question.category !== 'QUICK_LEAD' ? question.category : null;
    const label = question?.question || lastId;

    return {
        label,
        pillar,
        question: question || null
    };
};

const getSocialPresenceScore = (lead: Lead) => {
    const answers = getAnswers(lead);
    const socialKeys = [
        'talent_social_instagram',
        'talent_social_tiktok',
        'talent_social_youtube',
        'talent_social_linkedin',
        'talent_social_twitter',
        'talent_social_snapchat',
        'talent_social_portfolio',
        'talent_social_other_handle'
    ];
    const count = socialKeys.reduce((acc, key) => (answers[key] ? acc + 1 : acc), 0);
    return Math.min(count * 6, 30);
};

const getIntentScore = (lead: Lead) => {
    const answers = getAnswers(lead);
    let score = 0;
    if (answers.q0_objective === 'cash') score += 8;
    if (answers.q0_objective === 'fame') score += 6;
    if (answers.q0_objective === 'image') score += 5;
    if (answers.q0_level === 'star') score += 10;
    if (answers.q0_level === 'intermediaire') score += 6;
    if (answers.q0_level === 'debutant') score += 2;
    return score;
};

const getProfileScore = (lead: Lead) => {
    const answers = getAnswers(lead);
    let score = 0;

    if (typeof answers.talent_domains === 'string' && answers.talent_domains.trim().length > 0) score += 10;
    if (typeof answers.talent_city === 'string' && answers.talent_city.trim().length > 0) score += 6;
    if (typeof answers.talent_phone === 'string' && answers.talent_phone.trim().length > 0) score += 8;
    if (answers.talent_has_agency === 'yes') score += 6;
    if (typeof answers.talent_agency_name === 'string' && answers.talent_agency_name.trim().length > 0) score += 4;

    return score;
};

export const getLeadInterestScore = (lead: Lead) => {
    const answers = getAnswers(lead);
    let baseScore = lead.score || 0;

    if (!baseScore && Object.keys(answers).length > 0) {
        const scores = calculateScores(answers, ALL_QUESTIONS);
        const avg = PILLAR_ORDER.reduce((acc, pillar) => acc + scores[pillar], 0) / PILLAR_ORDER.length;
        baseScore = Math.round(avg);
    }

    const completion = getLeadCompletionPercent(lead);
    const hasEmail = lead.email ? 10 : 0;
    const socials = getSocialPresenceScore(lead);
    const intent = getIntentScore(lead);
    const profile = getProfileScore(lead);

    const interest = Math.round(
        baseScore * 0.45 +
        completion * 0.2 +
        socials * 0.15 +
        intent +
        hasEmail +
        profile
    );

    return Math.max(0, Math.min(100, interest));
};

export const getLeadInterestTier = (score: number) => {
    if (score >= 80) return { label: 'Hot', color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' };
    if (score >= 60) return { label: 'Warm', color: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20' };
    if (score >= 40) return { label: 'Potential', color: 'text-blue-300 bg-blue-500/10 border-blue-500/20' };
    return { label: 'Cold', color: 'text-zinc-300 bg-white/5 border-white/10' };
};

export const getLeadTags = (lead: Lead) => {
    const answers = getAnswers(lead);
    const tags: string[] = [];

    if (typeof answers.talent_domains === 'string' && answers.talent_domains.trim().length > 0) {
        tags.push(...answers.talent_domains.split(',').map((tag) => tag.trim()).filter(Boolean));
    }
    if (typeof answers.q0_objective === 'string') tags.push(answers.q0_objective);
    if (typeof answers.q0_level === 'string') tags.push(answers.q0_level);

    return Array.from(new Set(tags)).slice(0, 4);
};

export const getPillarLabel = (pillar?: string | null) => {
    if (!pillar) return 'Contact Express';
    return (PILLARS as Record<string, { label: string }>)[pillar]?.label
        || (SECTION_LABELS as Record<string, { label: string }>)[pillar]?.label
        || pillar;
};

export const formatLeadDate = (value: string) => {
    try {
        return new Date(value).toLocaleDateString();
    } catch {
        return value;
    }
};
