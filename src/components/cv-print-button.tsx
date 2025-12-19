"use client"
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

interface CVPrintButtonProps {
    contentRef: React.RefObject<HTMLDivElement>;
}

export default function CVPrintButton({ contentRef }: CVPrintButtonProps) {
    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
        documentTitle: 'Ivan_Topychkanov_CV',
        pageStyle: `
            @page {
                size: A4;
                margin: 0;
            }
            @media print {
                html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                body {
                    print-color-adjust: exact;
                    -webkit-print-color-adjust: exact;
                }
            }
        `,
    });

    return (
        <button 
            className="contact-button" 
            onClick={handlePrint}
        >
            <span className="contact-button-text">Print</span>
        </button>
    );
}
