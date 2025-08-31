import React from 'react';

export const ClassicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8 17.5L11 13L13.5 15.5L16.5 11.5L20 17.5H4L8 17.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
    </svg>
);