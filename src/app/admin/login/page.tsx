"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft } from "lucide-react";
import { WafiaLogo } from "@/components/ui/WafiaLogo";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: username.trim(),
        password,
      });

      if (result?.error) {
        setError("Identifiants incorrects.");
        return;
      }

      router.replace("/admin/talents/dashboard");
      router.refresh();
    } catch {
      setError("Serveur indisponible. Réessayez dans un instant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black text-white">
      {/* Premium Apple / VisionOS Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] mix-blend-overlay" />
      </div>
      {/* Back button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm font-medium backdrop-blur-xl cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>

      <form onSubmit={handleSubmit} className="relative z-10 admin-glass-panel p-10 sm:p-12 w-full max-w-md mx-4 overflow-hidden group">

        {/* Subtle inner highlight */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none mix-blend-overlay" />

        <div className="relative z-20">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500">
              <WafiaLogo className="w-full h-full text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-sm font-medium text-white/40 uppercase tracking-widest">Workspace Personnel</p>
          </div>

          <div className="space-y-4">
            <label className="block group/label">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 ml-1 mb-2 block group-focus-within/label:text-white/70 transition-colors">Username</span>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full bg-black/20 hover:bg-black/40 border border-white/10 focus:border-white/30 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 shadow-inner"
                placeholder="Votre identifiant"
                required
              />
            </label>

            <label className="block group/label">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40 ml-1 mb-2 block group-focus-within/label:text-white/70 transition-colors">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-black/20 hover:bg-black/40 border border-white/10 focus:border-white/30 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 shadow-inner"
                placeholder="••••••••"
                required
              />
            </label>

            {error ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-xs font-medium text-red-400 text-center">{error}</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden rounded-2xl bg-white text-black py-4 mt-2 text-sm font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:active:scale-100 group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <span className="relative z-10">{loading ? "Authentification..." : "Se connecter"}</span>
            </button>
          </div>
        </div>
        {/* Footer link */}
        <p className="text-center text-[10px] text-white/15 mt-6">
          Espace réservé aux équipes Wafia
        </p>
      </form>
    </main>
  );
}
