// "use server";

// import fs from "node:fs/promises";
// import { productSchema } from "../lib/types";

// export const createProductServer = async (data: FormData) => {
//   const safeData = productSchema.safeParse(data);

//   if (!safeData.success) throw new Error("Invalid data");

//   const { productName, description, price, imagePath, recipes } = safeData.data;

//   try {
//     const arrayBuffer = await imagePath.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);
//     const filePath = `./public/uploads/${Date.now()}_${imagePath.name}`;

//     await fs.writeFile(filePath, buffer);

//     console.log(productName, description, price, recipes);
//   } catch (err) {
//     console.log(err);
//   }
// };
