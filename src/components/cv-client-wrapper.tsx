"use client"
import dynamic from 'next/dynamic';

// Dynamically import CV component with SSR disabled to prevent hydration mismatches
// This resolves issues with:
// - Radix UI icons potentially generating unique IDs
// - CSS animations that may cause DOM differences
// - Browser extensions adding data attributes (e.g., data-redeviation-bs-uid)
const CvClientOnly = dynamic(() => import('@/app/cv/cv'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading CV...</p>
            </div>
        </div>
    ),
});

export default CvClientOnly;
