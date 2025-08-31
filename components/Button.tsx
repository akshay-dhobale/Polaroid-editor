import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center px-8 py-3 border border-transparent 
        text-lg font-bold rounded-full shadow-lg text-white bg-orange-500 
        hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-orange-400 disabled:bg-gray-400 disabled:cursor-not-allowed
        transition-all duration-300 ease-in-out transform hover:scale-105
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;