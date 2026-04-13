import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import type { AdminSessionUser } from "../types";

interface AdminLoginPanelProps {
  onSuccess: (user: AdminSessionUser) => void;
}

export function AdminLoginPanel({ onSuccess }: AdminLoginPanelProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/v1/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        user?: AdminSessionUser;
        error?: string;
      };

      if (!response.ok || !payload.user) {
        setError(payload.error || "Identifiants invalides.");
        return;
      }

      onSuccess(payload.user);
    } catch {
      setError("Impossible de joindre le serveur d'authentification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      data-testid="admin-login"
      className="h-full min-h-0 flex items-center justify-center px-6 py-12"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--heat-start)] to-[var(--heat-end)] flex items-center justify-center shadow-[0_0_20px_var(--heat-start)]/40">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Admin Access
          </h1>
          <p className="text-sm text-zinc-400">
            Entrez vos identifiants pour accéder au dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                data-testid="admin-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="admin"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--heat-start)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                data-testid="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="admin"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--heat-start)]"
              />
            </div>
          </div>
        </div>

        {error && (
          <div
            data-testid="admin-login-error"
            className="mt-4 text-xs text-red-400"
          >
            {error}
          </div>
        )}

        <button
          data-testid="admin-login-submit"
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full py-3 rounded-xl font-bold uppercase tracking-widest text-sm text-black bg-white hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Connexion..." : "Connexion"}
        </button>

        <div className="mt-6 text-center text-[11px] text-zinc-500">
          Authentification sécurisée via session serveur.
        </div>
      </motion.form>
    </div>
  );
}
