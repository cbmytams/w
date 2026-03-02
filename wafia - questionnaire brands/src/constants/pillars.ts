/**
 * WAFIA BRAND DIAGNOSTIC - PILIERS D'ANALYSE
 * Configuration des 5 axes de maturité marketing marque
 */

import type { Pillar, BrandPillarKey } from '../types';

/**
 * Les 5 axes d'analyse Wafia Brand
 */
export const PILLARS: Record<BrandPillarKey, Pillar> = {
    STRATEGY: {
        key: 'STRATEGY',
        label: 'Stratégie',
        description: 'Objectifs business, North Star, benchmark, positionnement',
        icon: 'Target',
        color: '#F97316', // Orange
    },
    CONTENT: {
        key: 'CONTENT',
        label: 'Contenu',
        description: 'Production UGC, formats, volume, assets créatifs',
        icon: 'Film',
        color: '#EF4444', // Red
    },
    ACTIVATION: {
        key: 'ACTIVATION',
        label: 'Activation',
        description: 'Paid media, influence, SEO, leviers de croissance',
        icon: 'Zap',
        color: '#F59E0B', // Amber
    },
    DATA: {
        key: 'DATA',
        label: 'Data',
        description: 'Tracking, attribution, KPIs, reporting',
        icon: 'BarChart3',
        color: '#10B981', // Emerald
    },
    ORGANIZATION: {
        key: 'ORGANIZATION',
        label: 'Organisation',
        description: 'Équipe marketing, process décisionnel, maturité agence',
        icon: 'Users',
        color: '#8B5CF6', // Violet
    },
};

/**
 * Ordre d'affichage des piliers
 */
export const PILLAR_ORDER: BrandPillarKey[] = [
    'STRATEGY',
    'CONTENT',
    'ACTIVATION',
    'DATA',
    'ORGANIZATION'
];

/**
 * Labels des sections pour les interstitiels
 */
export const SECTION_LABELS: Record<string, { label: string; description: string; emoji: string }> = {
    QUICK_LEAD: {
        label: 'Contact Express',
        description: 'Vos coordonnées pour vous recontacter',
        emoji: '⚡',
    },
    IDENTIFICATION: {
        label: 'Contexte Business',
        description: 'Votre entreprise et votre marché',
        emoji: '🏢',
    },
    NORTH_STAR: {
        label: 'Objectif Stratégique',
        description: 'Votre priorité business #1',
        emoji: '⭐',
    },
    MATURITY: {
        label: 'Maturité Marketing',
        description: 'Vos canaux et performances actuels',
        emoji: '📊',
    },
    NEEDS_AWARENESS: {
        label: 'Besoins Notoriété',
        description: 'Stratégie de visibilité et de reach',
        emoji: '🎯',
    },
    NEEDS_TRAFFIC: {
        label: 'Besoins Trafic',
        description: 'Acquisition de visiteurs qualifiés',
        emoji: '🚀',
    },
    NEEDS_CONVERSION: {
        label: 'Besoins Conversion',
        description: 'Optimisation des ventes et du CAC',
        emoji: '💰',
    },
    NEEDS_RETENTION: {
        label: 'Besoins Fidélisation',
        description: 'Rétention et programmes ambassadeurs',
        emoji: '❤️',
    },
    SERVICES: {
        label: 'Services & Opérations',
        description: 'Vos besoins en production et activation',
        emoji: '🔧',
    },
    BUDGET: {
        label: 'Budget & Timeline',
        description: 'Investissement et planning',
        emoji: '💼',
    },
    COMPETITIVE: {
        label: 'Univers Concurrentiel',
        description: 'Benchmark et inspirations créatives',
        emoji: '🔍',
    },
    ORGANIZATION: {
        label: 'Organisation Interne',
        description: 'Équipe et processus de décision',
        emoji: '👥',
    },
    ADDITIONAL: {
        label: 'Informations Clés',
        description: 'Contexte complémentaire et motivations',
        emoji: '📝',
    },
};

/**
 * Scores initiaux (base 50/100 pour chaque pilier)
 */
export const INITIAL_SCORES: Record<BrandPillarKey, number> = {
    STRATEGY: 50,
    CONTENT: 50,
    ACTIVATION: 50,
    DATA: 50,
    ORGANIZATION: 50,
};

/**
 * Seuils de niveau global
 */
export const LEVEL_THRESHOLDS = {
    debutant: 40,
    intermediaire: 55,
    avance: 70,
    expert: 85,
} as const;
