import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

interface IAuthForm {
  header: string;
  children: React.ReactNode;
  showSocials?: boolean;
  formType: 'login' | 'signup';
}

const AuthForm = ({ header, children, showSocials, formType }: IAuthForm) => {
  return (
    <Card className="w-full mx-4 lg:mx-12">
      <CardHeader>
        <CardTitle>{header}</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>

      <CardContent>
        {children}
      </CardContent>

      <CardFooter className="grid">
        {showSocials ?
          (
            <div className="w-full flex justify-between gap-4">
              <Button className="w-full" variant="secondary" asChild>
                <Link href='#'>
                  <FaGoogle />
                </Link>
              </Button>
              <Button className="w-full" variant="secondary" asChild>
                <Link href='#'>
                  <FaGoogle />
                </Link>
              </Button>
            </div>

          ) : null}

        <Button variant="link" asChild className="w-full">
          {/* <Link href={'/signup'}>
            Create an account {formType}
          </Link> */}
          {
            formType === 'login' ? (
              <Link href={'/signup'}>
                Create an account
              </Link>
            ) : (
              <Link href={'/login'}>
                Already have an account? Login
              </Link>
            )
          }
        </Button>
        {/* </Link> */}
      </CardFooter>
    </Card >);
};

export default AuthForm;