import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"
import { Highlight } from "@/components/ui/highlight"
import { AgenciesFloatingNavigation } from "@/components/for-agencies/AgenciesFloatingNavigation"
import { AGENCY_HERO, AGENCY_PROBLEM, AGENCY_MODES, AGENCY_CASES, AGENCY_STANDARDS, AGENCY_CTA } from "@/constants"

export default function ForAgenciesPage() {
    return (
        <div className="bg-white">
            <AgenciesFloatingNavigation />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4">
                <Container className="text-center">
                    <FadeIn delay={0.1} noOpacity>
                        <div className="max-w-5xl mx-auto">
                            <h1 className="font-heading text-6xl sm:text-7xl lg:text-9xl font-extrabold tracking-tight leading-[1] mb-8">
                                {AGENCY_HERO.title} <Highlight color="primary">{AGENCY_HERO.highlight}</Highlight>.
                            </h1>
                            <p className="text-xl sm:text-3xl text-slate-800 font-bold max-w-3xl mx-auto mb-6">
                                {AGENCY_HERO.subtitle}
                            </p>
                            <p className="text-lg sm:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed whitespace-pre-line">
                                {AGENCY_HERO.text}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" asChild className="px-12 py-8 text-xl rounded-full bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all shadow-xl hover:shadow-blue-200">
                                    <Link href="/contact?type=agency">{AGENCY_HERO.cta}</Link>
                                </Button>
                            </div>
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* Problem Section (Kit) */}
            <section id="kit" className="section-spacing bg-blue-50/50">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <h2 className="font-heading text-5xl sm:text-7xl font-extrabold mb-16 leading-tight">
                                {AGENCY_PROBLEM.title} <br />
                                <span className="text-blue-600">{AGENCY_PROBLEM.highlight}</span>
                            </h2>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {AGENCY_PROBLEM.items.map((item, i) => (
                                <FadeIn key={i} delay={i * 0.1}>
                                    <div className="bg-white p-8 rounded-xl border border-blue-100 shadow-sm flex items-center gap-4">
                                        <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                                        <span className="text-lg font-medium text-slate-700">{item}</span>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>

                        <FadeIn delay={0.6}>
                            <p className="text-2xl font-bold text-slate-900 mt-12 text-center border-t border-blue-200 pt-12">
                                {AGENCY_PROBLEM.conclusion}
                            </p>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* Solution Section - Immersive (Modes) */}
            <section id="modes" className="section-spacing bg-blue-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px]"></div>

                <Container className="relative z-10">
                    <div className="max-w-5xl mx-auto mb-20 text-center">
                        <FadeIn>
                            <h2 className="font-heading text-5xl sm:text-7xl font-extrabold mb-6">
                                {AGENCY_MODES.title} <Highlight color="primary">{AGENCY_MODES.highlight}</Highlight>.
                            </h2>
                            <p className="text-2xl sm:text-3xl text-blue-200 font-medium">
                                {AGENCY_MODES.subtitle}
                            </p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {AGENCY_MODES.modes.map((item, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <h3 className="font-heading text-3xl font-bold mb-4 text-blue-400">{item.title}</h3>
                                    <p className="text-lg text-blue-100 leading-relaxed opacity-90">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Use Cases Section (Cases) */}
            <section id="cases" className="section-spacing bg-white">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <h2 className="font-heading text-5xl sm:text-6xl font-extrabold mb-16 text-center">
                                {AGENCY_CASES.title}
                            </h2>
                        </FadeIn>

                        <div className="space-y-8">
                            {AGENCY_CASES.cases.map((item, i) => (
                                <FadeIn key={i} delay={i * 0.1}>
                                    <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-slate-50 rounded-2xl">
                                        <div className="px-6 py-2 bg-blue-600 text-white cursor-default rounded-full font-bold text-center min-w-[100px]">
                                            {item.type}
                                        </div>
                                        <p className="text-xl text-slate-800 font-medium text-center sm:text-left">{item.text}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Benefits Section (Standards) */}
            <section id="standards" className="section-spacing bg-blue-50">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold mb-12 text-center">{AGENCY_STANDARDS.title}</h2>
                            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                                {AGENCY_STANDARDS.items.map((item, i) => (
                                    <div key={i} className="px-8 py-4 bg-white rounded-full shadow-sm text-xl sm:text-2xl font-bold text-blue-600">
                                        ✅ {item}
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* CTA Final */}
            <section className="section-spacing pt-0">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <FadeIn>
                            <h2 className="font-heading text-6xl sm:text-8xl font-extrabold mb-8">
                                {AGENCY_CTA.title} <Highlight color="primary">{AGENCY_CTA.highlight}</Highlight>.
                            </h2>
                            <p className="text-2xl text-slate-600 mb-12 whitespace-pre-line">
                                {AGENCY_CTA.text}
                            </p>
                            <Button size="lg" asChild className="px-12 py-8 text-xl rounded-full bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all shadow-xl hover:shadow-blue-200">
                                <Link href="/contact?type=agency">
                                    {AGENCY_CTA.button} <ArrowRight className="ml-2 h-6 w-6" />
                                </Link>
                            </Button>
                        </FadeIn>
                    </div>
                </Container>
            </section>
        </div>
    )
}
