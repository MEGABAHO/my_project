import Cv from "@/app/cv/cv";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CV - Ivan Topychkanov",
    description: "Professional CV and resume of Ivan Topychkanov - Full Stack Developer",
};

export default function Page() {
    return (
        <main>
            <Cv />
        </main>
    )
}
