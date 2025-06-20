"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { signUpSchema, signUpSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const SignupPage = () => {
  const signupForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "all",
  });

  const handleSignup = (value: signUpSchemaType) => {
    localStorage.setItem("user", JSON.stringify(value));
    toast("You’ve signed up successfully. Check your email to verify.");
    signupForm.reset();

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-16 p-8 py-10 border rounded grid place-items-center">
      <h1 className="text-2xl font-bold mb-4">Create an account</h1>

      <Form {...signupForm}>
        <form
          className="space-y-2.5 w-full"
          onSubmit={signupForm.handleSubmit(handleSignup)}
        >
          {/* name  */}
          <FormField
            control={signupForm.control}
            name="name"
            render={({ field }) => {
              const inValid = !!signupForm.formState.errors.name;
              const valid = !inValid && signupForm.formState.dirtyFields.name;
              return (
                <FormItem>
                  <FormLabel className={valid ? "text-green-500" : ""}>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter"
                      {...field}
                      className={
                        valid
                          ? "border-green-500 focus-visible:ring-green-500"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* email  */}
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => {
              const inValid = !!signupForm.formState.errors.email;
              const valid = !inValid && signupForm.formState.dirtyFields.email;
              return (
                <FormItem>
                  <FormLabel className={valid ? "text-green-500" : ""}>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter"
                      {...field}
                      className={
                        valid
                          ? "border-green-500 focus-visible:ring-green-500"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* password  */}
          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => {
              const inValid = !!signupForm.formState.errors.password;
              const valid =
                !inValid && signupForm.formState.dirtyFields.password;
              return (
                <FormItem>
                  <FormLabel className={valid ? "text-green-500" : ""}>
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="off"
                        placeholder="Enter"
                        {...field}
                        className={
                          valid
                            ? "border-green-500 focus-visible:ring-green-500"
                            : ""
                        }
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button className="w-full py-5" type="submit">
            CREATE ACOUNT
          </Button>
        </form>
      </Form>
      <div className=" pb-6 pt-7 text-foreground/50">
        Have an Account?{" "}
        {
          <Link href={"/login"} className="text-foreground underline">
            LOGIN
          </Link>
        }
      </div>
    </div>
  );
};

export default SignupPage;
