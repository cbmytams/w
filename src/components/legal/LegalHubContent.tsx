import Link from "next/link"
import { Shield, FileText, Cookie, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LegalHubContentProps {
    context?: "talents" | "brands"
}

export function LegalHubContent({ context = "talents" }: LegalHubContentProps) {
    const isBrand = context === "brands"
    const query = isBrand ? "?context=brands" : ""

    // Color classes
    const hoverBorderColor = isBrand ? "hover:border-orange-500/50" : "hover:border-violet-500/50"
    const hoverBgColor = isBrand ? "hover:bg-orange-500/5" : "hover:bg-violet-500/5"
    const hoverShadowColor = isBrand ? "hover:shadow-orange-500/10" : "hover:shadow-violet-500/10"
    const iconHoverBg = isBrand ? "group-hover:bg-orange-500" : "group-hover:bg-violet-500"
    const textHoverColor = isBrand ? "group-hover:text-orange-500" : "group-hover:text-violet-500"

    return (
        <div className="space-y-6">
            <p className="text-slate-600 dark:text-slate-400">
                La transparence est la base de notre relation. Retrouvez ci-dessous l&apos;ensemble de nos documents légaux et de nos engagements en matière de confidentialité.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                    href={`/legal/mentions${query}`}
                    className={cn(
                        "group flex flex-col items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:shadow-lg transition-all duration-300",
                        hoverBorderColor,
                        hoverBgColor,
                        hoverShadowColor
                    )}
                >
                    <div className={cn(
                        "w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center group-hover:text-white transition-colors duration-300",
                        iconHoverBg
                    )}>
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="block font-semibold text-slate-900 dark:text-white mb-1">Mentions Légales</span>
                        <span className={cn("text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 transition-colors", textHoverColor)}>
                            Consulter <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>
                </Link>

                <Link
                    href={`/legal/privacy${query}`}
                    className={cn(
                        "group flex flex-col items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:shadow-lg transition-all duration-300",
                        hoverBorderColor,
                        hoverBgColor,
                        hoverShadowColor
                    )}
                >
                    <div className={cn(
                        "w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center group-hover:text-white transition-colors duration-300",
                        iconHoverBg
                    )}>
                        <Shield className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="block font-semibold text-slate-900 dark:text-white mb-1">Confidentialité</span>
                        <span className={cn("text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 transition-colors", textHoverColor)}>
                            Lire la politique <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>
                </Link>

                <Link
                    href={`/legal/cookies${query}`}
                    className={cn(
                        "group flex flex-col items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:shadow-lg transition-all duration-300",
                        hoverBorderColor,
                        hoverBgColor,
                        hoverShadowColor
                    )}
                >
                    <div className={cn(
                        "w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center group-hover:text-white transition-colors duration-300",
                        iconHoverBg
                    )}>
                        <Cookie className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="block font-semibold text-slate-900 dark:text-white mb-1">Cookies</span>
                        <span className={cn("text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 transition-colors", textHoverColor)}>
                            Gestion <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
