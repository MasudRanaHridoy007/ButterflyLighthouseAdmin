import React from 'react';

export const Label = ({ children, ...props }) => {
  return <label className="label" {...props}>{children}</label>;
};
