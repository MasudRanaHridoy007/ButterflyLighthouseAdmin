import React, { useState } from 'react';

export const TooltipProvider = ({ children }) => {
  return <div className="tooltip-container">{children}</div>;
};

export const Tooltip = ({ children }) => {
  return <div className="tooltip">{children}</div>;
};

export const TooltipTrigger = ({ children, asChild = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="tooltip-trigger"
    >
      {children}
      {isHovered && <TooltipContent />}
    </div>
  );
};

export const TooltipContent = () => {
  return (
    <div className="tooltip-content bg-gray-700 text-white text-sm rounded-md p-2 absolute z-10">
      Tooltip message goes here
    </div>
  );
};
