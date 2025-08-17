"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@heroui/button";

import { Link } from "@heroui/link";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/src/components/icons";
import { registerValidationSchema } from "@/src/validations/auth.validation";
import { Checkbox } from "@heroui/checkbox";
import CForm from "@/src/components/form/CForm";
import CInput from "@/src/components/form/CInput";


export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const methods = useForm({
    resolver: zodResolver(registerValidationSchema),
    
  });

  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form data:", data);
      // Handle registration logic here
      // Example: await registerUser(data)

      // Reset form on success
      methods.reset();
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="text-gray-600">
          Join our community and start your fitness journey.
        </p>
      </div>

      <CForm onSubmit={onSubmit} methods={methods as any} className="space-y-4">
        
        <div className="space-y-10">
        <CInput
          name="name"
          inputProps={{ label: "Name", placeholder: "Enter your name" }}
        />

        <CInput
          name="email"
          inputProps={{ label: "Email", placeholder: "Enter your email" }}
        />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CInput
            name="password"
            inputProps={{
              type: isPasswordVisible ? "text" : "password",
              label:"Password",
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

          <CInput
            name="confirmPassword"
            inputProps={{
              type: isPasswordVisible ? "text" : "password",
              label:"Confirm Password",
              placeholder: "Confirm Password",
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

        
        <div className="flex items-start">
          <Checkbox id="acceptTerms" color="success">
            {" "}
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </Checkbox>
        </div>

        <Button
          type="submit"
          color="success"
          className="w-full"
          size="lg"
          isLoading={isSubmitting }
          disabled={isSubmitting }
        >
          Create Account
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </CForm>
    </div>
  );
}
