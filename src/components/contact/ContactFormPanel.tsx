"use client"

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import Link from "next/link"

type ContactType = "agency" | "brand"
type FormStatus = "idle" | "loading" | "success" | "error"

interface ContactFormPanelProps {
    contactType: ContactType
    objective: string | null
}

interface ContactPayload {
    name: string
    email: string
    company: string
    message: string
}

const INITIAL_FORM: ContactPayload = {
    name: "",
    email: "",
    company: "",
    message: "",
}

export function ContactFormPanel({ contactType, objective }: ContactFormPanelProps) {
    const [form, setForm] = useState<ContactPayload>(INITIAL_FORM)
    const [status, setStatus] = useState<FormStatus>("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const fallbackMailto = useMemo(() => {
        const subject = encodeURIComponent(
            contactType === "agency" ? "Demande partenariat agence" : "Demande projet marque"
        )
        const body = encodeURIComponent(
            `Bonjour l'équipe Wafia,\n\nType: ${contactType}\nObjectif: ${objective ?? "Non précisé"}\nNom: ${form.name || "Non renseigné"}\nEmail: ${form.email || "Non renseigné"}\nSociété: ${form.company || "Non renseignée"}\n\nMessage:\n${form.message || "Aucun message"}\n`
        )
        return `mailto:contact@wafia.fr?subject=${subject}&body=${body}`
    }, [contactType, form.company, form.email, form.message, form.name, objective])

    const onFieldChange =
        (field: keyof ContactPayload) =>
            (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((prev) => ({ ...prev, [field]: event.target.value }))
            }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (status === "loading") return

        setStatus("loading")
        setErrorMessage("")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    type: contactType,
                    objective,
                }),
            })

            const payload = (await response.json().catch(() => ({}))) as { error?: string }

            if (!response.ok) {
                throw new Error(payload.error ?? "Impossible d'envoyer votre demande pour le moment.")
            }

            setStatus("success")
            setForm(INITIAL_FORM)
        } catch (error) {
            setStatus("error")
            setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue est survenue.")
        }
    }

    return (
        <main className="min-h-screen px-6 py-20">
            <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Contact
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight">
                    {contactType === "agency" ? "Partenariat Agence" : "Projet Marque"}
                </h1>
                <p className="mt-4 text-slate-600 dark:text-slate-300">
                    {objective
                        ? `Objectif détecté: ${objective}.`
                        : "Décrivez votre besoin et nous revenons vers vous rapidement."}
                </p>

                {status === "success" ? (
                    <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                        <p className="text-lg font-semibold">Message envoyé.</p>
                        <p className="mt-2 text-sm">
                            Merci, notre équipe revient vers vous rapidement avec une réponse contextualisée.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => setStatus("idle")}
                                className="inline-flex min-h-11 items-center rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-300 dark:text-emerald-950 dark:hover:bg-emerald-200"
                            >
                                Envoyer un autre message
                            </button>
                            <Link
                                href="/questionnaire-brands/index.html"
                                className="inline-flex min-h-11 items-center rounded-full border border-emerald-700/30 px-5 py-2 text-sm font-semibold transition hover:bg-emerald-100 dark:border-emerald-300/30 dark:hover:bg-emerald-300/10"
                            >
                                Lancer le diagnostic
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="mt-8 space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Nom complet</span>
                                <input
                                    name="name"
                                    autoComplete="name"
                                    required
                                    minLength={2}
                                    maxLength={80}
                                    value={form.name}
                                    onChange={onFieldChange("name")}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-white/35"
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Email professionnel</span>
                                <input
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    maxLength={160}
                                    value={form.email}
                                    onChange={onFieldChange("email")}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-white/35"
                                />
                            </label>
                        </div>

                        <label className="space-y-2 block">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Société</span>
                            <input
                                name="company"
                                autoComplete="organization"
                                required
                                maxLength={120}
                                value={form.company}
                                onChange={onFieldChange("company")}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-white/35"
                            />
                        </label>

                        <label className="space-y-2 block">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Message</span>
                            <textarea
                                name="message"
                                required
                                minLength={20}
                                maxLength={3000}
                                rows={6}
                                value={form.message}
                                onChange={onFieldChange("message")}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-white/35"
                            />
                        </label>

                        {status === "error" && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                                <p>{errorMessage}</p>
                                <a
                                    href={fallbackMailto}
                                    className="mt-2 inline-flex items-center text-sm font-semibold underline underline-offset-4"
                                >
                                    Envoyer via email à la place
                                </a>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="inline-flex min-h-11 items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black"
                            >
                                {status === "loading" ? "Envoi en cours..." : "Envoyer"}
                            </button>
                            <Link
                                href="/questionnaire-brands/index.html"
                                className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold transition hover:bg-slate-100 dark:border-white/20 dark:hover:bg-white/10"
                            >
                                Lancer le diagnostic
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </main>
    )
}
