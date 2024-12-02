"use client";
import React, { useState } from "react";
import AuthForm from "./auth-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "../../lib/types";
import { apiUrl } from "../../lib/apiUrl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import { verifySession } from "../../lib/session";
import revalidateAction from "../../lib/action";

const LoginForm = (props: { loginType: "employee" | "customer", children?: React.ReactNode }) => {
  const { loginType } = props;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loginErr, setLoginErr] = useState<string>("");

  const onSubmit = async (data: TLoginSchema) => {
    // Just validate the schema on backend lol
    const response = await fetch("/api/schema/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.ok === false) {
      console.error("Some error in login");
    }

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.username) {
        form.setError("username", {
          type: "server",
          message: errors.username,
        });
      }
      if (errors.password) {
        form.setError("password", {
          type: "server",
          message: errors.password,
        });
      }
    }

    console.log(apiUrl);
    const loginReq = await fetch(`${apiUrl}/login?loginType=${loginType}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    const loginRes = await loginReq.json();

    // redirect('/profile');

    console.log(loginRes);

    if ("token" in loginRes) {
      (async function () {
        await fetch("/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: loginRes.token,
          },
        });
      })();

      const payload = await verifySession(loginRes.token);
      const createAuditLogReq = await fetch(`${apiUrl}/audit-log`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          authorization: loginRes.token
        },
        body: JSON.stringify({
          id: payload.person.id,
          roleName: payload.roleName
        })
      });

      const auditLogRes = await createAuditLogReq.json();
      console.log(auditLogRes);
    }

    // Route to login section base on role
    // for now for dev
    // revalidatePath('/view/audit-logs');
    revalidateAction('/view/audit-logs');
    router.push('/');
    router.refresh();

    console.log(loginRes.error);
    setLoginErr(loginRes.error);
  };

  return (
    <AuthForm description={`${loginType === "customer" ? "Login with your account" : "Login as employee"}`} header="Log in">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          {/* USERNAME */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PASSWORD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={() => setShowPassword((prev) => !prev)}
            />
            <label>Show password</label>
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </form>

        {loginErr && loginErr}
      </Form>

      <Button type="button" variant="ghost" className="mt-2 w-full" asChild>
        <Link href="#">
          Dont have account? Sign up here!
        </Link>
      </Button>
      {props.children}
    </AuthForm>
  );
};

export default LoginForm;
