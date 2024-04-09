import { z } from "zod";

const registerSchema = z.object({
    name: z.string().trim().min(2).max(30),
    email: z.string().email(),
    password: z.string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
        'Password must be atleast 8 characters and contain atleast one number, one alphabet, and one special character'),
    confirmPassword: z.string(),
    role: z.enum(['customer', 'user' , 'admin']),
}).refine((values) => {
    return values.password === values.confirmPassword;
},{
    message: "Passwords must match!",
    path: ["confirmPassword"]
})


export {
    registerSchema
}