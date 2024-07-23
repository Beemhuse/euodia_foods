"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "@/components/reusables/input/InputComponent";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  console.log(process.env.NEXT_PUBLIC_SANITY_TOKEN)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const {name, email, password } = data;
    try {
      setLoading(true);
      const response = await axios.post('/api/signup', {name, email, password });
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
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Sign up to Euodia</h2>
      <p className="text-center mb-6">
        Quick & Simple way to start making your orders
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 shadow-md rounded-lg"
      >
        <InputComponent
          label="Name"
          register={register}
          errors={errors}
          name="name"
          error={errors.name?.message}

        />
        <InputComponent
          label="Email"
          name="email"
          register={register}
          type="email"
          error={errors.email?.message}

        />
        <InputComponent
          label="Password"
          register={register}
          name="password"
          type="password"
          error={errors.password?.message}

        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="terms"
              // {...register("terms")}
              className="form-checkbox"
            />
            <span className="ml-2">
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>
          {/* {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>} */}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Create an account
        </button>
        <p className="text-center mt-4">
          already have an account?{" "}
          <a href="/auth/login" className="text-green-500">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
