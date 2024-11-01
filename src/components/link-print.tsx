"use client"
import React from 'react'
import Link from "next/link";

export default function LinkPrint() {

    return (
        <Link href={""} onClick={()=> window.print()}>Print</Link>
    )
}
