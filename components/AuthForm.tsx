"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "sonner";
import AuthSocialButton from "./AuthSocialButton";
import ButtonForm from "./ButtonForm";
import InputForm from "./InputForm";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  // hooks
  const session = useSession();
  const router = useRouter();

  // states
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // functions
  const toggleVariant = useCallback(() => {
    setVariant((current) => (current === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => {
          toast.error("Registration failed", {
            description: "Please try again later.",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((result) => {
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success("Login successful");
            router.push("/users");
          }
        })
        .catch(() => {
          toast.error("Login failed", {
            description: "Please check your credentials and try again.",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((result) => {
        if (result?.error) {
          toast.error("Invalid credentials");
        } else {
          toast.success("Logged in successfully");
        }
      })
      .catch((error) => {
        toast.error("Social login failed", {
          description: "Please try again later.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log("User is authenticated!");
      router.push("/users");
    }
  }, [session?.status]);

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {variant === "REGISTER" && (
            <InputForm
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <InputForm
            id="email"
            type="email"
            label="Email address"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <InputForm
            id="password"
            type="password"
            label="Password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <ButtonForm disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Sign up"}
            </ButtonForm>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <span>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </span>

          <span className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
