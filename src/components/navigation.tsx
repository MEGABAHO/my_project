"use client"
import React from 'react'
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

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
    const { data: session } = useSession();
    const user = session?.user as any;

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <nav className={`w-full`}>
            <ul className={"grid grid-cols-2 justify-items-center items-center"}>
                {buttonsRoute.map((el) => (
                    <li key={el.path}>
                        <Link href={el.path}>
                            <button
                                className={"transition active:scale-[1.1] font-semibold shadow-white shadow-lg nav-btn my-2"}>
                                {el.name}
                            </button>
                        </Link>
                    </li>
                ))}
                {user && (
                    <li className="col-span-2 flex items-center gap-3 mt-2">
                        <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Hello, {user.firstName}!
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            Log out
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    )
}
