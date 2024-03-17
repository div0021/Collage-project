import * as z from "zod";

export const createUserSchema = z.object({
      name: z.string().min(3,"Name is too short!"),
      email: z
        .string()
        .email("Please enter a valid email!"),
      password: z
        .string()
        .min(6, "Passoword too short!"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });
export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

//  Login Schema

export const  loginUserSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string()
})

export type  LoginUserInput= z.TypeOf<typeof loginUserSchema>

// Handling response error
export const handleErrorResponse = z.object({
  status: z.number(),
  data: z.any(),
});