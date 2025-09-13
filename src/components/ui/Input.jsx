import React from 'react';

const Input = ({ 
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  disabled = false,
  required = false,
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-gray-400';
  
  const classes = `${baseClasses} ${className}`;
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={classes}
      disabled={disabled}
      required={required}
      dir="rtl"
      {...props}
    />
  );
};

export default Input;