/**
 * Types partagés pour le projet Wafia
 * Centralise toutes les interfaces et types réutilisables
 */

import { ReactNode } from "react";

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  name: string;
  href: string;
}

// ============================================
// Client Types
// ============================================

export interface Client {
  name: string;
  width: string;
}

// ============================================
// FAQ Types
// ============================================

export interface FaqItem {
  q: string;
  a: string;
}

// ============================================
// Component Props Types
// ============================================

export interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}
