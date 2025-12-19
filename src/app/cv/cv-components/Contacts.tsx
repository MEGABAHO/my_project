import {EnvelopeOpenIcon, LinkedInLogoIcon, MobileIcon, DownloadIcon, CopyIcon} from '@radix-ui/react-icons';
import CVPrintButton from "@/components/cv-print-button";

interface ContactsProps {
    printRef: React.RefObject<HTMLDivElement>;
}

export default function Contacts({ printRef }: ContactsProps) {
    const handleDownloadPDF = async () => {
        try {
            const response = await fetch('/api/cv/pdf');
            if (!response.ok) throw new Error('Failed to generate PDF');
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Ivan_Topychkanov_CV.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Failed to download PDF. Please try again.');
        }
    };

    return (
        <fieldset className="contacts-border">
            <legend className="contacts-legend">Contacts</legend>
            <address className="contacts">
                <div className="contact-item">
                    <div className="contact-icon-wrapper">
                        <EnvelopeOpenIcon className="contact-icon"/>
                    </div>
                    <div className="contact-content">
                        <span className="contact-label">Email</span>
                        <a
                            className="contact-link"
                            href="mailto:topychkanov@hotmail.fr"
                        >topychkanov@hotmail.fr</a>
                    </div>
                </div>
                
                <div className="contact-item LinkedIn">
                    <div className="contact-icon-wrapper">
                        <LinkedInLogoIcon className="contact-icon"/>
                    </div>
                    <div className="contact-content">
                        <span className="contact-label">LinkedIn</span>
                        <a 
                            className="contact-link"
                            href="https://www.linkedin.com/in/ivan-topychkanov/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >ivan-topychkanov</a>
                    </div>
                </div>
                
                <div className="contact-item">
                    <div className="contact-icon-wrapper">
                        <MobileIcon className="contact-icon"/>
                    </div>
                    <div className="contact-content">
                        <span className="contact-label">Phone</span>
                        <a className="contact-link" href="tel:+33638687255">
                            +33 6 38 68 72 55
                        </a>
                    </div>
                </div>
                
                <div className="contact-item Download contact-action">
                    <div className="contact-icon-wrapper">
                        <DownloadIcon className="contact-icon"/>
                    </div>
                    <button 
                        className="contact-button" 
                        onClick={handleDownloadPDF}
                    >
                        <span className="contact-button-text">Download CV</span>
                        <span className="contact-button-subtext">Save as PDF</span>
                    </button>
                </div>
                
                <div className="contact-item Print contact-action">
                    <div className="contact-icon-wrapper">
                        <CopyIcon className="contact-icon"/>
                    </div>
                    <div className="contact-print-wrapper">
                        <CVPrintButton contentRef={printRef} />
                    </div>
                </div>
            </address>
        </fieldset>
    );
}
