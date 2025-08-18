import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
        <p className="text-gray-600">
          Welcome back! Please enter your details.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
