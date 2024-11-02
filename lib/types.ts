import { z } from "zod";

// Signup schema
export const signupSchema = z
  .object({
    firstname: z.string().min(1, "Firstname required."),
    lastname: z.string().min(1, "Lastname required."),
    username: z.string().min(5, "Username must be at least 5 characters"),
    password: z.string().min(10, "Password is must be at least 10 characters"),
    roleName: z.string(),
    confirmPassword: z.string().min(10, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

// Login shcema
export const loginSchema = z.object({
  username: z.string().min(5, "Username must be atleast 5 characters"),
  password: z.string().min(10, "Password must be at least 10 characters"),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

// Branch schema
export const branchSchema = z.object({
  region: z.string(),
  province: z.string(),
  city: z.string(),
  zipCode: z.string(),
  baranggay: z.string(),
  streetAddress: z.string(),
  contactNumber: z.string().min(11, "Minimum number length is 11 characters."),
});

export type TBranchSChema = z.infer<typeof branchSchema>;

// Product schema with RawMaterials
const rawMaterialSchema = z.object({
  materialName: z.string().min(1, "Raw material should have a name"),
  quantityInUnitPerItem: z.number().min(1),
});

export const productSchema = z.object({
  productName: z
    .string()
    .min(5, "Product name should have atleast 5 characters"),
  price: z.string().min(1, "Product should have a price"),
  description: z.string().optional(),
  categoryId: z.string(),

  // For raw materials
  rawMaterials: z
    .array(rawMaterialSchema)
    .nonempty("At least one raw material is required"),
});

export type TProductSchema = z.infer<typeof productSchema>;

// const productData = {
//   productName: "Example Product",
//   price: 20.0,
//   productCategory: "A sample product",
//   rawMaterials: [
//     { id: 1, name: "Material A", quantity: 2 },
//     { id: 2, name: "Material B", quantity: 3 },
//   ],
// };
