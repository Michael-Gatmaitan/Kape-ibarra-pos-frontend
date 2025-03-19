"use client";

import { CldUploadWidget } from "next-cloudinary";

const Cld = () => {
  return (
    <CldUploadWidget
      //uploadPreset="my-preset"
      signatureEndpoint="/api/sign-image/"
      onSuccess={(res, opt) => console.log(res, opt)}
    >
      {({ open }) => {
        return <button onClick={() => open()}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
};

export default Cld;
