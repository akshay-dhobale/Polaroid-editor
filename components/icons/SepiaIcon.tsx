import React from 'react';

export const SepiaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="10" cy="10" r="6" fill="currentColor" opacity="0.4"/>
        <circle cx="14" cy="10" r="6" fill="currentColor" opacity="0.4"/>
        <circle cx="12" cy="14" r="6" fill="currentColor" opacity="0.4"/>
    </svg>
);