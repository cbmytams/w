"use client";

interface BlogErrorProps {
  error: Error;
  reset: () => void;
}

export default function BlogError({ error, reset }: BlogErrorProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        padding: "1.5rem",
      }}
    >
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <p style={{ color: "rgba(255,210,100,0.9)", fontSize: "0.75rem", letterSpacing: ".12em" }}>
          WAFIA KNOWLEDGE
        </p>
        <h2 style={{ fontSize: "1.5rem", marginTop: "0.6rem" }}>Une erreur est survenue</h2>
        <p style={{ color: "rgba(255,245,220,0.65)", marginTop: "0.6rem" }}>{error.message}</p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1rem",
            border: "1px solid rgba(255,235,180,0.18)",
            background: "rgba(255,248,230,0.05)",
            color: "rgba(255,255,255,0.92)",
            borderRadius: 999,
            padding: "0.55rem 1rem",
          }}
        >
          Reessayer
        </button>
      </div>
    </div>
  );
}
