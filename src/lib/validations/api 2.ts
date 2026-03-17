/**
 * Shared Zod schemas for API route validation.
 * Re-usable across multiple routes for consistent input validation.
 */
import { z } from "zod";

// ============================================
// Pagination
// ============================================

export const PaginationSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});

// ============================================
// Identifiers
// ============================================

export const SlugSchema = z.object({
    slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "Le slug doit être en minuscules alphanumériques avec des tirets"),
});

export const IdSchema = z.object({
    id: z.string().min(1).max(64),
});

// ============================================
// Contact Form
// ============================================

export const ContactFormSchema = z.object({
    name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(80, "Le nom ne peut pas dépasser 80 caractères"),
    email: z.string().trim().email("Adresse email invalide").max(160, "L'adresse email est trop longue"),
    company: z.string().trim().min(1, "Le nom de société est requis").max(120, "Le nom de société est trop long"),
    message: z.string().trim().min(20, "Le message doit contenir au moins 20 caractères").max(3000, "Le message ne peut pas dépasser 3000 caractères"),
    type: z.enum(["agency", "brand"]).default("brand"),
    objective: z.string().trim().nullable().optional(),
});

// ============================================
// Authentication
// ============================================

export const LoginSchema = z.object({
    username: z.string().trim().min(1, "Le nom d'utilisateur est requis").max(100),
    password: z.string().min(1, "Le mot de passe est requis").max(200),
});

// ============================================
// Questionnaire Submission
// ============================================

export const QuestionnaireSubmitSchema = z.object({
    type: z.enum(["TALENTS", "BRANDS"]),
    responses: z.record(z.string(), z.unknown()).refine(
        (val) => Object.keys(val).length > 0,
        "L'objet responses ne peut pas être vide"
    ),
});

// ============================================
// Questionnaire Admin — Reorder
// ============================================

export const ReorderSchema = z.object({
    startIndex: z.number().int().min(0),
    endIndex: z.number().int().min(0),
});
