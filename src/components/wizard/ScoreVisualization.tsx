interface ScoreVisualizationProps {
  score: number;
}

export default function ScoreVisualization({ score }: ScoreVisualizationProps) {
  // Determine color based on score
  const getColor = () => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <div className="score-visualization flex items-center mb-4">
      <div className="score-circle relative w-20 h-20 rounded-full border-4 border-gray-200 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full" style={{
          background: `conic-gradient(${getColor()} ${score * 10}%, transparent 0)`,
          clipPath: "circle(50% at center)"
        }}></div>
        <div className="score-inner bg-white rounded-full w-16 h-16 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs text-gray-500">/ 10</div>
          </div>
        </div>
      </div>
      
      <div className="score-label ml-4">
        <div className="font-medium">Viral Potential</div>
        <div className="text-sm text-gray-600">
          {score >= 8 ? "Excellent" : score >= 6 ? "Good" : "Needs Improvement"}
        </div>
      </div>
    </div>
  );
}