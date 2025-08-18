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
import { useRegisterMutation } from "@/src/lib/features/auth/authApi";
import { addToast } from "@heroui/toast";
import {  useRouter } from "next/navigation";
import { email } from "zod";

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
const router=useRouter()
  const methods = useForm({
    resolver: zodResolver(registerValidationSchema),
    
  });
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      
     const res= await registerUser(data).unwrap();
      addToast({ description: res?.message, color: "success" });
      router.push("/login")
      methods.reset();
    } catch (error:any) {
    
      const errorMessages = error?.data?.errorMessages;
      if (errorMessages?.length > 0) {
        errorMessages?.forEach((errorMessage: any) =>
          methods.setError(errorMessage.path, {
            type: "manual",
            message: errorMessage.message,
          })
        );
      }

    } finally {
      setIsSubmitting(false);
    }
  };
  return (
   <>
    <CForm onSubmit={handleSubmit} methods={methods as any} className="space-y-4">
        
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
          type: isConfirmPasswordVisible ? "text" : "password",
          label:"Confirm Password",
          placeholder: "Confirm Password",
          endContent: (
            <button
              aria-label="toggle password visibility"
              className="focus:outline-solid outline-transparent"
              type="button"
              onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
            >
              {isConfirmPasswordVisible ? (
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
      isLoading={isSubmitting || isLoading}
      disabled={isSubmitting || isLoading}
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
  
   </>
  )
}
