"use client"
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";



const buttonsRoute = [
    {
        name: "CV",
        path: "/cv"
    },
    {
        name: "My Projects",
        path: "/"
    }
]

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav
            className={`w-full `}>
            <ul className={"grid grid-cols-2 justify-items-center items-center"}>
                {
                    buttonsRoute.map((el) => {
                        const isActive = pathname === el.path;
                        return (
                            <li key={el.path}>
                                <Link href={el.path}>
                                    <button
                                        className={`transition active:scale-[1.1] font-semibold shadow-white shadow-lg nav-btn my-2 ${isActive ? 'ring-2 ring-white' : ''}`}>
                                        {el.name}
                                    </button>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
