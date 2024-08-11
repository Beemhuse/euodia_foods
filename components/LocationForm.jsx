"use client"
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { handleGenericError } from '@/utils/errorHandler';
import 'react-toastify/dist/ReactToastify.css';

export default function LocationForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true)
    try {
        const response = axios.post("/api/location", data)
        // if (response.status === 200) {
        // }
        toast.success("Location created", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        setLoading(false)
        reset()

    } catch (error) {
        const errMsg = handleGenericError(error)
        setLoading(false)

        toast.error(errMsg, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
        <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* {message && (
          <div className={`text-center ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.text}
          </div>
        )} */}
        <div>
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">Location Name</label>
          <input
            type="text"
            id="locationName"
            {...register('locationName', { required: 'Location name is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.locationName && <span className="text-red-500 text-sm">{errors.locationName.message}</span>}
        </div>
        <div>
          <label htmlFor="fee" className="block text-sm font-medium text-gray-700">Service Fee</label>
          <input
            type="number"
            id="fee"
            {...register('fee', { required: 'Service fee is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.fee && <span className="text-red-500 text-sm">{errors.fee.message}</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
