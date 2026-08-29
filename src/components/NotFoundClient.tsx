"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASING } from "@/lib/easing";
import { ArrowRight, Home } from "lucide-react";

export default function NotFoundClient() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-orange-500/30">
      {/* Background ambient noise/grid */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

        {/* Animated glowing orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: EASING.easeInOut,
          }}
          className="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-orange-500/20 to-rose-500/20 blur-[120px]"
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-4 text-center">
        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASING.premium }}
          className="relative flex items-center justify-center"
        >
          <h1 className="text-[120px] sm:text-[200px] md:text-[250px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/5 select-none drop-shadow-2xl">
            404
          </h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASING.premium }}
            className="absolute whitespace-nowrap bg-black/60 px-6 py-2.5 backdrop-blur-md rounded-full border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-white/90 shadow-2xl"
          >
            Page introuvable
          </motion.div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASING.premium }}
          className="mt-8 max-w-md text-base sm:text-lg text-white/50"
        >
          L'URL que vous recherchez semble incorrecte ou la page a été déplacée.
          Reprenons une connexion plus stable.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASING.premium }}
          className="mt-12 flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4"
        >
          <Link
            href="/"
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
          >
            <Home className="h-4 w-4" />
            Retour à l'accueil
          </Link>

          <Link
            href="/contact/brands"
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-white/5 px-8 py-4 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-all hover:bg-white/10 hover:ring-white/20 active:scale-95"
          >
            Contacter l'agence
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
