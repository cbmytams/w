"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X, ArrowRight } from "lucide-react"
import type { TALENT_DELIVERABLES } from "@/constants"
import { buildTalentQuestionnaireHref } from "@/lib/talent-questionnaire"
import { useFocusTrap } from "@/hooks/useFocusTrap"
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock"

type DeliverableItem = typeof TALENT_DELIVERABLES.items[number]

interface DeliverableDetailDrawerProps {
  item: DeliverableItem | null
  onClose: () => void
}

const SHEET_ANIMATION_MS = 300
const DETAILS_DEFER_MS = 240

const GlassCheck = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mt-0.5 shrink-0 text-purple-600 dark:text-purple-400"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
)

export function DeliverableDetailDrawer({ item, onClose }: DeliverableDetailDrawerProps) {
  const ctaHref = buildTalentQuestionnaireHref("for-talents-deliverable-drawer")
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [renderedItem, setRenderedItem] = useState<DeliverableItem | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [detailsReady, setDetailsReady] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const { lock, unlock } = useBodyScrollLock()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia("(max-width: 768px)")
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener("change", update)

    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    let primeRaf = 0
    let openRaf = 0
    let closeTimer = 0
    let detailsTimer = 0

    if (item) {
      lock()

      primeRaf = window.requestAnimationFrame(() => {
        setRenderedItem(item)
        setDetailsReady(false)
        openRaf = window.requestAnimationFrame(() => {
          setIsOpen(true)
        })
      })

      detailsTimer = window.setTimeout(() => {
        setDetailsReady(true)
      }, DETAILS_DEFER_MS)
    } else {
      primeRaf = window.requestAnimationFrame(() => {
        setIsOpen(false)
      })

      closeTimer = window.setTimeout(() => {
        setRenderedItem(null)
        setDetailsReady(false)
        unlock()
      }, SHEET_ANIMATION_MS)
    }

    return () => {
      if (primeRaf) window.cancelAnimationFrame(primeRaf)
      if (openRaf) window.cancelAnimationFrame(openRaf)
      if (closeTimer) window.clearTimeout(closeTimer)
      if (detailsTimer) window.clearTimeout(detailsTimer)
    }
  }, [item, lock, unlock])

  useEffect(() => {
    if (!renderedItem) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [renderedItem, onClose])

  useFocusTrap(dialogRef, isOpen && !isMobile)

  if (!mounted || (!renderedItem && !isOpen)) return null
  if (!renderedItem) return null

  return createPortal(
    <div className={`fixed inset-0 z-[1040] ${isOpen ? "" : "pointer-events-none"}`}>
      {/* Deep Blur Backdrop */}
      <div
        className={`absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-2 sm:items-center sm:justify-end sm:p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          tabIndex={-1}
          className={`relative flex max-h-[calc(100dvh-1.5rem)] w-full flex-col overflow-hidden rounded-[2.5rem] bg-white/85 dark:bg-[#151517]/85 backdrop-blur-3xl shadow-[0_24px_80px_rgba(0,0,0,0.12)] border border-white/40 dark:border-white/10 dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)] transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform sm:h-[calc(100dvh-2rem)] sm:max-h-none sm:w-[480px] pointer-events-auto ${isOpen ? "translate-y-0 opacity-100 sm:translate-x-0" : "translate-y-8 opacity-0 sm:translate-x-full sm:translate-y-0"}`}
        >
          {/* subtle light leak edge */}
          <div className="pointer-events-none absolute -inset-px rounded-[2.5rem] border border-white/20 dark:border-white/5" />

          {/* Soft ambient glow in top corner */}
          <div className="pointer-events-none absolute right-0 top-0 h-[250px] w-[250px] translate-x-1/3 -translate-y-1/3 rounded-full bg-purple-500/10 dark:bg-purple-500/10 blur-[50px]" />

          {/* Close Button - Apple Style Soft Circle */}
          <button
            onClick={onClose}
            className="group absolute right-5 top-5 z-50 flex h-8 w-8 items-center justify-center cursor-pointer rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/20 active:scale-95"
            aria-label="Fermer"
            type="button"
          >
            <X className="h-4 w-4 text-gray-700 dark:text-gray-300 transition-colors duration-200" />
          </button>

          <div
            className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-8 sm:px-8 sm:py-10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/10 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1 dark:[&::-webkit-scrollbar-thumb]:bg-white/10"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="relative z-10 flex min-h-full flex-col">

              {/* Header section optimized for reading */}
              <div className="mb-10 pr-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.25rem] bg-white/50 dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/5 text-2xl">
                    {renderedItem.icon}
                  </div>
                </div>
                <h2 id="drawer-title" className="mb-2 text-[26px] font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                  {renderedItem.title}
                </h2>
                <p className="text-[15px] font-medium leading-relaxed text-gray-500 dark:text-white/60">
                  {renderedItem.subtitle}
                </p>
              </div>

              {!detailsReady ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-3 w-11/12 rounded-full bg-black/[0.05] dark:bg-white/[0.05]" />
                  <div className="h-3 w-10/12 rounded-full bg-black/[0.05] dark:bg-white/[0.05]" />
                  <div className="h-3 w-8/12 rounded-full bg-black/[0.05] dark:bg-white/[0.05]" />
                </div>
              ) : renderedItem.detail ? (
                <div className="space-y-8">
                  {/* Intro Text */}
                  <div>
                    <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                      {renderedItem.detail.intro}
                    </p>
                  </div>

                  {/* Le Processus - iOS Grouped Style */}
                  <div>
                    <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                      Le Processus
                    </span>
                    <div className="overflow-hidden rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05]">
                      <ul className="divide-y divide-black/[0.05] dark:divide-white/[0.05]">
                        {renderedItem.detail.whatWeDo?.map((task, i) => (
                          <li key={i} className="flex items-center gap-3 px-4 py-3.5">
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500 dark:bg-purple-400" />
                            <span className="text-[14px] font-medium text-gray-800 dark:text-gray-200">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Livrables Concrets - iOS Grouped Style */}
                  <div>
                    <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                      Livrables Concrets
                    </span>
                    <div className="overflow-hidden rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05]">
                      <ul className="divide-y divide-black/[0.05] dark:divide-white/[0.05]">
                        {renderedItem.detail.deliverables?.map((deliverable, i) => (
                          <li key={i} className="flex items-start gap-3 px-4 py-3.5">
                            <GlassCheck />
                            <span className="text-[14px] font-medium leading-snug text-gray-800 dark:text-gray-200">
                              {deliverable}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* La Méthode - Clean Timeline Layout */}
                  <div>
                    <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                      La Méthode
                    </span>
                    <div className="relative space-y-6 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-[1px] before:bg-gradient-to-b before:from-purple-400/30 before:via-gray-300/30 before:to-transparent dark:before:via-white/[0.1]">
                      {renderedItem.detail.howItWorks?.map((step, i) => (
                        <div key={i} className="relative flex gap-4">
                          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/90 shadow-sm dark:border-white/[0.15] dark:bg-[#1C1C1E]">
                            <span className="text-[12px] font-bold text-gray-700 dark:text-gray-300">{i + 1}</span>
                          </div>
                          <div className="flex-1 pt-1.5 pb-2">
                            <div className="mb-1 text-[14px] font-bold text-gray-900 dark:text-white/95">
                              {step.step}
                            </div>
                            <div className="text-[13px] leading-relaxed text-gray-500 dark:text-white/50">
                              {step.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Audience Highlight */}
                  <div>
                    <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-purple-500/5 p-5 dark:border-purple-400/20 dark:from-purple-500/10">
                      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-purple-700 dark:text-purple-400">
                        Pour Qui
                      </span>
                      <p className="text-[14px] font-medium leading-relaxed text-gray-800 dark:text-gray-200">
                        {renderedItem.detail.forWho}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="min-h-12 flex-1" />

              {/* Sticky bottom CTA */}
              <div className="mt-8 pb-4 pt-2 sticky bottom-0 bg-gradient-to-t from-white/90 via-white/80 to-transparent dark:from-[#151517]/90 dark:via-[#151517]/80 -mx-6 px-6 sm:-mx-8 sm:px-8">
                <a
                  href={ctaHref}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[1.25rem] bg-gray-900 px-6 py-4 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-[0.98] dark:bg-white dark:text-gray-900 dark:shadow-[0_8px_24px_rgba(255,255,255,0.08)] dark:hover:shadow-[0_12px_32px_rgba(255,255,255,0.15)]"
                >
                  <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[200%] dark:via-black/10" />
                  <span className="relative z-10">S'inscrire et se référencer</span>
                  <ArrowRight className="relative z-10 h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
