import { useState, useEffect } from "react";
import { getAllArticles, type Article } from "../lib/blog";

export default function TestPage() {
  const [arts, setArts] = useState<Article[]>([]);
  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      try {
        const all = await getAllArticles();
        if (isCancelled) return;
        setArts(all);
      } catch (error) {
        void error;
      }
    };

    void load();

    return () => {
      isCancelled = true;
    };
  }, []);
  return (
    <div style={{ padding: 40 }}>
      <h1>Debug Articles - Total: {arts.length}</h1>
      <pre>
        {JSON.stringify(
          arts.map((a) => ({
            slug: a.slug,
            theme: a.theme,
            t: typeof a.theme,
          })),
          null,
          2
        )}
      </pre>
    </div>
  );
}
