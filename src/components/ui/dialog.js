import React from 'react';

export const Dialog = ({ children }) => (
  <div className="dialog">
    {children}
  </div>
);

export const DialogTrigger = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export const DialogContent = ({ children }) => (
  <div className="dialog-content">{children}</div>
);

export const DialogHeader = ({ children }) => (
  <div className="dialog-header">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2 className="dialog-title">{children}</h2>
);
