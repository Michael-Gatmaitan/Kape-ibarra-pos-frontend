"use client";

import React from 'react'
import AuthForm from './auth-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, TSignupSchema } from '../../lib/types';

import { useRouter } from 'next/navigation';

const SignupForm = () => {

  const router = useRouter();

  const { register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    // reset,
    setError
    // getValues,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: TSignupSchema) => {
    console.log(data);

    const response = await fetch('/api/signup', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = await response.json();

    console.log(responseData)

    if (responseData.ok === false) {
      console.error("Submit form failed")
    }

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.firstname) {
        setError("firstname", {
          type: 'server',
          message: errors.firstname
        })
      } else if (errors.lastname) {
        setError("lastname", {
          type: 'server',
          message: errors.lastname
        })
      } else if (errors.username) {
        setError("username", {
          type: 'server',
          message: errors.username
        })
      } else if (errors.password) {
        setError("password", {
          type: 'server',
          message: errors.password
        })
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: 'server',
          message: errors.confirmPassword
        })
      } else {
        console.error("something went wrong!")
      }
    }

    // If there's no error, call an api to create a account


    // ... and navigate the user to login page
    router.replace("/login");
    // reset();
  }

  return (
    <AuthForm header='Signup' formType='signup' showSocials>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">

        {/* Email */}
        <Input {...register("firstname")} type='text' placeholder='First name' />
        {errors.firstname && (<Label className="text-red-600">{errors.firstname.message}</Label>)}

        <Input {...register("lastname")} type='text' placeholder='Last name' />
        {errors.lastname && (<Label className="text-red-600">{errors.lastname.message}</Label>)}

        <Input {...register("username")} type='text' placeholder='Username' />
        {errors.username && (<Label className="text-red-600">{errors.username.message}</Label>)}

        {/* Password */}
        <Input {...register("password")} type='password' placeholder='Password' />
        {errors.password && (<Label className="text-red-600">{errors.password.message}</Label>)}

        {/* Confirm Password */}
        <Input {...register("confirmPassword")} type='password' placeholder='Confirm password' />
        {errors.confirmPassword && (<Label className="text-red-600">{errors.confirmPassword.message}</Label>)}

        <Button type='submit' disabled={isSubmitting}>Submit</Button>
      </form>
    </AuthForm>
  )
}

export default SignupForm
