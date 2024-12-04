"use client";

import React from 'react'
import AuthForm from './auth-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEmployeeSchema, TCreateEmployeeSchema } from '../../lib/types';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from '../ui/select';
import { apiUrl } from '../../lib/apiUrl';
import { useUserPayload } from '../../lib/customHooks';
import { useToast } from '../../@/hooks/use-toast';
import { IRole } from '../..';
import { Loader2 } from 'lucide-react';

const SignupForm = ({ roles }: { roles: IRole[] }) => {
  const payload = useUserPayload();
  // const roles = useRoles();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TCreateEmployeeSchema>({
    resolver: zodResolver(createEmployeeSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      roleId: "",
    }
  });

  console.log(roles);

  const onSubmit = async (data: TCreateEmployeeSchema) => {
    console.log(data);

    const validationRequest = await fetch('/api/schema/create-employee', {
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
      } else if (errors.phoneNumber) {
        form.setError("phoneNumber", { type: 'server', message: errors.phoneNumber });
      } else if (errors.roleId) {
        form.setError("roleId", { type: 'server', message: errors.roleId });
      } else {
        console.error(errors, "something went wrong!")
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
      .catch(err => console.log("There was an error creating user", err));

    console.log(createAccountReq, confirmPassword);

    if ('message' in createAccountReq) {
      form.setError('username', createAccountReq.message);
    }

    alert()
    toast({ title: "Accout created successly" })
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
          <FormField control={form.control} name="phoneNumber" render={({ field }) => (
            <FormItem>
              <FormLabel>Contact number</FormLabel>
              <FormControl>
                <Input placeholder='Contact number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* ROLE */}
          {payload?.roleName !== undefined && (payload.roleName === "admin") ? (
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
            </React.Fragment>
          ) : null}

          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Creating
              </>) : "Create account"
            }
          </Button>
        </form>
      </Form>
    </AuthForm>
  )
}

export default SignupForm
