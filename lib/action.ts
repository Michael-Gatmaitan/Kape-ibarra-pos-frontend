"use server";
import { apiUrl } from "./apiUrl";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";
import { getCookieToken } from "./cookieToken";
import { getUserPayloadServer } from "../actions/serverActions";

// Create category
export async function createCategoryAction(formData: FormData) {
  const categoryName = formData.get("category-name");
  const token = await getCookieToken();

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

  const token = await getCookieToken();

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

export const updateEWallet = async ({
  name,
  phoneNumber,
}: {
  name: string;
  phoneNumber: string;
}) => {
  const token = await getCookieToken();
  const createEWalletReq = await fetch(`${apiUrl}/e-wallet`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({ name, phoneNumber }),
  });

  const createEWalletRes = await createEWalletReq.json();
  console.log(createEWalletRes);

  revalidatePath("/view/e-wallet");
  return createEWalletRes;
};

export default async function revalidateAction(path: string) {
  revalidateTag(path);
}

export const updateOrderToPreparing = async ({
  orderId,
  customerNumber,
  type,
}: {
  orderId: string;
  customerNumber: number;
  type: string;
}) => {
  if (type !== "process-order") return;

  const token = await getCookieToken();
  const payload = await getUserPayloadServer();

  const acceptedOrderReq = await fetch(
    `${apiUrl}/order/${orderId}?updateType=payment_confirmation`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        employeeId: payload.person.id,
      }),
    }
  );

  if (!acceptedOrderReq.ok) {
    console.log("Error in accepting order payment");
    return;
  }

  const acceptedOrderRes = await acceptedOrderReq.json();

  console.log(acceptedOrderRes);

  // // newTransaction
  const newTransaction = await fetch(
    `${apiUrl}/transaction?transactionType=customer`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        orderId,
        change: 0,
      }),
    }
  );

  const newTransactionRes = await newTransaction.json();

  console.log(newTransactionRes);

  revalidatePath("/u/cashier/orders");

  return acceptedOrderRes;
};
