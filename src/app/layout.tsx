import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import React, {ReactNode} from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/container";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Ivan Topychkanov - Full Stack Developer",
    description: "Portfolio and CV of Ivan Topychkanov - Full Stack Developer specializing in JavaScript, React, Next.js, Node.js",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={` ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Container>
            <Header/>
            {children}
            <Footer/>
        </Container>
        </body>
        </html>
    );
}
