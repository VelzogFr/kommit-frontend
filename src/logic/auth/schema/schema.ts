import { z } from 'zod'

import { signupContent } from '@/data/signup'

const { errors } = signupContent

export const signupSchema = z.object({
  name: z.string().trim().min(1, errors.firstNameRequired),
  email: z.string().trim().pipe(z.email(errors.emailInvalid)),
  password: z.string().min(8, errors.passwordTooShort),
})

// RM20 : au signin, aucun format n'est vérifié, seul le bouton grisé bloque (RM32).
export const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type SignupFormValues = z.input<typeof signupSchema>
export type SignupData = z.output<typeof signupSchema>
export type SigninFormValues = z.input<typeof signinSchema>
