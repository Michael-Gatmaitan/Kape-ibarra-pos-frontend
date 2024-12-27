import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
interface IAuthForm {
  header: string;
  description: string;
  children: React.ReactNode;
}

const AuthForm = ({ header, description, children }: IAuthForm) => {
  return (
    <Card className="w-full my-4 mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>{header}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>
    </Card >);
};

export default AuthForm;