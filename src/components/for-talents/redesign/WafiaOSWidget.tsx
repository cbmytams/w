"use client"

import { motion } from "framer-motion"
import {
    LayoutGrid,
    Briefcase,
    BarChart3,
    Wallet,
    Bell,
    TrendingUp,
    Calendar,
    Users,
    CheckCircle2,
    Clock,
    Zap,
    Settings,
    LogOut
} from "lucide-react"

// ============================================
// DONNÉES DU DASHBOARD WAFIA OS
// ============================================
const WAFIA_OS_DATA = {
    user: {
        initials: "JD",
        name: "Jordan",
    },
    revenue: {
        amount: "12 450",
        currency: "€",
        trend: "+12%",
        label: "REVENUS (CE MOIS)"
    },
    deals: [
        {
            name: "Nike Sportswear",
            type: "Campagne Automne",
            logo: "/logos/talents/nike.svg",
            active: true
        },
        {
            name: "Spotify",
            type: "Podcast Partner",
            logo: "/logos/talents/spotify.svg",
            active: true
        }
    ],
    audience: {
        total: "1.2M",
        label: "Reach global",
        trend: "+5% this week"
    },
    nextEvent: {
        label: "PROCHAIN SHOOT",
        title: "Campagne Été - Paris",
        location: "Studio 4 • Le Marais",
        day: "14",
        month: "OCT"
    },
    // ÉLÉMENTS INTELLIGENTS AJOUTÉS
    pendingTasks: {
        count: 3,
        items: [
            { text: "Brief Nike à valider", urgent: true },
            { text: "Contrat Spotify à signer", urgent: false }
        ]
    },
    notifications: {
        count: 5,
        hasNew: true
    },
    quickStats: {
        engagement: "8.4%",
        avgDealValue: "€6.2K"
    }
} as const

// ============================================
// COMPOSANTS INTERNES
// ============================================

// Sidebar compacte avec navigation
function SidebarMini() {
    const navItems = [
        { icon: LayoutGrid, label: "Vue d'ensemble", active: true },
        { icon: Briefcase, label: "Mes Deals", active: false },
        { icon: BarChart3, label: "Statistiques", active: false },
        { icon: Wallet, label: "Finances", active: false },
    ]

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-[140px] bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-1"
        >
            {/* Logo + Title */}
            <div className="flex items-center gap-2 px-2 py-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center shadow-md">
                    <span className="text-white text-[10px] font-bold">W</span>
                </div>
                {/* REPLACED SKELETON WITH TEXT */}
                <span className="text-xs font-bold text-gray-900 tracking-tight">Wafia OS</span>
            </div>

            {/* Nav Items */}
            {navItems.map((item, i) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className={`flex items-center gap-2 px-2 py-2 rounded-lg text-[10px] font-medium cursor-pointer transition-all ${item.active
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                >
                    <item.icon size={13} strokeWidth={2} />
                    <span className="truncate">{item.label}</span>
                </motion.div>
            ))}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Quick Stats Mini / Settings */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-2 pt-2 border-t border-gray-100"
            >
                <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
                    <Settings size={13} />
                    <span className="text-[10px] font-medium">Paramètres</span>
                </div>
            </motion.div>
        </motion.div>
    )
}

// Card de revenus principale
function RevenueCard() {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden group hover:border-green-200 transition-colors"
        >
            {/* Label */}
            <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    {WAFIA_OS_DATA.revenue.label}
                </span>
            </div>

            {/* Amount + Trend */}
            <div className="flex items-end justify-between">
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <span className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight block">
                        {WAFIA_OS_DATA.revenue.amount} <span className="text-lg text-gray-400 font-medium">{WAFIA_OS_DATA.revenue.currency}</span>
                    </span>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="flex items-center gap-1 px-1.5 py-0.5 bg-green-50 rounded-md border border-green-100"
                >
                    <TrendingUp size={10} className="text-green-600" />
                    <span className="text-[10px] font-bold text-green-700">
                        {WAFIA_OS_DATA.revenue.trend}
                    </span>
                </motion.div>
            </div>
        </motion.div>
    )
}

// Widget Deals Actifs (mode sombre)
function DealsCard() {
    return (
        <motion.div
            initial={{ x: 20, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-900 rounded-2xl p-4 shadow-xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-xs font-semibold text-white tracking-wide">Deals Actifs</span>
                <Briefcase size={12} className="text-gray-500" />
            </div>

            {/* Deals List */}
            <div className="space-y-3 relative z-10">
                {WAFIA_OS_DATA.deals.map((deal, i) => (
                    <motion.div
                        key={deal.name}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gray-800/80 border border-gray-700 flex items-center justify-center p-1.5 overflow-hidden">
                            <img
                                src={deal.logo}
                                alt={deal.name}
                                className="w-full h-full object-contain brightness-0 invert"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-semibold text-gray-100 truncate">
                                    {deal.name}
                                </span>
                                {deal.active && (
                                    <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] flex-shrink-0" />
                                )}
                            </div>
                            <span className="text-[9px] text-gray-500 uppercase tracking-wider">
                                {deal.type}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

// Widget Audience
function AudienceCard() {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group hover:border-pink-100 transition-colors"
        >
            <div className="flex items-center gap-3">
                {/* CHANGED COLOR TO PINK (Originally Purple) */}
                <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
                    <Users size={16} />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Audience</span>
                        <span className="text-[9px] text-gray-300 uppercase">Total</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-2xl font-bold text-gray-900"
                        >
                            {WAFIA_OS_DATA.audience.total}
                        </motion.span>
                    </div>
                </div>
            </div>
            <div className="mt-2 text-[9px] text-gray-400 font-medium">
                {WAFIA_OS_DATA.audience.label} <span className="text-green-600 ml-1">{WAFIA_OS_DATA.audience.trend}</span>
            </div>
        </motion.div>
    )
}

// Version large pour le bas du dashboard
function UpcomingEventCardLarge() {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between gap-6 min-h-[100px]"
        >
            <div className="flex items-center gap-4 min-w-0">
                {/* CHANGED TO NEUTRAL/DARK THEME for 'PRO' feel */}
                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Calendar size={20} className="text-white" />
                </div>
                <div className="min-w-0">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">
                        {WAFIA_OS_DATA.nextEvent.label}
                    </span>
                    <div className="text-lg font-bold text-gray-900 leading-tight truncate">
                        {WAFIA_OS_DATA.nextEvent.title}
                    </div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">
                        {WAFIA_OS_DATA.nextEvent.location}
                    </div>
                </div>
            </div>

            {/* REMOVED REDUNDANT TEXT DATE, KEPT CALENDAR BLOCK */}
            <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-gray-900 leading-none">{WAFIA_OS_DATA.nextEvent.day}</div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">{WAFIA_OS_DATA.nextEvent.month}</div>
                </div>
            </div>
        </motion.div>
    )
}

// Widget Tâches Urgentes (AJOUT INTELLIGENT)
function PendingTasksCard() {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-4 border border-orange-100/50"
        >
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-white rounded-md shadow-sm">
                    <Zap size={10} className="text-amber-500" fill="currentColor" />
                </div>
                <span className="text-[9px] font-bold text-amber-700 uppercase tracking-widest">
                    Actions en attente
                </span>
                <span className="ml-auto text-[9px] font-bold text-amber-600 bg-white/60 px-1.5 py-0.5 rounded-full border border-amber-100">
                    {WAFIA_OS_DATA.pendingTasks.count}
                </span>
            </div>
            <div className="space-y-2">
                {WAFIA_OS_DATA.pendingTasks.items.map((task, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-center gap-2.5 text-[11px]"
                    >
                        {task.urgent ? (
                            <Clock size={12} className="text-amber-600 flex-shrink-0" />
                        ) : (
                            <CheckCircle2 size={12} className="text-amber-400 flex-shrink-0" />
                        )}
                        <span className={`truncate ${task.urgent ? "text-gray-800 font-semibold" : "text-gray-600 font-medium"}`}>
                            {task.text}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

// ============================================
// COMPOSANT PRINCIPAL WAFIA OS WIDGET
// ============================================
export function WafiaOSWidget() {
    return (
        <div className="w-full h-full bg-gray-50/50 rounded-2xl p-3 overflow-hidden relative font-sans">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            <div className="relative z-10 flex gap-3 h-full">
                {/* Left: Sidebar */}
                <SidebarMini />

                {/* Right: Main Content */}
                <div className="flex-1 flex flex-col gap-3 min-w-0">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center justify-between pl-1"
                    >
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Tableau de bord</h3>
                            <p className="text-[10px] text-gray-500 font-medium">Mise à jour: Aujourd'hui, 09:41</p>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Notification Bell */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center cursor-pointer shadow-sm text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                <Bell size={14} />
                                {WAFIA_OS_DATA.notifications.hasNew && (
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"
                                    />
                                )}
                            </motion.div>
                            {/* Avatar */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center cursor-pointer text-white shadow-md border border-gray-700"
                            >
                                <span className="text-[10px] font-bold">
                                    {WAFIA_OS_DATA.user.initials}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Grid Content */}
                    <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
                        {/* Left Column */}
                        <div className="flex flex-col gap-3">
                            <RevenueCard />
                            <AudienceCard />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-3">
                            <DealsCard />
                            <PendingTasksCard />
                        </div>

                        {/* Bottom full width */}
                        <div className="col-span-2">
                            <UpcomingEventCardLarge />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
