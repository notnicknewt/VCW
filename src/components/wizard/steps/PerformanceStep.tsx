export default function PerformanceStep({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="performance-step">
      <h2>Performance Step</h2>
      <p>This step is coming soon. For now, go back or finish your wizard.</p>
      <div className="navigation-buttons">
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
