"use server";
import { cookies } from "next/headers";
import { apiUrl } from "./apiUrl";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";

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

export const updateProductAvailabilityAction = async ({
  availability,
  productId,
}: {
  availability: boolean;
  productId: string;
}) => {
  console.log(availability, productId);

  const token = cookies().get("token").value;

  const updateReq = await fetch(
    `${apiUrl}/product/${productId}?updateAvailability=${(!(
      availability.toString() === "true"
    )).toString()}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );
  const result = await updateReq.json();
  console.log(result);

  revalidatePath("/view/products");
};

export default async function revalidateAction(path: string) {
  revalidateTag(path);
}
