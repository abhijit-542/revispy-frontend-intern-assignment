"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("No user found. Please sign up first.");
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (
        parsedUser.email === values.email &&
        parsedUser.password === values.password
      ) {
        localStorage.setItem("loggedIn", "true");
        toast("Login successful! Welcome back!");
        setTimeout(() => {
          router.push("/protected");
        }, 1000);
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Failed to login. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 md:mt-16 md:p-8 p-5 py-10 border rounded grid place-items-center">
        <div className="text-center space-y-0.5 mb-5">
          <h1 className="font-bold text text-2xl md:text-3xl pb-5">Login</h1>
          <h3 className="font-semibold text-lg md:text-xl">
            Welcome back to ECOMMERCE
          </h3>
          <h6 className="text-sm">The next gen business marketplace</h6>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(handleLogin)}
            className="space-y-5 w-full"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => {
                const inValid = !!loginForm.formState.errors.email;
                const valid = !inValid && loginForm.formState.dirtyFields.email;
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
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => {
                const inValid = !!loginForm.formState.errors.password;
                const valid =
                  !inValid && loginForm.formState.dirtyFields.password;
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          placeholder="Enter"
                          {...field}
                          className={
                            valid
                              ? "border-green-500 focus-visible:ring-green-500 pr-10"
                              : "pr-10"
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
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button className="w-full py-5" type="submit">
              LOGIN
            </Button>
          </form>
        </Form>
        <div className=" pb-7 pt-7 text-foreground/50">
          Don't have an Account?{"  "}
          {
            <Link href={"/signup"} className="text-foreground underline">
              SIGN UP
            </Link>
          }
        </div>
      </div>
    </>
  );
}
