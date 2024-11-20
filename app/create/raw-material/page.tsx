import React from "react";
import BackLink from "../../../components/BackLink";
import FormContent from "./FormContent";
const page = async () => {
  return (
    <div>
      <BackLink href="/view/raw-materials" buttonTitle="Raw material list" />
      <FormContent type="create" />
    </div>
  );
};

export default page;
