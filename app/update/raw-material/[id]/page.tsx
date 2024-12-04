import React from "react";
import { apiUrl } from "../../../../lib/apiUrl";
import BackLink from "../../../../components/BackLink";
import FormContent from "../../../create/raw-material/FormContent";
import { getCookieToken } from "../../../../lib/cookieToken";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const token = await getCookieToken()
  const rawMaterial = await fetch(`${apiUrl}/raw-material/${id}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    }
  });

  const res = await rawMaterial.json();

  // a45adadf-faf9-406b-986b-f01e789901d8
  if (!res.id) {
    return <div>No raw material fetched using id: {id}</div>;
  }

  console.log(res);

  const d = new Date();
  return (
    <div>
      {id}
      <BackLink href="/view/raw-materials" buttonTitle="Raw material list" />

      <FormContent type="update" rawMaterialDefaultValues={res} initialDateVal={d} />
    </div>
  );
};

export default page;
