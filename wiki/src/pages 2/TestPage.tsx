import { useState, useEffect } from 'react';
import { getAllArticles } from '../lib/blog';

export default function TestPage() {
    const [arts, setArts] = useState<any[]>([]);
    useEffect(() => {
        try {
            setArts(getAllArticles());
        } catch (e) {
            console.error(e);
        }
    }, []);
    return (
        <div style={{ padding: 40 }}>
            <h1>Debug Articles - Total: {arts.length}</h1>
            <pre>{JSON.stringify(arts.map(a => ({ slug: a.slug, theme: a.theme, t: typeof a.theme })), null, 2)}</pre>
        </div>
    );
}
