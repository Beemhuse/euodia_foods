"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import OrderDetailsCard from "@/components/card/OrderDetailsCard";
import Typography from "@/components/reusables/typography/Typography";
import { client } from "@/utils/sanity/client";

// Status options list
const statusOptions = [
  { title: "Pending", value: "pending" },
  { title: "Processing", value: "processing" },
  { title: "Shipped", value: "shipped" },
  { title: "Delivered", value: "delivered" },
  { title: "Cancelled", value: "cancelled" },
];
export default function page() {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);
const transactionRef = order && order?.transactionRef;
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return;

      const query = `*[_type == "order" && orderId == $id][0]{
        _id,
        orderId,
        total,
        status,
        transactionDate,
        transactionRef,
        customer->{
          _id,
          name,
          email,
        totalSpent,
        orderCount,
          orders[]->{
            _id,
            orderId,
            transactionDate,
            total
          },
          transactions[]->{
            _id,
            transactionRef,
            amount,
            date
          }
        },
          phone,
          streetAddress,
          apartment,
          townCity,
        products[]->{
          _id,
          title,
          price
        },
        name,
        streetAddress,
        apartment,
        townCity,
        phone,
        email,
        serviceFee->{
          _id,
          fee
        },
        notes
      }`;

      const result = await client.fetch(query, { id });
      setOrder(result);
      setSelectedStatus(result.status); // Set initial status
      // Fetch the transaction details separately
      const transactionQuery = `*[_type == "transaction" && transactionRef == $transactionRef][0]{
  _id,
  transactionRef,
  amount,
  transactionDate,
  method,
}`;

      const transactionResult = await client.fetch(transactionQuery, {transactionRef});

      setTransaction(transactionResult);
    };
    fetchOrderDetails();
  }, [id, order?.status]);

  const handleProfileClick = () => {
    // Handle the profile button click
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSaveStatus = async () => {
    if (!selectedStatus) return;
    setLoading(true);
    try {
      await client.patch(order._id).set({ status: selectedStatus }).commit();
      setLoading(false);

      alert("Order status updated successfully!");
    } catch (error) {
      setLoading(false);

      console.error("Failed to update order status:", error);
      alert("Failed to update order status.");
    }
  };
  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="">
        <Typography variant="h2" size="lg">
          Order List
        </Typography>

        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  Orders
                </span>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  Order details
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="my-8 bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Order ID: #{order.orderId}</h1>
          <span
            className={`bg-${order.status === "cancelled" ? "red" : (order.status == "pending"? "blue": "green")}-500 text-white px-3 py-1 rounded-full`}
          >
            {order.status}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-4 10v4m4-6H8m0 0l-3 3m3-3l3 3m-6 6h6m0 0l-3 3m3-3l-3-3"
            />
          </svg>
          <span className="ml-2">
            {new Date(order.transactionDate).toLocaleDateString()}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <OrderDetailsCard
            title="Customer"
            content={
              <div>
                <p>Full Name: {order.customer?.name}</p>
                <p>Email: {order.email}</p>
                <p>Phone: {order.phone}</p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="">
                    <p>Total orders made</p>
                    <p className="border rounded-xl border-green-500 p-4">
                      {" "}
                      {order?.customer?.orderCount}
                    </p>
                  </div>
                  <div className="">
                    <p>Total amount spent</p>
                    <p className="border rounded-xl border-green-500 p-4">
                      {" "}
                      {order?.customer?.totalSpent}
                    </p>
                  </div>
                </div>
              </div>
            }
          />
          <OrderDetailsCard
            title="Order Info"
            content={
              <div>
                <p>Shipping Fee: {order.serviceFee?.fee}</p>
                <p>Order Id: {order.transactionRef}</p>
                <p >Order Status: <span style={{
                  color: order.status == "pending"? "red":"blue"
                }} className={`${order.status == "pending"? "text-red-500":"text-blue-500"}`}>{order.status}</span> </p>
              </div>
            }
            buttonLabel="View profile"
            onButtonClick={handleProfileClick}
          />
          <OrderDetailsCard
            title="Deliver to"
            content={
              <div>
                <p>
                  Address: {order.streetAddress}, {order.apartment},{" "}
                  {order.townCity}
                </p>
              </div>
            }
            buttonLabel="View profile"
            onButtonClick={handleProfileClick}
          />
           <div className=" mb-4">
        <OrderDetailsCard
          title="Payment Info"
          content={
            <div>
              <p>Method: {transaction?.method}</p>
              <p>Transaction Reference: {transaction?.transactionRef}</p>
              <p>Amount: ₦{transaction?.amount?.toLocaleString()}</p>
              <p>Date: {new Date(transaction?.transactionDate).toLocaleDateString()}</p>
            </div>
          }
          buttonLabel=""
          onButtonClick={handleProfileClick}
        />
         
        </div>
        </div>
       
        <div className="flex items-end justify-center flex-col gap-4 w-full">
          <h2>Update the order status</h2>
<div className=" flex items-center gap-4">

          <select
            className="p-2 border rounded-lg"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.title}
              </option>
            ))}
          </select>
        
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSaveStatus}
          >
            {loading ? "loading" : "Save"}
          </button>
</div>
        </div>
      </div>
    </div>
  );
}
