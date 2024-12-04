import React from "react";
import BackLink from "../../../components/BackLink";
import FormContent from "./FormContent";

const page = () => {

  const d = new Date();

  return (
    <div>
      <BackLink href="/view/raw-materials" buttonTitle="Raw material list" />
      <FormContent type="create" initialDateVal={d} />
    </div>
  );
};

export default page;
