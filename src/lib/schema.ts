import * as z from "zod";

export const createUserSchema = z.object({
      name: z.string().min(3,"Name is too short!").optional(),
      email: z
        .string()
        .email("Please enter a valid email!").optional(),
      password: z
        .string()
        .min(6, "Passoword too short!").optional(),
      confirmPassword: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });
export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

//  Login Schema

export const  loginUserSchema = z.object({
  email: z.string().email("Invalid Email").optional(),
  password: z.string().min(1,"Write something!").optional()
})

export type  LoginUserInput= z.TypeOf<typeof loginUserSchema>

// Handling response error
export const handleErrorResponse = z.object({
  status: z.number(),
  data: z.any(),
});

// ForgetPassword schema
// mail
export const forgetPasswordMailSchema = z.object({
  email:z.string().email("Enter a valid mail").optional(),
})

export type ForgetPasswordMailType = z.TypeOf<typeof forgetPasswordMailSchema>

// password reset

export const resetPasswordSchema = z.object({
  password: z
  .string()
  .min(6, "Passoword too short!").optional(),
confirmPassword: z.string().optional(),
})
.refine((data) => data.password === data.confirmPassword, {
message: "Password do not match",
path: ["confirmPassword"],
});
export type ResetPasswordType = z.TypeOf<typeof resetPasswordSchema>




// Product schema

export const productSchema = z.object({
  name:z.string().min(3,"Write something!"),
  description:z.string().min(10, "Description is to short"),
  brand:z.string().min(3, "Brand name is to short"),
  price:z.coerce.number().nonnegative("Price must be non-negative"),
  quantity:z.coerce.number().positive("Stock must be non-negative"),
  discount:z.coerce.number().nonnegative("Stock must be non-negative"),
  category:z.string().min(1,"Choose cateogory!")
});

export type ProductSchemaType = z.TypeOf<typeof productSchema>

// Category Schema

export const categorySchema = z.object({
  name:z.string().min(3,"Write something!"),
  description:z.string().min(10,"Write something!"),
});

export type CategorySchemaType = z.TypeOf<typeof categorySchema>;


export type ProductType = Omit<ProductSchemaType,"category"> & {
  _id:string;
  isFeatured:boolean;
  isArchived:boolean;
  createdAt:Date;
  updatedAt: Date;
  images:string[];
  subCategories:string[];
  category:CategorySchemaType & {
    _id:string;
    subCategories:string[]
  };
}