import React from "react";
import BackLink from "../../../../components/BackLink";
import { apiUrl } from "../../../../lib/apiUrl";
import FormContent from "../../../create/product/FormContent";
import { TProductSchema } from "../../../../lib/types";
import { IProduct, IRawMaterial } from "../../../..";
import { getCookieToken } from "../../../../lib/cookieToken";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const token = await getCookieToken()

  const productToEdit = await fetch(`${apiUrl}/product/${id}?mode=edit`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  if (!productToEdit.ok) return <div>Something went wrong</div>;

  const res: TProductSchema & IProduct = await productToEdit.json();

  const recipes = res.recipes.map((recipe) => {
    return {
      ...recipe,
      rawMaterialId: recipe.rawMaterialId,
      quantityInUnitPcsNeeded: recipe.quantityInUnitPcsNeeded.toString(),
    };
  });

  console.log(
    "This is on server side, original value of res.recipes: ",
    res.recipes,
  );

  const response = await fetch(`${apiUrl}/raw-material`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  const rawMaterials: IRawMaterial[] = await response.json();

  return (
    <div>
      <BackLink buttonTitle="Product list" href="/view/products" />
      {/* <FormContent type='update' /> */}
      <FormContent
        type="update"
        productDefaultValues={res}
        recipesDefaultValues={recipes}
        rawMaterials={rawMaterials}
      />
    </div>
  );
};

export default page;
