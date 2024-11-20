import Navigation from "@/components/navigation";
import MyRegistrationForm from "@/components/my-registration-form";




export default function Header() {
    return (
        <header className={"header-media grid grid-cols-1 justify-items-center w-full border-b border-white/20 mb-auto"}>
            <MyRegistrationForm/>
            <Navigation/>
        </header>
    )
}
