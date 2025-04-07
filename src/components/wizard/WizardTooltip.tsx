interface TooltipProps {
  title: string;
  content: string;
  placement?: "top" | "right" | "bottom" | "left";
}

export default function WizardTooltip({ title, content, placement = "right" }: TooltipProps) {
  return (
    <div className="tooltip-wrapper relative inline-block ml-2 group">
      <div className="tooltip-icon cursor-pointer text-gray-400 hover:text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </div>

      <div className={`tooltip-content absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-200 z-10 w-64 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg ${
        placement === "top" ? "bottom-full left-1/2 transform -translate-x-1/2 mb-2" :
        placement === "bottom" ? "top-full left-1/2 transform -translate-x-1/2 mt-2" :
        placement === "left" ? "right-full top-1/2 transform -translate-y-1/2 mr-2" :
        "left-full top-1/2 transform -translate-y-1/2 ml-2"
      }`}>
        <h4 className="font-bold mb-1">{title}</h4>
        <p className="text-sm">{content}</p>
        <div className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
          placement === "top" ? "bottom-0 left-1/2 -translate-x-1/2 -mb-1" :
          placement === "bottom" ? "top-0 left-1/2 -translate-x-1/2 -mt-1" :
          placement === "left" ? "right-0 top-1/2 -translate-y-1/2 -mr-1" :
          "left-0 top-1/2 -translate-y-1/2 -ml-1"
        }`}></div>
      </div>
    </div>
  );
}
