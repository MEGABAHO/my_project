"use client"
import {FormEvent, useState, useEffect} from "react";
import {z} from "zod";
import {useRouter} from "next/navigation";

const registrationSchema = z.object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    captcha: z.string().length(6, "CAPTCHA must be 6 characters"),
});

// Function to generate random CAPTCHA text
const generateCaptcha = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
};

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaText, setCaptchaText] = useState("");
    const [captchaImage, setCaptchaImage] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string>("");

    // Generate CAPTCHA on component mount
    useEffect(() => {
        regenerateCaptcha();
    }, []);

    const regenerateCaptcha = () => {
        const newCaptcha = generateCaptcha();
        setCaptchaText(newCaptcha);
        
        // Create canvas and draw CAPTCHA
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 60;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
            // Background
            ctx.fillStyle = "#f0f0f0";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add noise lines
            for (let i = 0; i < 5; i++) {
                ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`;
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.stroke();
            }
            
            // Draw CAPTCHA text
            ctx.font = "bold 30px Arial";
            ctx.fillStyle = "#333";
            ctx.textBaseline = "middle";
            
            for (let i = 0; i < newCaptcha.length; i++) {
                const x = 20 + i * 30;
                const y = 30 + (Math.random() - 0.5) * 10;
                const angle = (Math.random() - 0.5) * 0.3;
                
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                ctx.fillText(newCaptcha[i], 0, 0);
                ctx.restore();
            }
            
            setCaptchaImage(canvas.toDataURL());
        }
    };

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
            captcha: captchaInput,
        });

        if (!result.success) {
            const errorMessages = result.error.errors.map((err) => err.message);
            setErrors(errorMessages);
            setSubmitting(false);
            return;
        }

        // TO DO: submit to server
        // For now, just simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccessMessage("Registration successful! Redirecting to home page...");
            
            // Clear form
            setEmail("");
            setFirstName("");
            setLastName("");
            setCaptchaInput("");
            
            // Redirect after 2 seconds
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch {
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
                                    maxLength={6}
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
