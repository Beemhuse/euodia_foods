import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputComponent from "@/components/reusables/input/InputComponent";
import Button from "@/components/reusables/buttons/Button";
import { getCookie } from "@/utils/getCookie";
import { toast } from "react-toastify";

const categorySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const CreateCategoryModal = ({ isOpen, onClose, categories }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(categorySchema),
  });
  const adminToken = getCookie("admineu_token");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await fetch('/api/admin/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`, // Include your token here
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Category created successfully")
        reset(); // Reset the form after successful submission
        onClose(); // Close the modal
      } else {
        const errorData = await response.json();
        console.error("Failed to create category:", errorData);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-2xl w-full p-6 relative z-50">
          <h2 className="text-xl font-bold mb-4">Create a New Category</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputComponent
              label="Title"
              name="title"
              error={errors.title?.message}
              register={register}
            />
            <InputComponent
              label="Description"
              name="description"
              error={errors.description?.message}
              register={register}
            />
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



// export async function getServerSideProps() {
//     try {
//       const query = `*[_type == "category"]`;
//       const categories = await client.fetch(query);
//       console.log(categories)
      
//       return {
//         props: { categories },
//       };
//     } catch (error) {
//       return {
//         props: { error: error.message },
//       };
//     }
//   }
export default CreateCategoryModal;
