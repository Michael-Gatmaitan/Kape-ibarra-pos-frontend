import { z } from "zod";

// Signup schema
export const signupSchema = z
  .object({
    firstname: z.string().min(1, "Firstname required."),
    lastname: z.string().min(1, "Lastname required."),
    username: z.string().min(5, "Username must be at least 5 characters"),
    password: z.string().min(10, "Password is must be at least 10 characters"),
    confirmPassword: z.string().min(10, "Please confirm your password"),
    cpNum: z.string().min(11, "Minimum of 11 characters required"),
    // roleId: z.string().min(1, "RoleId is required").optional(),
    // branchId: z.string().min(1, "BranchId is required"),
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
