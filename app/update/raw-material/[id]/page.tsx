import React from "react";
import { apiUrl } from "../../../../lib/apiUrl";
import BackLink from "../../../../components/BackLink";
import FormContent from "../../../create/raw-material/FormContent";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const rawMaterial = await fetch(`${apiUrl}/raw-material/${id}`);

  const res = await rawMaterial.json();

  // a45adadf-faf9-406b-986b-f01e789901d8
  if (!res.id) {
    return <div>No raw material fetched using id: {id}</div>;
  }

  console.log(res);
  return (
    <div>
      {id}
      <BackLink href="/raw-material" buttonTitle="Raw material list" />

      <FormContent type="update" rawMaterialDefaultValues={res} />
    </div>
  );
};

export default page;
