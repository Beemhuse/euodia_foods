"use client"
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "@/components/reusables/input/InputComponent";
import { useForm } from "react-hook-form";
import Button from "@/components/reusables/buttons/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleGenericError } from "@/utils/errorHandler";
import useCookies from "@/hooks/useCookies";
import { toast } from "react-toastify";
import Link from "next/link";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { setCookie } = useCookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setLoading(true);
      const response = await axios.post('/api/admin/login', { email, password });
      if (response) {
        setCookie("admineu_token", response?.data?.token)
      }

      setLoading(false);
      // setSuccess('Login successful');
      toast.success("Welcome back Admin", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push('/admin');
      // window.location.reload()
    } catch (error) {
      const errMsg = handleGenericError(error);
      toast.error(errMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setError(errMsg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  p-15 shadow-md p-10 flex flex-col gap-4 rounded-lg"
      >
        <h2 className="text-3xl text-center text-accent font-bold"> Log in to Your dashboard</h2>
        <p className="text-center text-gray-700">Welcome back Admin</p>


        <InputComponent
          label="Email"
          placeholder="johndoe@gmail.com"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <InputComponent
          label="Password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password?.message}
          type="password"
        />
        <Button
          type="submit"
          title="Log in"
          color="accent"
          isLoading={loading}
        />
        <p className="text-center mt-2">
          don&apos;t have an account?{" "}
          <Link href="/auth/admin/register" className="text-green-500">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
