import { useState, useEffect } from "react";
import { getAllArticles, type Article } from "../lib/blog";

export default function TestPage() {
  const [arts, setArts] = useState<Article[]>([]);
  useEffect(() => {
    try {
      setArts(getAllArticles());
    } catch (error) {
      void error;
    }
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
