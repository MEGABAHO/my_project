import {EnvelopeOpenIcon, LinkedInLogoIcon, BellIcon, DownloadIcon, CopyIcon} from '@radix-ui/react-icons';
import LinkPrint from "@/components/link-print";

export default function Contacts() {
    return (
        <fieldset className="contacts-border">
            <legend>Contacts</legend>
            <address className="contacts">
                <div className={"flex  items-center gap-2"}>
                    <EnvelopeOpenIcon/>
                    <a
                        className="link-contacts email"
                        href="mailto:topychkanov@hotmail.fr"
                    >Topychkanov@hotmail.fr</a>
                </div>
                <div className={"LinkedIn flex  items-center gap-2"}>
                    <LinkedInLogoIcon/>
                    <a className={"link-contacts text-xl"}
                       href="https://www.linkedin.com/in/ivan-topychkanov/"
                       target="_blank"
                    >LinkedIn</a>
                </div>
                <div className="flex bg-zinc-200 rounded-3xl items-center gap-2">
                    <BellIcon/>
                    <a className="link-contacts" href="tel:+33638687255"
                    >(+33) 06 38 68 72 55</a>
                </div>
                <div className="Download flex  items-center gap-2">
                    <DownloadIcon/>
                    <button 
                        className="link-contacts text-xl cursor-pointer" 
                        onClick={() => window.print()}
                    >Download CV (Print to PDF)</button>
                </div>
                <div className="Print flex  items-center gap-2">
                    <CopyIcon/>
                    <LinkPrint/>
                </div>
            </address>
        </fieldset>
    );
}
