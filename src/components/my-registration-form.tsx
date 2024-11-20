"use client"
import {FormEvent, useState} from "react";
// import {z} from "zod"

// const signUpSchema= z.object({
//     email: z.string().email(),
//     password: z.string().min(10, "Password must be at least 10 characters"),
//     confirmPassword: z.string(),
// }).refine(data => data.password === data.confirmPassword, {
//     message: "Passwords must match",
//     path: ["confirmPassword"]
// })
// type SignUpSchema = z.infer<typeof signUpSchema>;
export default function MyRegistrationForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState<string[]>([])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSubmitting(true)
        if (password !== confirmPassword) {
            setErrors(["password is not the same"])
            setSubmitting(false);
            return;
        }
        // TO DO: submit to server
        //...
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setEmail("");
        setPassword("");
        setConfirmPassword("")
        setSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-row gap-y-2 gap-x-3 pt-1"}>
            {
                errors.length > 0 && (
                    <ul>
                        {errors.map((error) => (
                            <li key={error} className={"bg-red-100 text-red-500 px-4 py-2 rounded"}>
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
                    className={"bg-blue-500 disabled:bg-gray-500 py-2 px-3 rounded"}>
                Submit
            </button>
        </form>
    );
}

