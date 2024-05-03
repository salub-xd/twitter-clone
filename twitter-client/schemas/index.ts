import * as z from 'zod';


export const SettingsSchema = z.object({
    name: z.string().min(2, {
        message: "Name is required"
    }),
    username: z.string().min(3, {
        message: "Name is required"
    }),
    email: z.string().email(),
    bio: z.optional(z.string()),
    password: z.optional(z.string().min(5)),
    newPassword: z.optional(z.string().min(6)),
    profileImage: z.optional(z.string()),
    coverImage: z.optional(z.string()),
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;
    }, {
        message: "New password is required!",
        path: ["newPassword"]
    })
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }

        return true;
    }, {
        message: "Password is required!",
        path: ["password"]
    })

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
})
export const ResetPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Atleast password should be 6 digits"
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string().min(6))
})

export const RegisterSchema = z.object({
    name: z.string().min(2, {
        message: "Name is required"
    }),
    username: z.string().min(2, {
        message: "Username is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Atleast password should be 6 digits"
    }),
})


// Post Schemas

export const PostSchema = z.object({
    title: z.string().optional(),
    image: z.string().optional(),
})

export const FollowSchema = z.object({
    id: z.string(),
})