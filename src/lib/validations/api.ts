/**
 * Shared Zod schemas for API route validation.
 * Re-usable across multiple routes for consistent input validation.
 */
import { z } from "zod";

// ============================================
// Contact Form
// ============================================

export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(80, "Le nom ne peut pas dépasser 80 caractères"),
  email: z
    .string()
    .trim()
    .email("Adresse email invalide")
    .max(160, "L'adresse email est trop longue"),
  company: z
    .string()
    .trim()
    .min(1, "Le nom de société est requis")
    .max(120, "Le nom de société est trop long"),
  message: z
    .string()
    .trim()
    .min(20, "Le message doit contenir au moins 20 caractères")
    .max(3000, "Le message ne peut pas dépasser 3000 caractères"),
  type: z.enum(["agency", "brand"]).default("brand"),
  objective: z.string().trim().nullable().optional(),
});
