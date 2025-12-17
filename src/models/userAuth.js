import { z } from 'zod'

export const createUser = z.object({
    email : z.email('Your email is not an email'),
    name: z.string().min(3,'Your name must be at least 3 chararcters long').max(255, 'Your name must be shorter than 255 characters'),
    surname : z.string().min(3,'Your surname must be at least 3 chararcters long').max(255, 'Your surname must be shorter than 255 characters'),
    password : z.string().min(6,'Password not crazy').max(100, 'Password too crazy')
})

export const loginSchema = z.object({
    email : z.email('Your email is not an email'),
    password : z.string().min(6,'Password not crazy').max(100, 'Password too crazy')
})