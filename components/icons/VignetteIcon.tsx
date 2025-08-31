import React from 'react';

export const VignetteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <radialGradient id="vignette" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="60%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
            </radialGradient>
        </defs>
        <rect width="20" height="20" x="2" y="2" rx="4" stroke="currentColor" strokeWidth="2" />
        <rect width="20" height="20" x="2" y="2" rx="4" fill="url(#vignette)" />
    </svg>
);