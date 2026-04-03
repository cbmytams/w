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

const SHEET_ANIMATION_MS = 220
const DETAILS_DEFER_MS = 240

const GlassCheck = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
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
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 dark:bg-black/60 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={onClose}
      />

      <div className="pointer-events-none absolute inset-0 flex items-end p-2 sm:items-center sm:justify-end sm:p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          tabIndex={-1}
          className={`relative flex h-[calc(100dvh-1rem)] w-full flex-col overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/40 backdrop-blur-[60px] saturate-[180%] shadow-[0_24px_80px_rgba(0,0,0,0.12)] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform dark:border-white/10 dark:bg-[#1C1C1E]/40 dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:h-[calc(100dvh-2rem)] sm:w-[480px] ${isOpen ? "translate-y-0 opacity-100 sm:translate-x-0" : "translate-y-8 opacity-0 sm:translate-x-full sm:translate-y-0"
            } pointer-events-auto`}
        >
          {/* Subtle light leak for glass effect */}
          <div className="pointer-events-none absolute -inset-px rounded-[2.5rem] border border-white/20 dark:border-white-[0.08]" />
          <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] translate-x-1/3 -translate-y-1/3 rounded-full bg-purple-500/20 dark:bg-purple-500/30 blur-[70px]" />

          <button
            onClick={onClose}
            className="group absolute right-5 top-5 z-50 flex h-8 w-8 items-center justify-center cursor-pointer rounded-full bg-black/5 backdrop-blur-md transition-all duration-200 hover:bg-black/10 hover:scale-105 dark:bg-white/10 dark:hover:bg-white/20"
            aria-label="Fermer"
            type="button"
          >
            <X className="h-4 w-4 text-slate-700 transition-colors duration-200 dark:text-slate-300" />
          </button>

          <div
            className="flex-1 overflow-y-auto overflow-x-hidden px-7 py-10 sm:px-9 sm:py-12 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-black/[0.08] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1 dark:[&::-webkit-scrollbar-thumb]:bg-white/[0.08]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="relative z-10 flex min-h-full flex-col">
              <div className="mb-10 pr-10">
                <div className="mb-5 text-5xl">{renderedItem.icon}</div>
                <h2 id="drawer-title" className="mb-2.5 text-[28px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  {renderedItem.title}
                </h2>
                <p className="text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                  {renderedItem.subtitle}
                </p>
              </div>

              {!detailsReady ? (
                <div className="space-y-4">
                  <div className="h-3 w-11/12 rounded-full bg-black/[0.07] dark:bg-white/[0.08]" />
                  <div className="h-3 w-10/12 rounded-full bg-black/[0.07] dark:bg-white/[0.08]" />
                  <div className="h-3 w-8/12 rounded-full bg-black/[0.07] dark:bg-white/[0.08]" />
                </div>
              ) : renderedItem.detail ? (
                <div className="space-y-10">
                  <div>
                    <p className="text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">
                      {renderedItem.detail.intro}
                    </p>
                  </div>

                  <div>
                    <div className="mb-5 inline-flex flex-col">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        Le Processus
                      </span>
                    </div>
                    <ul className="ml-1 space-y-3.5">
                      {renderedItem.detail.whatWeDo?.map((task, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.3)]" />
                          <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="mb-5 inline-flex flex-col">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        Livrables Concrets
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {renderedItem.detail.deliverables?.map((deliverable, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3.5 rounded-2xl bg-black/[0.03] backdrop-blur-md p-4 dark:bg-white/[0.04] border border-black/[0.02] dark:border-white/[0.05] shadow-sm"
                        >
                          <GlassCheck />
                          <span className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                            {deliverable}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="mb-6 inline-flex flex-col">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        La Méthode
                      </span>
                    </div>
                    <div className="relative space-y-5 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-[1px] before:bg-gradient-to-b before:from-purple-400/30 before:via-slate-300/20 before:to-transparent dark:before:from-purple-500/20 dark:before:via-white/[0.06]">
                      {renderedItem.detail.howItWorks?.map((step, i) => (
                        <div key={i} className="relative flex gap-4">
                          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white/60 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:border-white/[0.1] dark:bg-white/[0.05] dark:shadow-none">
                            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{i + 1}</span>
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="mb-0.5 text-sm font-semibold text-slate-900 dark:text-white/90">
                              {step.step}
                            </div>
                            <div className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                              {step.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent p-6 backdrop-blur-[20px] dark:border-purple-400/20 dark:from-purple-500/10">
                      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-700 dark:text-purple-300">
                        Cible
                      </span>
                      <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                        {renderedItem.detail.forWho}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="min-h-8 flex-1" />

              <div className="mt-10 pb-2">
                <a
                  href={ctaHref}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-slate-900 px-6 py-4 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-[0.98] dark:bg-white dark:text-slate-900 dark:shadow-[0_8px_24px_rgba(255,255,255,0.08)] dark:hover:shadow-[0_12px_32px_rgba(255,255,255,0.15)]"
                >
                  <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[200%] dark:via-black/10" />
                  <span className="relative z-10">Se référencer</span>
                  <ArrowRight className="relative z-10 h-4 w-4 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
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
