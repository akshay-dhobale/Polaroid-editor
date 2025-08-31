import React from 'react';

export const BWIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" fill="white" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22V2Z" fill="currentColor"/>
  </svg>
);