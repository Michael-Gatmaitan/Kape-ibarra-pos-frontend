"use server";
import { cookies } from "next/headers";
import { apiUrl } from "./apiUrl";

// Create category
export async function createCategoryAction(formData: FormData) {
  const categoryName = formData.get("category-name");
  const token = cookies().get("token").value;

  const req = await fetch(`${apiUrl}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({ categoryName }),
  });

  console.log(req.ok);
}
