"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
    <div className="app-shell flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="surface-card p-10 w-full max-w-md">
        <div className="text-xs uppercase tracking-[0.3em] text-soft">Connexion</div>
        <h1 className="text-2xl font-semibold mt-3">WAFIA BDD Talents</h1>
        <p className="text-sm text-muted mt-2">Accès réservé aux équipes Wafia.</p>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-soft">Username</span>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full surface-strong px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40"
              required
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-soft">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full surface-strong px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40"
              required
            />
          </label>

          {error ? <p className="text-xs text-red-500">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-black text-white dark:bg-white dark:text-black py-3 text-sm font-semibold disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </form>
    </div>
  );
}
