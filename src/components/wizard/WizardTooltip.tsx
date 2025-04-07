"use client";

import { useState } from "react";

interface TooltipProps {
  title: string;
  content: string;
  placement?: "top" | "right" | "bottom" | "left";
}

export default function WizardTooltip({ title, content, placement = "right" }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="tooltip-wrapper relative inline-block ml-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="tooltip-icon text-gray-400 cursor-help">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </div>
      
      <div 
        className={`
          tooltip-content absolute z-10 w-64 bg-white border rounded-md shadow-lg p-3 transition-opacity
          ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}
          ${placement === "top" ? "bottom-full left-1/2 transform -translate-x-1/2 mb-2" :
            placement === "bottom" ? "top-full left-1/2 transform -translate-x-1/2 mt-2" :
            placement === "left" ? "right-full top-1/2 transform -translate-y-1/2 mr-2" :
            "left-full top-1/2 transform -translate-y-1/2 ml-2"}
        `}
      >
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{content}</p>
      </div>
    </div>
  );
}