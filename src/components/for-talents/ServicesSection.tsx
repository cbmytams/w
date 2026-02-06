"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { RevealAnimation } from "@/components/common/RevealAnimation"
import { TALENT_SERVICES } from "@/constants"
import { IdentityLensWidget } from "./widgets/IdentityLensWidget"
import { ProductionPipelineWidget } from "./widgets/ProductionPipelineWidget"
import { OpsHubWidget } from "./widgets/OpsHubWidget"
import { KPIPulseWidget } from "./widgets/KPIPulseWidget"
import { DealDeskWidget } from "./widgets/DealDeskWidget"
import { EventEngineWidget } from "./widgets/EventEngineWidget"
import { SeriesFormatsWidget } from "./widgets/SeriesFormatsWidget"
import { PricingOffersWidget } from "./widgets/PricingOffersWidget"
import { FormationWidget } from "./widgets/FormationWidget"
import { ServiceDetailDrawer } from "./ServiceDetailDrawer"
import { ArrowRight } from "lucide-react"

const widgetMap = {
    "IdentityLens": IdentityLensWidget,
    "ProductionPipeline": ProductionPipelineWidget,
    "OpsHub": OpsHubWidget,
    "KPIPulse": KPIPulseWidget,
    "DealDesk": DealDeskWidget,
    "EventEngine": EventEngineWidget,
    "SeriesFormats": SeriesFormatsWidget,
    "PricingOffers": PricingOffersWidget,
    "Formation": FormationWidget
}

type Service = typeof TALENT_SERVICES.services[number]

export function ServicesSection() {
    const [selectedService, setSelectedService] = useState<Service | null>(null)

    return (
        <section id={TALENT_SERVICES.id} className="section-spacing px-4 bg-transparent">
            <Container>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <RevealAnimation className="mb-16 text-center">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                            {TALENT_SERVICES.title}
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-white/70">
                            {TALENT_SERVICES.subtitle}
                        </p>
                    </RevealAnimation>

                    {/* Services Grid with Grouping */}
                    <div className="space-y-12">
                        {/* FOUNDATION Group (Services 1-3) */}
                        <div className="space-y-16">
                            {TALENT_SERVICES.services.slice(0, 3).map((service, index) => {
                                const isEven = index % 2 === 0
                                const WidgetComponent = service.widget ? widgetMap[service.widget as keyof typeof widgetMap] : null

                                return (
                                    <RevealAnimation key={service.id} delay={index * 0.1}>
                                        <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                                            {/* Text Content */}
                                            <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-sm font-mono font-semibold text-purple-600 dark:text-purple-400 tracking-wider">
                                                        {service.number}
                                                    </span>
                                                    <div className="h-px flex-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
                                                </div>

                                                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-widest mb-3">
                                                    {service.label}
                                                </div>

                                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                                    {service.headline}
                                                </h3>

                                                {service.microDescription && (
                                                    <p className="text-slate-600 dark:text-white/70 mb-6 leading-relaxed">
                                                        {service.microDescription}
                                                    </p>
                                                )}

                                                <ul className="space-y-3 mb-6">
                                                    {service.points.map((point, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 mt-2 shrink-0" />
                                                            <span className="text-slate-700 dark:text-white/80 leading-relaxed">
                                                                {point}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {service.detail && (
                                                    <button
                                                        onClick={() => setSelectedService(service)}
                                                        className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-white/5 border-2 border-purple-500 text-purple-600 dark:text-purple-400 font-semibold rounded-full hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 dark:hover:text-white transition-all hover:-translate-y-0.5"
                                                    >
                                                        Voir le détail
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Widget */}
                                            <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                                                <div className="group relative h-[500px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/20 hover:shadow-2xl">
                                                    {/* Hover gradient overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/5 group-hover:to-violet-500/5 transition-all duration-300 pointer-events-none z-10" />

                                                    {WidgetComponent ? (
                                                        <WidgetComponent />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                                                            <div className="text-6xl opacity-20">{service.icon || service.number}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </RevealAnimation>
                                )
                            })}
                        </div>

                        {/* Section Divider: FOUNDATION → GROWTH */}
                        <RevealAnimation delay={0.3}>
                            <div className="my-20 flex items-center justify-center">
                                <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-full border border-purple-200 dark:border-purple-500/30">
                                    <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 tracking-widest">
                                        FOUNDATION → GROWTH
                                    </span>
                                </div>
                            </div>
                        </RevealAnimation>

                        {/* GROWTH Group (Services 4-6) */}
                        <div className="space-y-16">
                            {TALENT_SERVICES.services.slice(3, 6).map((service, index) => {
                                const actualIndex = index + 3
                                const isEven = actualIndex % 2 === 0
                                const WidgetComponent = service.widget ? widgetMap[service.widget as keyof typeof widgetMap] : null

                                return (
                                    <RevealAnimation key={service.id} delay={index * 0.1}>
                                        <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                                            {/* Text Content */}
                                            <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-sm font-mono font-semibold text-purple-600 dark:text-purple-400 tracking-wider">
                                                        {service.number}
                                                    </span>
                                                    <div className="h-px flex-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
                                                </div>

                                                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-widest mb-3">
                                                    {service.label}
                                                </div>

                                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                                    {service.headline}
                                                </h3>

                                                {service.microDescription && (
                                                    <p className="text-slate-600 dark:text-white/70 mb-6 leading-relaxed">
                                                        {service.microDescription}
                                                    </p>
                                                )}

                                                <ul className="space-y-3 mb-6">
                                                    {service.points.map((point, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 mt-2 shrink-0" />
                                                            <span className="text-slate-700 dark:text-white/80 leading-relaxed">
                                                                {point}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {service.detail && (
                                                    <button
                                                        onClick={() => setSelectedService(service)}
                                                        className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-white/5 border-2 border-purple-500 text-purple-600 dark:text-purple-400 font-semibold rounded-full hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 dark:hover:text-white transition-all hover:-translate-y-0.5"
                                                    >
                                                        Voir le détail
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Widget */}
                                            <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                                                <div className="group relative h-[500px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/20 hover:shadow-2xl">
                                                    {/* Hover gradient overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/5 group-hover:to-violet-500/5 transition-all duration-300 pointer-events-none z-10" />

                                                    {WidgetComponent ? (
                                                        <WidgetComponent />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                                                            <div className="text-6xl opacity-20">{service.icon || service.number}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </RevealAnimation>
                                )
                            })}
                        </div>

                        {/* Section Divider: GROWTH → SCALE */}
                        <RevealAnimation delay={0.3}>
                            <div className="my-20 flex items-center justify-center">
                                <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-full border border-purple-200 dark:border-purple-500/30">
                                    <span className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 tracking-widest">
                                        GROWTH → SCALE
                                    </span>
                                </div>
                            </div>
                        </RevealAnimation>

                        {/* SCALE Group (Services 7-9) */}
                        <div className="space-y-16">
                            {TALENT_SERVICES.services.slice(6, 9).map((service, index) => {
                                const actualIndex = index + 6
                                const isEven = actualIndex % 2 === 0
                                const WidgetComponent = service.widget ? widgetMap[service.widget as keyof typeof widgetMap] : null

                                return (
                                    <RevealAnimation key={service.id} delay={index * 0.1}>
                                        <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                                            {/* Text Content */}
                                            <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-sm font-mono font-semibold text-purple-600 dark:text-purple-400 tracking-wider">
                                                        {service.number}
                                                    </span>
                                                    <div className="h-px flex-1 bg-gradient-to-r from-indigo-500 to-purple-600" />
                                                </div>

                                                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-widest mb-3">
                                                    {service.label}
                                                </div>

                                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                                    {service.headline}
                                                </h3>

                                                {service.microDescription && (
                                                    <p className="text-slate-600 dark:text-white/70 mb-6 leading-relaxed">
                                                        {service.microDescription}
                                                    </p>
                                                )}

                                                <ul className="space-y-3 mb-6">
                                                    {service.points.map((point, i) => (
                                                        <li key={i} className="flex items-start gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 mt-2 shrink-0" />
                                                            <span className="text-slate-700 dark:text-white/80 leading-relaxed">
                                                                {point}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {service.detail && (
                                                    <button
                                                        onClick={() => setSelectedService(service)}
                                                        className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-white/5 border-2 border-purple-500 text-purple-600 dark:text-purple-400 font-semibold rounded-full hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 dark:hover:text-white transition-all hover:-translate-y-0.5"
                                                    >
                                                        Voir le détail
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Widget */}
                                            <div className={isEven ? "lg:order-2" : "lg:order-1"}>
                                                <div className="group relative h-[500px] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/20 hover:shadow-2xl">
                                                    {/* Hover gradient overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-violet-500/0 group-hover:from-purple-500/5 group-hover:to-violet-500/5 transition-all duration-300 pointer-events-none z-10" />

                                                    {WidgetComponent ? (
                                                        <WidgetComponent />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                                                            <div className="text-6xl opacity-20">{service.icon || service.number}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </RevealAnimation>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Container>

            {/* Service Detail Drawer */}
            <ServiceDetailDrawer
                service={selectedService}
                onClose={() => setSelectedService(null)}
            />
        </section>
    )
}
