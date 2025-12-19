"use client"
import {FormEvent, useState, useEffect, useCallback} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";
import { useSession } from "next-auth/react";

// Validation constants
const PASSWORD_MIN_LENGTH = 8;

const registrationSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    password: z.string().min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`),
    confirmPassword: z.string(),
    captcha: z.string().length(6, "CAPTCHA must be 6 characters"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
});

// CAPTCHA configuration constants
const CAPTCHA_CONFIG = {
    LENGTH: 6,
    WIDTH: 200,
    HEIGHT: 60,
    FONT: "bold 30px Arial",
    NOISE_LINES: 5,
    CHAR_SPACING: 30,
    CHAR_X_OFFSET: 20,
    CHAR_Y_BASE: 30,
    CHAR_Y_VARIATION: 10,
    CHAR_ROTATION_MAX: 0.3,
} as const;

const REDIRECT_DELAY_MS = 2000;

// Function to generate random CAPTCHA text
const generateCaptcha = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: CAPTCHA_CONFIG.LENGTH }, () => 
        chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
};

export default function RegisterPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaText, setCaptchaText] = useState("");
    const [captchaImage, setCaptchaImage] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string>("");

    // Redirect to homepage if user is already logged in
    useEffect(() => {
        if (status === "authenticated" && session) {
            router.push("/");
        }
    }, [status, session, router]);

    const regenerateCaptcha = useCallback(() => {
        const newCaptcha = generateCaptcha();
        setCaptchaText(newCaptcha);
        
        // Create canvas and draw CAPTCHA
        const canvas = document.createElement("canvas");
        canvas.width = CAPTCHA_CONFIG.WIDTH;
        canvas.height = CAPTCHA_CONFIG.HEIGHT;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
            // Background
            ctx.fillStyle = "#f0f0f0";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add noise lines
            for (let i = 0; i < CAPTCHA_CONFIG.NOISE_LINES; i++) {
                ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`;
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.stroke();
            }
            
            // Draw CAPTCHA text
            ctx.font = CAPTCHA_CONFIG.FONT;
            ctx.fillStyle = "#333";
            ctx.textBaseline = "middle";
            
            for (let i = 0; i < newCaptcha.length; i++) {
                const x = CAPTCHA_CONFIG.CHAR_X_OFFSET + i * CAPTCHA_CONFIG.CHAR_SPACING;
                const y = CAPTCHA_CONFIG.CHAR_Y_BASE + (Math.random() - 0.5) * CAPTCHA_CONFIG.CHAR_Y_VARIATION;
                const angle = (Math.random() - 0.5) * CAPTCHA_CONFIG.CHAR_ROTATION_MAX;
                
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                ctx.fillText(newCaptcha[i], 0, 0);
                ctx.restore();
            }
            
            setCaptchaImage(canvas.toDataURL());
        }
    }, []);

    // Generate CAPTCHA on component mount
    useEffect(() => {
        regenerateCaptcha();
    }, [regenerateCaptcha]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors([]);
        setSuccessMessage("");

        // Validate CAPTCHA first
        if (captchaInput.toUpperCase() !== captchaText) {
            setErrors(["CAPTCHA is incorrect. Please try again."]);
            setCaptchaInput("");
            regenerateCaptcha();
            setSubmitting(false);
            return;
        }

        // Validate form data with Zod
        const result = registrationSchema.safeParse({
            email,
            firstName,
            lastName,
            password,
            confirmPassword,
            captcha: captchaInput,
        });

        if (!result.success) {
            const errorMessages = result.error.errors.map((err) => err.message);
            setErrors(errorMessages);
            setSubmitting(false);
            return;
        }

        // Submit to server
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.details) {
                    // Validation errors from server
                    const errorMessages = data.details.map((err: { message: string }) => err.message);
                    setErrors(errorMessages);
                } else {
                    setErrors([data.error || 'Registration failed']);
                }
                setSubmitting(false);
                return;
            }

            setSuccessMessage("Registration successful! Redirecting to home page...");
            
            // Clear form
            setEmail("");
            setFirstName("");
            setLastName("");
            setPassword("");
            setConfirmPassword("");
            setCaptchaInput("");
            
            // Redirect after delay
            setTimeout(() => {
                router.push("/");
            }, REDIRECT_DELAY_MS);
        } catch (error) {
            console.error('Registration error:', error);
            setErrors(["An error occurred. Please try again."]);
            regenerateCaptcha();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl">
                <div>
                    <h2 className="text-center text-3xl font-extrabold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join us today and get started
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {successMessage && (
                        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-center font-semibold">
                            {successMessage}
                        </div>
                    )}

                    {errors.length > 0 && (
                        <div className="space-y-2">
                            {errors.map((error, index) => (
                                <div key={index} className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                required={true}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all text-gray-800 bg-white shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                type="text"
                                required={true}
                                placeholder="Enter your first name"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all text-gray-800 bg-white shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                type="text"
                                required={true}
                                placeholder="Enter your last name"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all text-gray-800 bg-white shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                required={true}
                                minLength={PASSWORD_MIN_LENGTH}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all text-gray-800 bg-white shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                type="password"
                                required={true}
                                minLength={PASSWORD_MIN_LENGTH}
                                placeholder="Confirm your password"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all text-gray-800 bg-white shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Verify you&apos;re not a robot
                            </label>
                            <div className="flex flex-col space-y-3">
                                <div className="flex items-center space-x-3">
                                    {captchaImage && (
                                        <img
                                            src={captchaImage}
                                            alt="CAPTCHA"
                                            className="border-2 border-gray-300 rounded-lg"
                                        />
                                    )}
                                    <button
                                        type="button"
                                        onClick={regenerateCaptcha}
                                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
                                        title="Regenerate CAPTCHA"
                                    >
                                        🔄
                                    </button>
                                </div>
                                <input
                                    onChange={(e) => setCaptchaInput(e.target.value)}
                                    value={captchaInput}
                                    type="text"
                                    required={true}
                                    maxLength={CAPTCHA_CONFIG.LENGTH}
                                    placeholder="Enter the 6 characters above"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all text-gray-800 bg-white shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Back to Home
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
