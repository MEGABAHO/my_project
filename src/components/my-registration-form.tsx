"use client"
import {FormEvent, useState, forwardRef} from "react";
import {z} from "zod"

const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
})
interface Props {
    children?: React.ReactNode;
    className?: string;
}
const MyRegistrationForm = forwardRef<HTMLDivElement, Props>((props, ref)=> {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState<string[]>([])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        setErrors([])
        
        // Validate form data with Zod
        const result = signUpSchema.safeParse({
            email,
            password,
            confirmPassword
        })
        
        if (!result.success) {
            const errorMessages = result.error.errors.map(err => err.message)
            setErrors(errorMessages)
            setSubmitting(false)
            return
        }
        
        // TO DO: submit to server
        // For now, just simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // Success - clear form
            setEmail("");
            setPassword("");
            setConfirmPassword("")
            setErrors(["Registration successful!"])
            setTimeout(() => setErrors([]), 3000)
        } catch {
            setErrors(["An error occurred. Please try again."])
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div ref={ref} className={props.className || "registration-form"}>
            <form onSubmit={handleSubmit} className={"reg-form flex flex-row gap-y-2 gap-x-3 pt-1"}>
                {
                    errors.length > 0 && (
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index} className={error.includes("successful") ? "bg-green-100 text-green-700 px-4 py-2 rounded" : "bg-red-100 text-red-500 px-4 py-2 rounded"}>
                                    {error}
                                </li>
                            ))
                            }
                        </ul>
                    )
                }
                <input onChange={(e) => setEmail(e.target.value)}
                       value={email}
                       type={"email"}
                       required={true}
                       placeholder={"Email"}
                       className={"px-4 py-2 rounded"}/>
                <input onChange={(e) => setPassword(e.target.value)}
                       value={password}
                       type={"password"}
                       required={true}
                       minLength={10}
                       placeholder={"Password"}
                       className={"px-4 py-2 rounded"}/>
                <input onChange={(e) => setConfirmPassword(e.target.value)}
                       value={confirmPassword}
                       type={"password"}
                       required={true}
                       minLength={10}
                       placeholder={"Confirm password"}
                       className={"px-4 py-2 rounded"}/>
                <button disabled={isSubmitting} type={"submit"}
                        className={"bg-blue-500 disabled:bg-gray-500 py-2 px-4 rounded"}>
                    Submit
                </button>
            </form>
        </div>
    );
})
MyRegistrationForm.displayName = "MyRegistrationForm";

export default MyRegistrationForm;