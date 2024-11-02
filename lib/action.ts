"use server";
import { apiUrl } from "./apiUrl";

// Create category
export async function createCategoryAction(formData: FormData) {
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

// Create branch
export const createBranchAction = async (formData: FormData) => {
  console.log(formData);
  console.log("Create branch action");
};
