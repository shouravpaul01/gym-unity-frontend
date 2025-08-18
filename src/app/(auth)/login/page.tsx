import { Suspense } from "react";
import LoginForm from "./_components/LoginForm";
import Loading from "@/src/components/Loading";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
        <p className="text-gray-600">
          Welcome back! Please enter your details.
        </p>
      </div>
      <Suspense fallback={<Loading className="h-52"/>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
