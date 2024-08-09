// pages/checkout.js
"use client";
import HomeLayout from "@/components/layout/HomeLayout";
import { clearCart } from "@/store/reducers/cartReducer";
// import useLoggedInStatus from "@/hooks/useLoggedinStatus";
import { handleGenericError } from "@/utils/errorHandler";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
//   const isLoggedIn = useLoggedInStatus();
const [loading, setLoading] = useState(false)
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  const subtotal = calculateSubtotal();
  const vat = subtotal * 0.07;
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const serviceFee = 650; // Example service fee
    const vat = subtotal * 0.07; // Example VAT rate (7%)
    return subtotal + serviceFee + vat;
  };
  const handleCheckout = async (data) => {
    try {
  

      if ( data.firstName!== "") {
        // setLoading(true);

        await axios
          .post("/api/order", {...data, amount:calculateTotal() })

          .then((res) => {
            // setLoading(false);
            dispatch(clearCart())
            // handleShowCart()
            console.log(res);

            const paymentLink =
              res?.data?.paymentResponse?.data?.authorization_url;
            console.log(paymentLink);
            if (paymentLink) {
              window.location.href = paymentLink;

            }
          });
      } else {
        toast.error("Please add an address to proceed with checkout");
      }
      // Call Paystack API to initiate payment
    } catch (error) {
      const errMsg = handleGenericError(error);
      toast.error(errMsg, {
        position: "top-right",
        duration: 3000,
      });
    //   setLoading(false);
    //   handleShowCart()


      console.error("Error handling checkout:", error);
    }
  };
  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
                <form onSubmit={handleSubmit(handleCheckout)} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          {...register('firstName', { required: 'First Name is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="streetAddress">
          Street Address
        </label>
        <input
          type="text"
          id="streetAddress"
          {...register('streetAddress', { required: 'Street Address is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.streetAddress && <p className="text-red-600">{errors.streetAddress.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="apartment">
          Apartment, floor, etc. (optional)
        </label>
        <input
          type="text"
          id="apartment"
          {...register('apartment')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="townCity">
          Town/City
        </label>
        <input
          type="text"
          id="townCity"
          {...register('townCity', { required: 'Town/City is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.townCity && <p className="text-red-600">{errors.townCity.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          {...register('phoneNumber', { required: 'Phone Number is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email Address is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <input
          type="checkbox"
          id="saveInfo"
          {...register('saveInfo')}
          className="mr-2"
        />
        <label htmlFor="saveInfo" className="text-sm text-gray-700">
          Save this information for faster check-out next time
        </label>
      </div>

      <div className="mb-4">
        <input
          type="checkbox"
          id="shipToDifferentAddress"
          {...register('shipToDifferentAddress')}
          className="mr-2"
        />
        <label htmlFor="shipToDifferentAddress" className="text-sm text-gray-700">
          Ship to different address?
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="orderNotes">
          ORDER NOTES (OPTIONAL)
        </label>
        <textarea
          id="orderNotes"
          {...register('orderNotes')}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md">
       {loading ? "loading...": "Place Order"}  
      </button>
    </form>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Order</h2>
                <div className="border p-4 rounded-lg">
                  <div className="mb-4">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex justify-between">
                        <span>
                          {item.title} x {item.quantity}
                        </span>
                        <span>
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <div className="my-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₦{calculateSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee:</span>
                      <span>₦650.00 </span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT:</span>
                      <span>
                        ₦{(calculateSubtotal() * 0.07).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>₦{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Shipping
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your address to view shipping options"
                    />
                  </div>
                  <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="mr-2"
                      />
                      <img
                        src="/paystack.png"
                        alt="Paystack"
                        className="h-6 mr-2"
                      />
                      <span>Card</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="mr-2"
                      />
                      <span>Pay with bank transfer</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="mr-2"
                      />
                      <span>Cash on delivery</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <input
                      type="checkbox"
                      id="termsConditions"
                      className="mr-2"
                    />
                    <label
                      htmlFor="termsConditions"
                      className="text-sm text-gray-700"
                    >
                      I have read and agree to the website{" "}
                      <a href="#" className="text-blue-600">
                        terms and conditions
                      </a>
                    </label>
                  </div>
                  <button className="w-full bg-green-600 text-white p-2 rounded-md">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Checkout;
