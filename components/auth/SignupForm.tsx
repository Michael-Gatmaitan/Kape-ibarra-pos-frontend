"use client";

import React from 'react'
import AuthForm from './auth-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, TSignupSchema } from '../../lib/types';
import { useRouter } from 'next/navigation';
// import { useRoles, useUserPayload } from '../../lib/customHooks';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
// import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from '../ui/select';
import { apiUrl } from '../../lib/apiUrl';

const SignupForm = () => {
  // const payload = useUserPayload();
  // const roles = useRoles();
  const router = useRouter();
  // const branches = useBranch();

  const form = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
    }
  });

  console.log('wtf')

  const onSubmit = async (data: TSignupSchema) => {
    console.log(data);

    const validationRequest = await fetch('/api/schema/signup', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const validationData = await validationRequest.json();

    console.log(validationData)

    if (validationRequest.ok === false) {
      console.error("Submit form failed");
    }

    if (validationData.errors) {
      const errors = validationData.errors;

      if (errors.firstname) {
        form.setError("firstname", { type: 'server', message: errors.firstname });
      } else if (errors.lastname) {
        form.setError("lastname", { type: 'server', message: errors.lastname });
      } else if (errors.username) {
        form.setError("username", { type: 'server', message: errors.username });
      } else if (errors.password) {
        form.setError("password", { type: 'server', message: errors.password });
      } else if (errors.confirmPassword) {
        form.setError("confirmPassword", { type: 'server', message: errors.confirmPassword });
      } else if (errors.cpNum) {
        form.setError("cpNum", { type: 'server', message: errors.cpNum });
      } else {
        console.error("something went wrong!")
      }
    }

    // If there's no error, call an api to create a account
    // ... and navigate the user to login page

    const { confirmPassword, ...dataWOConfirmPassword } = data;

    const createAccountReq = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataWOConfirmPassword)
    })
      .then(res => res.json())
      .catch(err => console.log("There was an error creating user", err))

    console.log(createAccountReq, confirmPassword)

    router.replace("/login");
    // reset();
  }

  return (
    <AuthForm header='Create user account' description='Create account for a new user'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
          {/* FIRSTNAME */}
          <FormField control={form.control} name="firstname" render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder='First name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* LASTNAME */}
          <FormField control={form.control} name="lastname" render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder='Last name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* USERNAME */}
          <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* PASSWORD */}
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder='Password' autoComplete='on' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* CONFIRM PASSWORD */}
          <FormField control={form.control} name="confirmPassword" render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder='Confirm password' autoComplete='on' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* CP_NUM */}
          <FormField control={form.control} name="cpNum" render={({ field }) => (
            <FormItem>
              <FormLabel>Contact number</FormLabel>
              <FormControl>
                <Input placeholder='Contact number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* ROLE */}
          {/* {payload?.roleName !== undefined && (payload.roleName === "System Admin" || payload.roleName === "Branch Admin") ? (
            <React.Fragment>
              <FormField control={form.control} name="roleId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Select user role</FormLabel>

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles?.map(role => {
                        if (payload.roleName === "Branch Admin" && role.roleName === "System Admin") {
                          return;
                        }
                        return (
                          <SelectItem key={role.id} value={`${role.id}`}>{role.roleName}</SelectItem>
                        )
                      }
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              /* Only the SYSTEM ADMIN have a right to choose where branch to assign the new user *
              {payload.roleName === "System Admin" ? (
                <FormField control={form.control} name="branchId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select branch</FormLabel>

                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {branches?.map(branch => (
                          <SelectItem key={branch.id} value={`${branch.id}`}>
                            {branch.streetAddress}, {branch.baranggay}, {branch.city}, {branch.province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              ) : null}
            </React.Fragment>
          ) : null} */}

          {/* System Admin has the right to choose where to assign those users */}
          {/* {form.formState.errors.firstname}
          {form.formState.errors.lastname}
          {form.formState.errors.username}
          {form.formState.errors.password}
          {form.formState.errors.confirmPassword}
          {form.formState.errors.roleId} */}
          <Button type='submit' disabled={form.formState.isSubmitting}>Create account</Button>
        </form>
      </Form>
    </AuthForm>
  )
}

export default SignupForm
