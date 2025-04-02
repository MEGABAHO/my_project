
import React from 'react'
import Link from "next/link";



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

    return (
        <nav
            className={`w-full `}>
            <ul className={"grid grid-cols-2 justify-items-center items-center"}>
                {
                    buttonsRoute.map((el) => (
                        <li key={el.path}>
                            <Link href={el.path}>
                                <button
                                    className={"transition active:scale-[1.1] font-semibold shadow-white shadow-lg nav-btn my-2"}>
                                    {el.name}
                                </button>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
