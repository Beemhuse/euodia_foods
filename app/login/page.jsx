"use client"
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "@/components/reusables/input/InputComponent";
import { useForm } from "react-hook-form";


const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Log in to Euodia</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 shadow-md rounded-lg"
      >
        <InputComponent
          label="Email"
          name="email"
          {...register("email")}
          errors={errors.email.message}
          type="email"
        />
        <InputComponent
          label="Password"
          name="password"
          {...register("password")}
          errors={errors.password.email}
          type="password"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Log in
        </button>
        <p className="text-center mt-4">
          forgot password?{" "}
          <a href="/reset-password" className="text-green-500">
            Reset
          </a>
        </p>
        <p className="text-center mt-2">
          don&apos;t have an account?{" "}
          <a href="/signup" className="text-green-500">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
