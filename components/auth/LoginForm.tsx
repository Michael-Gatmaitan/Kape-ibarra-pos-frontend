"use client";
import React, { useState } from "react";
import AuthForm from "./auth-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "../../lib/types";
import { Label } from "../ui/label";
import { apiUrl } from "../../lib/apiUrl";
// import { redirect } from "next/navigation";

const LoginForm = () => {

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }, setError
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const [loginErr, setLoginErr] = useState<string>("");

  const onSubmit = async (data: TLoginSchema) => {

    // Just validate the schema on backend lol
    const response = await fetch('/api/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    if (responseData.ok === false) {
      console.error("Some error in login");
    }

    if (responseData.errors) {
      const errors = responseData.errors

      if (errors.username) {
        setError("username", {
          type: "server",
          message: errors.username
        })
      }
      if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password
        })
      }
    }

    // Call login api on server and store localstorage of token
    const loginReq = await fetch(`${apiUrl}/login`, {
      method: "POST",
      body: JSON.stringify({ username: data.username, password: data.password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const loginRes = await loginReq.json();

    // redirect('/profile');

    console.log(loginRes);

    if ('token' in loginRes) {
      console.log(loginRes.token);

      // If there's a token in response, set it to locatstorage
      const { token } = loginRes;

      // Assign token
      (async function () {
        await fetch('/api/token', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        });
      })();

    } else {
      console.log(loginRes.error)
      setLoginErr(loginRes.error)
    }
  }

  return (
    <AuthForm description="Login with your account" header="Log in">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <Input {...register("username")} type="text" placeholder="Username" />
        {errors.username && (<Label className="text-red-600">{errors.username.message}</Label>)}
        <Input {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        {errors.password && (<Label className="text-red-600">{errors.password.message}</Label>)}

        <div className="flex items-center gap-2">
          <Checkbox onCheckedChange={() => setShowPassword((prev) => !prev)} />
          <label>Show password</label>
        </div>

        <Button type="submit" disabled={isSubmitting}>Submit</Button>
      </form>

      {loginErr}
    </AuthForm>
  );
};

export default LoginForm;
