"use server";

import { revalidatePath } from "next/cache";

export async function revalidateViewsProduct(path: string) {
  // revalidatePath("/views/product");
  try {
    if (path) {
      revalidatePath(path);
    } else {
      console.log(path);
      revalidatePath("/");
      revalidatePath("/[lang]");
    }
  } catch (err) {
    console.log("Clear revalidateserver acgion -> ", err);
  }
}
