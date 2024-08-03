"use client"
import OrderDetailsCard from "@/components/card/OrderDetailsCard";
import Typography from "@/components/reusables/typography/Typography";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  
  const handleProfileClick = () => {
    // Handle the profile button click
    console.log("View profile clicked");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
 <div className="">
          <Typography variant="h2" size="lg">
            Order List
          </Typography>

          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li class="inline-flex items-center">
                <a
                  href="#"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    class="w-3 h-3 me-2.5"
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
                <div class="flex items-center">
                  <svg
                    class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Orders
                  </span>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Order details
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>


      <div className=" my-8 bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Order ID: #25421</h1>
          <span className="bg-red-500 text-white px-3 py-1 rounded-full">Cancelled</span>
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
          <span className="ml-2">Aug 16, 2024 - Sep 20, 2024</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <OrderDetailsCard
            title="Customer"
            content={
              <div>
                <p>Full Name: Agboola Fortune</p>
                <p>Email: agboolalajuice@gmail.com</p>
                <p>Phone: +234 9060 710 523</p>
              </div>
            }
            buttonLabel="View profile"
            onButtonClick={handleProfileClick}
          />
          <OrderDetailsCard
            title="Order Info"
            content={
              <div>
                <p>Shipping: Next express</p>
                <p>Payment method: Card</p>
                <p>Status: Cancelled</p>
              </div>
            }
            buttonLabel="View profile"
            onButtonClick={handleProfileClick}
          />
          <OrderDetailsCard
            title="Deliver to"
            content={
              <div>
                <p>Address: Egbeda, Lagos, NO 14, Onipade Street, Off Adededoja Block Industry.</p>
              </div>
            }
            buttonLabel="View profile"
            onButtonClick={handleProfileClick}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <OrderDetailsCard
            title="Payment Info"
            content={
              <div>
                <p>
                  <span className="inline-block mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-orange-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M18 6h-2.1c-.2 0-.4-.2-.4-.4v-1.6c0-.2-.2-.4-.4-.4H8.8c-.2 0-.4.2-.4.4v1.6c0 .2-.2.4-.4.4H6c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-10c0-.6-.4-1-1-1zm-7 10h-2v-1h2v1zm6 0h-5v-1h5v1zm0-3h-5v-1h5v1zm0-3h-5v-1h5v1zm-6-2h-2v-1h2v1zm6 0h-5v-1h5v1z"
                      />
                    </svg>
                  </span>
                  Master Card **** **** 6557
                </p>
                <p>Card Name: Agboola Fortune</p>
                <p>Phone: +234 9060 710 523</p>
              </div>
            }
            buttonLabel=""
            onButtonClick={handleProfileClick}
          />
          <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
            <h2 className="text-lg font-semibold">Note</h2>
            <input
              type="text"
              placeholder="Type some notes"
              className="w-full mt-2 p-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <select className="p-2 border rounded-lg">
            <option>Change Status</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <button className="bg-gray-200 p-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default page;
