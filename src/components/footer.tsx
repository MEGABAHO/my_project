

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className={"footer-media grid grid-cols-1 justify-items-center w-full border-t border-white/20 mt-auto py-6"}>
            <div className="text-center space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    © {currentYear} Ivan Topychkanov. All rights reserved.
                </p>
                <div className="flex gap-4 justify-center text-sm">
                    <a 
                        href="mailto:topychkanov@hotmail.fr" 
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Contact
                    </a>
                    <a 
                        href="https://www.linkedin.com/in/ivan-topychkanov/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        LinkedIn
                    </a>
                    <a 
                        href="/cv" 
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        CV
                    </a>
                </div>
            </div>
        </footer>
    )
}
