"use client"
import Navigation from "@/components/navigation";
import LoginForm from "@/components/login-form";
import {useEffect, useRef, useState} from "react";

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const formRef = useRef<HTMLDivElement | null>(null);
    const [formHeight, setFormHeight] = useState(0);

    // Check authentication status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error('Auth check error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginSuccess = () => {
        checkAuthStatus();
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
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
