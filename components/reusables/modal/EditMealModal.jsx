import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "@/components/reusables/input/InputComponent";
import SelectComponent from "@/components/reusables/input/SelectComponent";
import Button from "@/components/reusables/buttons/Button";
import { client } from "@/utils/sanity/client";
import { uploadImageToSanity } from "@/utils/sanity/uploadImageToSanity";
import { mutate } from "swr";

const mealSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive("Price must be a positive number"),
  status: yup.string().required("Status is required"),
});

const statusOptions = [
  { value: "true", label: "Available" },
  { value: "false", label: "Unavailable" },
];

const EditMealModal = ({ isOpen, onClose, meal }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(mealSchema),
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (meal) {
      setValue("title", meal.title);
      setValue("description", meal.description);
      setValue("price", meal.price);
      setValue("status", meal.status ? "true" : "false");
      setSelectedImage(meal.image?.asset?.url || null);
    }
  }, [meal, setValue]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let imageAssetId = meal.image?.asset?._ref;
      
      // Only upload a new image if the user selected a new one
      if (selectedImage && typeof selectedImage !== 'string') {
        imageAssetId = await uploadImageToSanity(selectedImage);
      }

      const updatedMeal = {
        _type: 'dish', // Make sure this matches the type in your schema
        title: data.title,
        description: data.description,
        price: data.price,
        status: data.status === "true",
        // Only include image if it exists (either new or existing one)
        ...(imageAssetId && {
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAssetId,
            },
          },
        }),
      };

      await client.patch(meal._id).set(updatedMeal).commit();
      
      // Trigger re-fetch or update data after mutation
    //   if (mutate) {
    // }
    mutate(`*[_type == "dish" && status == true && !(_id in path("drafts.*"))]`); // Re-fetch or re-render in the parent component

      reset(); // Reset the form after successful submission
      setSelectedImage(null); // Clear the selected image
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error editing meal:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-2xl w-full p-6 relative z-50">
          <h2 className="text-xl font-bold mb-4">Edit Meal</h2>
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
                className="w-full py-1 px-3 outline-none bg-inherit rounded-md border border-accent text-sm"
              />
              {selectedImage && (
                <img
                  src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="mt-2 h-32 w-32 object-cover rounded-md"
                />
              )}
            </div>

            <div className="relative z-999999">
              <Button
                type="submit"
                title="Save Changes"
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

export default EditMealModal;
