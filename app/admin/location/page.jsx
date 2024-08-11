"use client";
import { useState, useEffect } from "react";
import { client } from "@/utils/sanity/client";
import Typography from "@/components/reusables/typography/Typography";
import ServiceFeeForm from "@/components/ServiceFeeForm";
import { toast } from "react-toastify";
import { getCookie } from "@/utils/getCookie";


export default function LocationsPage() {
    const adminToken = getCookie("admineu_token");

  const [serviceFees, setServiceFees] = useState([]);
  const [selectedServiceFee, setSelectedServiceFee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchServiceFees() {
      const query = `*[_type == "serviceFee"]`;
      const fetchedServiceFees = await client.fetch(query);
      setServiceFees(fetchedServiceFees);
    }

    fetchServiceFees();
  }, []);

  const handleEditServiceFee = (serviceFee) => {
    setSelectedServiceFee(serviceFee);
    setShowForm(true);
  };

  const handleDeleteServiceFee = async (id) => {
    if (confirm("Are you sure you want to delete this service fee?")) {
      await fetch(`/api/admin/servicefee/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`, // Include your token here
        },
      });
      toast.success("Deleted Successfully");
      setServiceFees(serviceFees.filter((fee) => fee._id !== id));
    }
  };
  const handleFormClose = () => {
    setSelectedServiceFee(null);
    setShowForm(false);
  };
  const handleFormSuccess = (updatedServiceFee) => {
    if (selectedServiceFee) {
      setServiceFees(
        serviceFees.map((fee) =>
          fee._id === updatedServiceFee._id ? updatedServiceFee : fee
        )
      );
    } else {
      setServiceFees([...serviceFees, updatedServiceFee]);
    }
    handleFormClose();
  };

  console.log(serviceFees);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h2" size="lg">
            Service Fees
          </Typography>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setShowForm(true)}
          >
            Add New Service fee
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="px-6 py-3 text-left font-semibold">
                Location Name
              </th>
              <th className="px-6 py-3 text-left font-semibold">Fee</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {serviceFees?.map((service) => (
              <tr
                key={service._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-6 py-3">{service.location}</td>
                <td className="px-6 py-3">{service.fee}</td>
                <td className="px-6 py-3 flex items-center gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditServiceFee(service)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteServiceFee(service._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="bg-white p-4 border-l border-gray-300">
          <ServiceFeeForm
            serviceFee={selectedServiceFee}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        </div>
      )}
    </div>
  );
}
