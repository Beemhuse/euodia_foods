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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(data)
    try {
      setLoading(true);
      const response = await axios.post('/api/login', { email, password });
      setLoading(false);
      setSuccess('Login successful');
      router.push('/');
    } catch (error) {
      const errMsg = handleGenericError(error);
      setError(errMsg);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 shadow-md flex flex-col gap-2 rounded-lg"
      >
        <h2 className="text-3xl text-center text-accent font-bold">Log in to Euodia</h2>
        <p className="text-center">Quick & Simple way to start making your orders</p>
        
        {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
        {/* {success && <p className="text-green-500 text-center">{success}</p>} */}
        
        <InputComponent
          label="Email"
          // name="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputComponent
          label="Password"
          // name="password"
          {...register("password")}
          error={errors.password?.message}
          type="password"
        />
        {/* <div className="mb-4 flex items-center justify-between w-full">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              className="form-checkbox"
            />
            <span className="ml-2">Remember me</span>
          </label>
          <p className="text-center">
            <a href="/auth/reset-password" className="text-green-500">
              forgot password?
            </a>
          </p>
        </div> */}
        <Button
          type="submit"
          title="Log in"
          color="accent"
          isLoading={loading}
        />
        <p className="text-center mt-2">
          don&apos;t have an account?{" "}
          <a href="/auth/signup" className="text-green-500">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
