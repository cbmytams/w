"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Calendar, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

function ContactContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const typeParam = searchParams.get("type")
    const [activeTab, setActiveTab] = React.useState<"brand" | "talent">("brand")

    React.useEffect(() => {
        if (typeParam === "talent") setActiveTab("talent")
        else if (typeParam === "brand") setActiveTab("brand")
    }, [typeParam])

    return (
        <>
            {/* Back Button */}
            <div className="max-w-3xl mx-auto mb-8">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Retour</span>
                </button>
            </div>

            <div className="max-w-3xl mx-auto mb-12 text-center">
                <h1 className="font-heading text-4xl font-bold text-slate-900 mb-6">Contactez Wafia</h1>
                <div className="inline-flex rounded-lg bg-slate-200 p-1 mb-8">
                    <button
                        onClick={() => setActiveTab("brand")}
                        className={cn(
                            "px-6 py-2.5 rounded-md text-sm font-medium transition-all",
                            activeTab === "brand" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                        )}
                    >
                        Je suis une Marque
                    </button>
                    <button
                        onClick={() => setActiveTab("talent")}
                        className={cn(
                            "px-6 py-2.5 rounded-md text-sm font-medium transition-all",
                            activeTab === "talent" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                        )}
                    >
                        Je suis un Talent
                    </button>
                </div>
            </div>

            <div className="max-w-2xl mx-auto">
                {activeTab === "brand" ? (
                    <Card key="brand-form">
                        <CardHeader>
                            <CardTitle>Parlons de votre projet</CardTitle>
                            <CardDescription>Remplissez ce formulaire ou réservez un créneau directement.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                className="space-y-6"
                                onSubmit={(event) => event.preventDefault()}
                                aria-describedby="brand-form-help"
                            >
                                {/* Brand Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="brand-name" className="text-sm font-medium">Nom complet</label>
                                        <Input id="brand-name" name="brand-name" placeholder="Jean Dupont" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="brand-email" className="text-sm font-medium">Email professionnel</label>
                                        <Input id="brand-email" name="brand-email" type="email" placeholder="jean@entreprise.com" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="brand-company" className="text-sm font-medium">Société</label>
                                    <Input id="brand-company" name="brand-company" placeholder="Nom de votre entreprise" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="brand-budget" className="text-sm font-medium">Budget estimé</label>
                                    <select id="brand-budget" name="brand-budget" className="flex h-11 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950" required>
                                        <option value="">Sélectionnez une fourchette</option>
                                        <option value="<5k">Moins de 5k€</option>
                                        <option value="5k-20k">5k€ - 20k€</option>
                                        <option value="20k-50k">20k€ - 50k€</option>
                                        <option value=">50k">Plus de 50k€</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="brand-message" className="text-sm font-medium">Message (Optionnel)</label>
                                    <textarea
                                        id="brand-message"
                                        name="brand-message"
                                        className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                                        placeholder="Décrivez votre besoin en quelques mots..."
                                    />
                                </div>
                                <p id="brand-form-help" className="text-xs text-slate-500">
                                    Ce formulaire est une pré‑qualification. Un membre de l&apos;équipe revient vers vous rapidement.
                                </p>
                                <Button className="w-full" size="lg" type="submit">Envoyer la demande</Button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
                                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">OU</span></div>
                                </div>

                                <Button variant="outline" className="w-full" size="lg" type="button">
                                    <Calendar className="mr-2 h-4 w-4" /> Réserver un appel (Calendly)
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <Card key="talent-form">
                        <CardHeader>
                            <CardTitle>Candidature Talent</CardTitle>
                            <CardDescription>Rejoignez le roster Wafia. Nous traitons uniquement les profils sérieux.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6" onSubmit={(event) => event.preventDefault()} aria-describedby="talent-form-help">
                                {/* Talent Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="talent-name" className="text-sm font-medium">Nom complet / Pseudo</label>
                                        <Input id="talent-name" name="talent-name" placeholder="@pseudo" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="talent-city" className="text-sm font-medium">Ville</label>
                                        <Input id="talent-city" name="talent-city" placeholder="Paris" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="talent-email" className="text-sm font-medium">Email</label>
                                        <Input id="talent-email" name="talent-email" type="email" placeholder="contact@talent.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="talent-phone" className="text-sm font-medium">Téléphone</label>
                                        <Input id="talent-phone" name="talent-phone" type="tel" placeholder="06 00 00 00 00" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Plateformes actives</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Instagram", "TikTok", "YouTube", "Twitch", "LinkedIn", "Podcast"].map((plat) => (
                                            <label key={plat} className="flex items-center space-x-2 border border-slate-200 rounded-md p-3 cursor-pointer hover:bg-slate-50">
                                                <input type="checkbox" name={`platform-${plat.toLowerCase()}`} className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                                                <span className="text-sm">{plat}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="talent-links" className="text-sm font-medium">Vos liens (réseaux sociaux)</label>
                                    <textarea
                                        id="talent-links"
                                        name="talent-links"
                                        className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900"
                                        placeholder="instagram.com/pseudo, tiktok.com/@pseudo..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="talent-monetize" className="text-sm font-medium">Monétisez-vous déjà ?</label>
                                        <select id="talent-monetize" name="talent-monetize" className="flex h-11 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900" required>
                                            <option>Oui</option>
                                            <option>Non</option>
                                            <option>Un peu</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="talent-stats" className="text-sm font-medium">Partage stats audit ?</label>
                                        <select id="talent-stats" name="talent-stats" className="flex h-11 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900" required>
                                            <option>Oui, j&apos;accepte</option>
                                            <option>Non</option>
                                        </select>
                                    </div>
                                </div>

                                <p id="talent-form-help" className="text-xs text-slate-500">
                                    En soumettant ce formulaire, vous acceptez que Wafia vous recontacte.
                                </p>
                                <Button className="w-full" size="lg" type="submit">Envoyer ma candidature</Button>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    )
}

export default function ContactPage() {
    return (
        <main id="main-content" className="py-24 bg-slate-50 min-h-screen">
            <Container>
                <Suspense fallback={
                    <div className="flex h-[50vh] w-full items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                }>
                    <ContactContent />
                </Suspense>
            </Container>
        </main>
    )
}
