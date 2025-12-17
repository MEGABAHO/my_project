"use client"
import Navigation from "@/components/navigation";
import LoginForm from "@/components/login-form";
import {useEffect, useRef, useState} from "react";






export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const formRef = useRef<HTMLDivElement | null>(null); // Типизированный реф
    const [formHeight, setFormHeight] = useState(0);

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

        // Убираем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [formHeight]);
    return (
        <header
            className={`${isScrolled ? "fixed-header" : ""} header-media grid grid-cols justify-items-center w-full border-b border-white/20`}>
            {!isScrolled && <LoginForm ref={formRef}/>}
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
