import React from "react";
import FormContent from "./FormContent";
import BackLink from "../../../components/BackLink";

const page = () => {
  return (
    <div>
      <BackLink href="/branch" buttonTitle="Branch " />
      <FormContent type="create" />
    </div>
  );
};

export default page;
