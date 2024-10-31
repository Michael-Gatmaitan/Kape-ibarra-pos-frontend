"use server";
import { apiUrl } from "../../../lib/apiUrl";

export async function createCategory(formData: FormData) {
  const categoryName = formData.get("category-name");

  const req = await fetch(`${apiUrl}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryName }),
  });

  console.log(req.ok);
}
