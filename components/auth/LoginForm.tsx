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
import { useAppDispatch } from "../../lib/hooks";
import { setLoggedIn, setUserData } from "../../lib/features/auth/authSlice";
import { verifySession } from "../../lib/session";
import Link from "next/link";
// import { redirect } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();

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

    const loginReq = await fetch(`${apiUrl}/login`, {
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
      console.log("Loginres: ", loginRes.token);
      const payload = await verifySession(loginRes.token);

      if (payload.employee.id && payload.roleName) {
        dispatch(setLoggedIn(true));
        dispatch(setUserData({ employee: payload.employee, roleName: payload.roleName }));
        console.log('redux all set');
      }

      // If there's a token in response, set it to locatstorage
      const { token } = loginRes;
      console.log("Login token:", token);

      // Assign token
      (async function () {
        await fetch("/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
      })();

      // Route to login section base on role
      // for now for dev
      router.push('/');
    } else {
      console.log(loginRes.error);
      setLoginErr(loginRes.error);
    }
  };

  return (
    <AuthForm description="Login with your account" header="Log in">
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

        {loginErr}
      </Form>

      <Button type="button" variant="ghost" className="mt-2 w-full" asChild>
        <Link href="/signup">
          Dont have account? Sign up here!
        </Link>
      </Button>
    </AuthForm>
  );
};

export default LoginForm;
