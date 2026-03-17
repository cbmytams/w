export function MissingFieldsBadge({ count }: { count: number }) {
    if (count === 0) return null;
    return (
        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20 rounded">
            {count} manquant{count > 1 ? 's' : ''}
        </span>
    );
}
