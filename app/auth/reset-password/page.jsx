"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "@/components/reusables/input/InputComponent";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 shadow-md flex flex-col gap-4 rounded-lg max-w-md mx-auto"
      >
        <h2 className="text-3xl text-center text-accent font-bold">Reset Password</h2>
        <p className="text-center text-gray-700 mb-4">Enter your email to reset your password</p>

        <InputComponent
          label="Email"
          name="email"
          register={register}
          error={errors?.email?.message}
          type="email"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Reset Password
        </button>
        <p className="text-center mt-4">
          Remember your password?{" "}
          <a href="/login" className="text-green-500">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
