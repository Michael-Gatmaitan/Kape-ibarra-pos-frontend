"use server";
import { apiUrl } from "../../lib/apiUrl";

export async function createBranchAction(formData: FormData) {
  const region = formData.get("region");
  const province = formData.get("province");
  const streetAddress = formData.get("streetAddress")!;
  const baranggay = formData.get("baranggay")!;
  const city = formData.get("city")!;
  const contactNumber = formData.get("contactNumber")!;
  const zipCodeString = formData.get("zipCode")! as string;

  const zipCode = parseInt(zipCodeString);

  console.log(streetAddress, baranggay, city, zipCode);

  const createBranchReq = await fetch(`${apiUrl}/branch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      region,
      province,
      streetAddress,
      baranggay,
      city,
      zipCode,
      contactNumber,
    }),
  });

  console.log(createBranchReq.ok);
}
