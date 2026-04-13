export function CompletionBar({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 w-full bg-questionnaire-muted overflow-hidden rounded-full">
      <div
        className="h-full bg-gradient-to-r from-questionnaire-primary to-questionnaire-secondary transition-all duration-500 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
