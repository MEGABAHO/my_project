import H1 from "@/components/h1";
import RippleEffect from "@/components/ripple-effect";


export default function Home() {
    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <main className={"grid grid-cols-1 justify-items-center"}>
                <H1/>
                <RippleEffect />
                Home page
            </main>
        </div>
    );
}
