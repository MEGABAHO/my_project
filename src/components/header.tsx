"use client"
import Navigation from "@/components/navigation";
import LoginForm from "@/components/login-form";
import {useEffect, useRef, useState} from "react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const formRef = useRef<HTMLDivElement | null>(null);
    const [formHeight, setFormHeight] = useState(0);
    const { data: session, status } = useSession();

    const handleLoginSuccess = () => {
        // Session will be updated automatically by NextAuth
    };

    const handleLogout = async () => {
        await signOut({ redirect: false });
    };

    useEffect(() => {
        // Calculate the full height of the element including margins
        if (formRef.current) {
            const style = window.getComputedStyle(formRef.current);
            const marginTop = parseFloat(style.marginTop) || 0;
            const marginBottom = parseFloat(style.marginBottom) || 0;
            const totalHeight = formRef.current.offsetHeight + marginTop + marginBottom;
            setFormHeight(totalHeight);
        }

        const handleScroll = () => {
            // Check scroll relative to the height of LoginForm
            setIsScrolled(window.scrollY > formHeight);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [formHeight]);

    const user = session?.user as any;
    const isLoading = status === "loading";

    return (
        <header
            className={`${isScrolled ? "fixed-header" : ""} header-media grid grid-cols justify-items-center w-full border-b border-white/20`}>
            {!isScrolled && !user && !isLoading && (
                <LoginForm ref={formRef} onLoginSuccess={handleLoginSuccess} />
            )}
            {!isScrolled && user && (
                <div ref={formRef} className="flex flex-row gap-4 items-center justify-center pt-2 pb-2">
                    <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Hello, {user.firstName}!
                    </span>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Log out
                    </button>
                </div>
            )}
            <Navigation/>
            <style jsx>{`
                .header-media {
                    width: 100%;
                    transition: all 0.3s ease;
                }

                .fixed-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                }
            `}</style>
        </header>
    )
    }
