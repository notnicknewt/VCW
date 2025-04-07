interface TooltipProps {
  title: string;
  content: string;
  placement?: "top" | "right" | "bottom" | "left";
}

export default function WizardTooltip({ title, content, placement = "right" }: TooltipProps) {
  return (
    <div className="tooltip-wrapper">
      <div className="tooltip-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </div>
      
      <div className={`tooltip-content tooltip-${placement}`}>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{content}</p>
      </div>
    </div>
  );
}