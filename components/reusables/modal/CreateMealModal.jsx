import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "@/components/reusables/input/InputComponent";
import SelectComponent from "@/components/reusables/input/SelectComponent";
import Button from "@/components/reusables/buttons/Button";
import { getCookie } from "@/utils/getCookie";

const mealSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive("Price must be a positive number"),
  category: yup.string().required("Category is required"),
  status: yup.string().required("Status is required"),
});

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "unavailable", label: "Unavailable" },
];

const categoryOptions = [
  { value: "cat1", label: "Category 1" },
  { value: "cat2", label: "Category 2" },
];

const CreateMealModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(mealSchema),
  });

  const adminToken = getCookie("admineu_token");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("status", data.status);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await fetch('/api/admin/create-meal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`, // Include your token here
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Meal created successfully:", result);
        reset(); // Reset the form after successful submission
        setSelectedImage(null); // Clear the selected image
        onClose(); // Close the modal
      } else {
        const errorData = await response.json();
        console.error("Failed to create meal:", errorData);
      }
    } catch (error) {
      console.error("Error creating meal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-2xl w-full p-6 relative z-50">
          <h2 className="text-xl font-bold mb-4">Create a New Meal</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-x-6 w-full">
              <div className="w-full">
                <InputComponent
                  label="Title"
                  name="title"
                  error={errors.title?.message}
                  register={register}
                />
              </div>
              <div className="w-full">
                <InputComponent
                  label="Description"
                  name="description"
                  error={errors.description?.message}
                  register={register}
                />
              </div>
            </div>

            <InputComponent
              label="Price"
              type="number"
              name="price"
              error={errors.price?.message}
              register={register}
            />
            <SelectComponent
              label="Category"
              name="category"
              options={categoryOptions}
              error={errors.category?.message}
              register={register}
            />
            <SelectComponent
              label="Status"
              options={statusOptions}
              name="status"
              error={errors.status?.message}
              register={register}
            />
            <div className="grid">
              <p className="font-medium text-sm">Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full py-1 px-3 outline-none bg-inherit rounded-md border border-accent text-base"
              />
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="mt-2 h-32 w-32 object-cover rounded-md"
                />
              )}
            </div>
            <div className="relative z-999999">
              <Button
                type="submit"
                title="Submit"
                color="accent"
                isLoading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMealModal;
