"use client"
import Navigation from "@/components/navigation";
import LoginForm from "@/components/login-form";
import {useEffect, useRef, useState} from "react";
import { useSession } from "next-auth/react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const formRef = useRef<HTMLDivElement | null>(null);
    const [formHeight, setFormHeight] = useState(0);
    const { data: session, status } = useSession();
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showGreeting, setShowGreeting] = useState(false);

    const handleLoginSuccess = () => {
        // Session will be updated automatically by NextAuth
        // Trigger fade-out animation for login form
        setShowLoginForm(false);
        // Wait for fade-out, then show greeting
        setTimeout(() => {
            setShowGreeting(true);
        }, 500);
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

    // Update states when session changes
    useEffect(() => {
        if (status === "authenticated" && user) {
            setShowLoginForm(false);
            setShowGreeting(true);
        } else if (status === "unauthenticated") {
            setShowGreeting(false);
            setShowLoginForm(true);
        }
    }, [user, status]);

    return (
        <header
            className={`${isScrolled ? "fixed-header" : ""} header-media grid grid-cols justify-items-center w-full border-b border-white/20`}>
            {!isScrolled && !user && showLoginForm && (
                <div className="fade-in-out" style={{ opacity: showLoginForm ? 1 : 0 }}>
                    <LoginForm ref={formRef} onLoginSuccess={handleLoginSuccess} />
                </div>
            )}
            {!isScrolled && user && showGreeting && (
                <div ref={formRef} className="flex flex-row gap-4 items-center justify-center pt-2 pb-2 fade-in">
                    <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Hello, {user.firstName}!
                    </span>
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

                .fade-in {
                    animation: fadeIn 0.5s ease-in;
                }

                .fade-in-out {
                    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </header>
    )
    }
