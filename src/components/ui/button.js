import React from 'react';
export const Button = ({ children, ...props }) => {
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  );
};
