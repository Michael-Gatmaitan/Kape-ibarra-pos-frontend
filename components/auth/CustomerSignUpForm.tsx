"use client";
import React from 'react'
import { useForm } from 'react-hook-form';
import { signupSchema, TSignupSchema } from '../../lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import AuthForm from './auth-form';
import { apiUrl } from '../../lib/apiUrl';
import { useToast } from '../../@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const CustomerSignUpForm = () => {
  const form = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      // gender: "",
    }
  });

  const router = useRouter();
  const { toast } = useToast();

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
      } else if (errors.gender) {
        form.setError("gender", { type: 'server', message: errors.gender });
      } else if (errors.phoneNumber) {
        form.setError("phoneNumber", { type: 'server', message: errors.phoneNumber });
      } else {
        console.error(errors, "something went wrong!")
      }
    }

    // If there's no error, call an api to create a account
    // ... and navigate the user to login page

    const { confirmPassword, ...dataWOConfirmPassword } = data;

    const createAccountReq = await fetch(`${apiUrl}/create-customer`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataWOConfirmPassword)
    })
      .then(res => res.json())
      .catch(err => console.log("There was an error creating user", err));

    if ('message' in createAccountReq) {
      form.setError('username', createAccountReq.message);
      return;
    }

    console.log(createAccountReq, confirmPassword);

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

          {/* GENDER */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-between"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Male
                      </FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button type='submit' disabled={form.formState.isSubmitting}>Create account</Button>
        </form>
      </Form>
    </AuthForm>
  )
}

export default CustomerSignUpForm
