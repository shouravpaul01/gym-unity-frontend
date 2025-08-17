"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Lottie from "lottie-react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";

import { loginValidationSchema } from "@/src/validations/auth.validation";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/src/components/icons";
import CInput from "@/src/components/form/CInput";
import CForm from "@/src/components/form/CForm";

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loginError, setLoginError] = useState("");

  const methods = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);

    try {
      methods.reset();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
        <p className="text-gray-600">
          Welcome back! Please enter your details.
        </p>
      </div>

      <CForm onSubmit={onSubmit} methods={methods as any} className="space-y-5">
        <div className="space-y-10">
          <CInput
            name="email"
            inputProps={{
              type: "email",
              label: "Email",
              placeholder: "Enter your email",
            }}
          />

          <CInput
            name="password"
            inputProps={{
              type: isPasswordVisible ? "text" : "password",
              label: "Password",
              placeholder: "Password",
              endContent: (
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent"
                  type="button"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              ),
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          color="success"
          size="lg"
          className="w-full"
          isLoading={isSubmitting }
          disabled={isSubmitting }
        >
          Login
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </CForm>
    </div>
  );
}
