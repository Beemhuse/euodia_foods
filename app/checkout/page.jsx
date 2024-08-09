// pages/checkout.js
import HomeLayout from '@/components/layout/HomeLayout';
import React from 'react';

const Checkout = () => {
    return (
        <HomeLayout>


            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">First Name</label>
                                        <input type="text" id="firstName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="streetAddress">Street Address</label>
                                        <input type="text" id="streetAddress" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="apartment">Apartment, floor, etc. (optional)</label>
                                        <input type="text" id="apartment" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="townCity">Town/City</label>
                                        <input type="text" id="townCity" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="phoneNumber">Phone Number</label>
                                        <input type="text" id="phoneNumber" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
                                        <input type="email" id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                                    </div>
                                    <div className="mb-4">
                                        <input type="checkbox" id="saveInfo" className="mr-2" />
                                        <label htmlFor="saveInfo" className="text-sm text-gray-700">Save this information for faster check-out next time</label>
                                    </div>
                                    <div className="mb-4">
                                        <input type="checkbox" id="shipToDifferentAddress" className="mr-2" />
                                        <label htmlFor="shipToDifferentAddress" className="text-sm text-gray-700">Ship to different address?</label>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700" htmlFor="orderNotes">ORDER NOTES (OPTIONAL)</label>
                                        <textarea id="orderNotes" className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Your Order</h2>
                                <div className="border p-4 rounded-lg">
                                    <div className="mb-4">
                                        <div className="flex justify-between">
                                            <span>Jollof Rice x1</span>
                                            <span>₦20,000.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Fruit Salad x2</span>
                                            <span>₦20,000.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Village Rice x3</span>
                                            <span>₦15,000.00</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="my-4">
                                        <div className="flex justify-between">
                                            <span>Subtotal:</span>
                                            <span>₦55,000.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Service Fee:</span>
                                            <span>₦650.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>VAT:</span>
                                            <span>₦4,110.00</span>
                                        </div>
                                        <div className="flex justify-between font-bold">
                                            <span>Total:</span>
                                            <span>₦59,660.00</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="my-4">
                                        <label className="block text-sm font-medium text-gray-700">Shipping</label>
                                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your address to view shipping options" />
                                    </div>
                                    <div className="my-4">
                                        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                                        <div className="flex items-center mb-4">
                                            <input type="radio" name="paymentMethod" className="mr-2" />
                                            <img src="/paystack.png" alt="Paystack" className="h-6 mr-2" />
                                            <span>Card</span>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <input type="radio" name="paymentMethod" className="mr-2" />
                                            <span>Pay with bank transfer</span>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <input type="radio" name="paymentMethod" className="mr-2" />
                                            <span>Cash on delivery</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <input type="checkbox" id="termsConditions" className="mr-2" />
                                        <label htmlFor="termsConditions" className="text-sm text-gray-700">
                                            I have read and agree to the website <a href="#" className="text-blue-600">terms and conditions</a>
                                        </label>
                                    </div>
                                    <button className="w-full bg-green-600 text-white p-2 rounded-md">Place Order</button>
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
