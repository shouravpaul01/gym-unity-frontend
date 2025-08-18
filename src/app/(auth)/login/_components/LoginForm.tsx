"use client";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { loginValidationSchema } from "@/src/validations/auth.validation";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/src/components/icons";
import CInput from "@/src/components/form/CInput";
import CForm from "@/src/components/form/CForm";
import { useLoginMutation } from "@/src/lib/features/auth/authApi";
import { addToast } from "@heroui/toast";

import { useAppDispatch } from "@/src/lib/hook";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);

    try {
      const res = await login(data).unwrap();

      const userdata = {
        user: jwtDecode(res.data.token),
        token: res.data.token,
      };
      Cookies.set("accessToken", res.data.token, { path: "/", expires: 7 });
      const redirectPath = searchParams.get("redirect") || "/";
       router.replace(redirectPath);
      addToast({ description: res.message, color: "success" });
      setLoginError("");
      // methods.reset();
    } catch (error: any) {
      console.log(error, "error");
      const errorMessages = error?.data.errorMessages;
      errorMessages[0].path === "loginError" &&
        setLoginError(errorMessages[0].message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {loginError && (
        <span className="text-danger-300 pb-1.5">{loginError}</span>
      )}
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
          isLoading={isSubmitting || isLoading}
          disabled={isSubmitting || isLoading}
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
