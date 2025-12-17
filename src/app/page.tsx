import H1 from "@/components/h1";
import RippleEffect from "@/components/ripple-effect";


export default function Home() {
    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <main className={"grid grid-cols-1 justify-items-center gap-8 py-8 px-4"}>
                <H1/>
                <RippleEffect />
                
                <section className="max-w-4xl w-full space-y-8">
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome to My Portfolio
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            Full Stack Developer specializing in JavaScript, React, Next.js, and Node.js
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold mb-3">About Me</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Currently in professional transition, seeking a Bac+4 alternance in JavaScript development.
                                My goal is to evolve towards a Full-Stack Java and Angular developer role (Bac+5).
                            </p>
                        </div>
                        
                        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">React</span>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">Next.js</span>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">TypeScript</span>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">Node.js</span>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">Tailwind CSS</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center mt-8">
                        <p className="text-gray-600 dark:text-gray-400">
                            Check out my <a href="/cv" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">CV</a> to learn more about my experience and education.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
