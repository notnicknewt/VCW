export default function CaptionsStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="captions-step">
      <h2>Captions Step</h2>
      <p>This step is under construction. For now, just click next to proceed.</p>
      <div className="navigation-buttons">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
}
