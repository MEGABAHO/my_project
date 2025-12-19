"use client"
import React from 'react';

interface CVPrintButtonProps {
    contentRef: React.RefObject<HTMLDivElement>;
}

export default function CVPrintButton({ contentRef }: CVPrintButtonProps) {
    const handlePrint = () => {
        // Direct window.print() approach - React 19 compatible
        if (typeof window !== 'undefined') {
            window.print();
        }
    };

    return (
        <button 
            className="contact-button" 
            onClick={handlePrint}
        >
            <span className="contact-button-text">Print</span>
        </button>
    );
}
