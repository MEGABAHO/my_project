"use client";

import { useState, useEffect } from "react";
import styles from "../ripple.module.css";

interface Ripple {
    id: number;
    x: number;
    y: number;
}

export default function RippleEffect() {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    useEffect(() => {
        const handleClick = (ev: MouseEvent) => {
            const newRipple = {
                id: Date.now(),
                x: ev.clientX,
                y: ev.clientY,
            };

            setRipples((prev) => [...prev, newRipple]);

            setTimeout(() => {
                setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
            }, 600);
        };

        document.body.addEventListener("click", handleClick);
        return () => document.body.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className={styles.rippleContainer}>
            {ripples.map(({ id, x, y }) => (
                <span key={id} className={styles.ripple} style={{ top: y, left: x }} />
            ))}
        </div>
    );
}