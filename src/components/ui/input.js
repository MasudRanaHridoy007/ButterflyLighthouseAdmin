import React from "react";

export const Input = ({ id, value, onChange, placeholder, type = "text", className = "" }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${className}`}
    />
  );
};
