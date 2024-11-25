import { z } from "zod";

// Signup schema
export const signupSchema = z
  .object({
    firstname: z.string().min(1, "Firstname required."),
    lastname: z.string().min(1, "Lastname required."),
    username: z.string().min(5, "Username must be at least 5 characters."),
    password: z.string().min(10, "Password is must be at least 10 characters."),
    confirmPassword: z.string().min(10, "Please confirm your password."),
    gender: z.string().min(1, "Gender required"),
    phoneNumber: z
      .string()
      .min(11, "Phone number must be 11 characters long.")
      .max(11, "Phone number must be 11 characters long.")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

export const createEmployeeSchema = z
  .object({
    firstname: z.string().min(1, "Firstname required."),
    lastname: z.string().min(1, "Lastname required."),
    username: z.string().min(1, "Username required."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    email: z.string().email().optional(),
    confirmPassword: z.string().min(8, "Please confirm your password."),
    roleId: z.string().min(1, "RoleId is required."),
    phoneNumber: z
      .string()
      .min(11, "Phone number must be 11 characters long.")
      .max(11, "Phone number must be 11 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TCreateEmployeeSchema = z.infer<typeof createEmployeeSchema>;

// Login shcema
export const loginSchema = z.object({
  username: z.string().min(5, "Username must be atleast 5 characters"),
  password: z.string().min(10, "Password must be at least 10 characters"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

// Product schema with RawMaterials
const recipeSchema = z.object({
  // id: z.string(),
  rawMaterialId: z
    .string()
    .min(1, "Raw material should have a name")
    .default(""),
  quantityInUnitPcsNeeded: z.string().default(""),
});

export const productSchema = z.object({
  // imagePath: z.string().min(1),
  productName: z
    .string()
    .min(5, "Product name should have atleast 5 characters")
    .default(""),
  price: z.string().min(1, "Product should have a price").default(""),
  description: z.string().optional().default(""),
  categoryId: z.string().min(1, "Category required").default(""),

  //   // For raw materials
  recipes: z
    .array(recipeSchema)
    .nonempty("At least one raw material is required"),
});

export type TProductSchema = z.infer<typeof productSchema>;

export const rawMaterialSchema = z.object({
  materialName: z.string().min(1, "Raw material name required").default(""),
  quantityInUnitPerItem: z
    .string()
    .min(1, "Raw material should have quantity")
    .default(""),
  rawPrice: z.string().min(1, "Raw material should have a price").default(""),
});

export type TRawMaterialSchema = z.infer<typeof rawMaterialSchema>;

// const productData = {
//   productName: "Example Product",
//   price: 20.0,
//   productCategory: "A sample product",
//   rawMaterials: [
//     { id: 1, name: "Material A", quantity: 2 },
//     { id: 2, name: "Material B", quantity: 3 },
//   ],
// };

export const categorySchema = z.object({
  categoryName: z.string().min(1, "Category name required"),
});

export type TCategorySchema = z.infer<typeof categorySchema>;

export const customerSchema = z.object({
  email: z.string().min(1, "Email required").email(),
  firstname: z.string().min(1, "Username required"),
  lastname: z.string().min(1, "Lastname required"),
  phoneNumber: z.string().min(1, "Phone number required or optional"),
  username: z.string().min(5, "Minimum of 5 characters required"),
  password: z.string().min(8, "Minimum of 8 characters"),
});

export type TCustomerSchema = z.infer<typeof customerSchema>;

type IErr = { message: string };
export function isErrorMessage<T>(res: T | IErr): res is IErr {
  return (res as IErr).message !== undefined;
}
