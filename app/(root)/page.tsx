import AuthForm from "@/components/AuthForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src={"/images/logo.png"}
          alt="Logo"
          width={48}
          height={48}
          className="mx-auto w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <AuthForm />
    </div>
  );
}
