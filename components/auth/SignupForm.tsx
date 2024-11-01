"use client";

import React, { useState } from 'react'
import AuthForm from './auth-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, TSignupSchema } from '../../lib/types';
import { ChevronDown } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from '../ui/dropdown-menu';
import { useBranch, useRoles, useUserPayload } from '../../lib/customHooks';

const SignupForm = () => {
  const payload = useUserPayload();
  const roles = useRoles();
  const router = useRouter();
  const branches = useBranch();

  // ?? Resolve using states here
  const [roleId, setRoleId] = useState<number>();
  const [roleText, setRoleText] = useState("Select Role");
  const [branchId, setBranchId] = useState<number>();
  const [branchText, setBranchText] = useState<string>("Select branch to assign");

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
    <AuthForm header='Create user account' description='Create account for a new user'>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        {roleId + branchId}
        <div className="grid gap-2">
          {/* Email */}
          <Label>Firstname</Label>
          <Input {...register("firstname")} type='text' placeholder='First name' />
          {errors.firstname && (<Label className="text-red-600">{errors.firstname.message}</Label>)}
        </div>

        <div className="grid gap-2">
          <Label>Lastname</Label>
          <Input {...register("lastname")} type='text' placeholder='Last name' />
          {errors.lastname && (<Label className="text-red-600">{errors.lastname.message}</Label>)}
        </div>
        <div className="grid gap-2">
          <Label>Username</Label>
          <Input {...register("username")} type='text' placeholder='Username' />
          {errors.username && (<Label className="text-red-600">{errors.username.message}</Label>)}
        </div>

        <div className="grid gap-2">
          <Label>Password</Label>
          {/* Password */}
          <Input {...register("password")} type='password' placeholder='Password' />
          {errors.password && (<Label className="text-red-600">{errors.password.message}</Label>)}
        </div>

        <div className="grid gap-2">
          <Label>Confirm password</Label>
          {/* Confirm Password */}
          <Input {...register("confirmPassword")} type='password' placeholder='Confirm password' />
          {errors.confirmPassword && (<Label className="text-red-600">{errors.confirmPassword.message}</Label>)}
        </div>

        <div className='grid gap-2'>
          <Label>Select new user role</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline'>{roleText}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>Assign Role</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {roles.map(role => (
                  <DropdownMenuItem key={role.id} onClick={
                    () => {
                      setRoleId(role.id)
                      setRoleText(role.roleName)
                    }
                  }>
                    {role.roleName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* System Admin has the right to choose where to assign those users */}
        {payload?.roleName !== undefined && payload.roleName === "System Admin" ?
          (
            <div className='grid gap-2'>
              <Label>Select where branch to assign</Label>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline'>
                    {branchText} <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>Assign branch</DropdownMenuLabel>

                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {branches.map(branch => (
                      <DropdownMenuItem key={branch.id} onClick={() => {
                        setBranchId(branch.id)
                        setBranchText(`${branch.streetAddress} ${branch.baranggay}`)
                      }}>
                        {branch.streetAddress} {branch.baranggay}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : null}

        <Button type='submit' disabled={isSubmitting}>Create account</Button>
      </form>
    </AuthForm>
  )
}

export default SignupForm
