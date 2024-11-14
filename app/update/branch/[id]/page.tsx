import React from "react";
import { apiUrl } from "../../../../lib/apiUrl";
import BackLink from "../../../../components/BackLink";
import FormContent from "../../../create/branch/FormContent";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const branch = await fetch(`${apiUrl}/branch/${id}`);

  const res = await branch.json();
  console.log(res);
  if (!res.id) {
    return <div>No branch fetched using id: {id}</div>;
  }

  console.log(res);
  return (
    <div>
      <BackLink href="/branch" buttonTitle="Branch list" />
      <FormContent type="update" branchDefaultValues={res} />
    </div>
  );
};

export default page;
