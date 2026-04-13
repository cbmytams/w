"use client";

import { useState } from "react";

export default function SentryTestPage() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Sentry test error from /dev/sentry-test");
  }

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-6 py-16"
    >
      <h1 className="text-3xl font-bold text-slate-900">Sentry Test</h1>
      <p className="mt-4 text-slate-600">
        Cette page déclenche volontairement une erreur React pour valider la
        capture par les error boundaries Sentry.
      </p>
      <button
        type="button"
        onClick={() => setShouldThrow(true)}
        className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
      >
        Déclencher une erreur test
      </button>
    </main>
  );
}
