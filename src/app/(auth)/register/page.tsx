import RegisterForm from "./_components/RegisterForm";

export default function RegisterPage() {
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
      <RegisterForm />
    </div>
  );
}
