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
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Reset Password</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 shadow-md rounded-lg"
      >
        <InputComponent
          label="Email"
          name="email"
          {...register("email")}
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
          remember your password?{" "}
          <a href="/login" className="text-green-500">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
