import {EnvelopeOpenIcon, LinkedInLogoIcon, MobileIcon, DownloadIcon, CopyIcon} from '@radix-ui/react-icons';
import LinkPrint from "@/components/link-print";

export default function Contacts() {
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
                        onClick={() => window.print()}
                    >
                        <span className="contact-button-text">Download CV</span>
                        <span className="contact-button-subtext">Print to PDF</span>
                    </button>
                </div>
                
                <div className="contact-item Print contact-action">
                    <div className="contact-icon-wrapper">
                        <CopyIcon className="contact-icon"/>
                    </div>
                    <div className="contact-print-wrapper">
                        <LinkPrint/>
                    </div>
                </div>
            </address>
        </fieldset>
    );
}
