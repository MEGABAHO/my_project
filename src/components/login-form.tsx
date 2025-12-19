"use client"
import {FormEvent, useState, forwardRef} from "react";
import {useRouter} from "next/navigation";
import { signIn } from "next-auth/react";

interface Props {
    children?: React.ReactNode;
    className?: string;
    onLoginSuccess?: () => void;
}

const LoginForm = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const router = useRouter();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>("");

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        // Basic validation
        if (!login || !password) {
            setError("Please fill in all fields");
            setSubmitting(false);
            return;
        }

        // Submit to NextAuth
        try {
            const result = await signIn("credentials", {
                email: login,
                password: password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid credentials");
                setSubmitting(false);
                return;
            }

            // Success - clear form and notify parent
            setLogin("");
            setPassword("");
            
            if (props.onLoginSuccess) {
                props.onLoginSuccess();
            }
            
            // Refresh to update session
            router.refresh();
        } catch (error) {
            console.error('Login error:', error);
            setError("An error occurred. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCreateAccount = () => {
        router.push("/register");
    };

    return (
        <div ref={ref} className={props.className || "login-form"} style={{ transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' }}>
            <form onSubmit={handleLogin} className="flex flex-row gap-3 items-center justify-center pt-2 pb-2 flex-wrap">
                {error && (
                    <div className="w-full text-center bg-red-100 text-red-500 px-4 py-2 rounded-lg">
                        {error}
                    </div>
                )}
                
                <input
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                    type="text"
                    required={true}
                    placeholder="Login or Email"
                    className="px-5 py-2.5 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all text-gray-800 bg-white shadow-sm hover:shadow-md"
                />
                
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    required={true}
                    placeholder="Password"
                    className="px-5 py-2.5 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all text-gray-800 bg-white shadow-sm hover:shadow-md"
                />
                
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                    Log in
                </button>
                
                <button
                    type="button"
                    onClick={handleCreateAccount}
                    className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                    Create an account
                </button>
            </form>
        </div>
    );
});

LoginForm.displayName = "LoginForm";

export default LoginForm;
