"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import axios from 'axios';
import { runFireworks } from '@/utils/lib/utils';

const Success = () => {
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const trxref = urlSearchParams.get("trxref");

    useEffect(() => {
        if (paymentStatus === 200) {
            runFireworks();
        }
    }, [paymentStatus]);

    useEffect(() => {
        if (trxref) {
            const fetchVerificationResult = async () => {
                try {
                    const response = await axios.get(`/api/verify?trxref=${trxref}`);
                    setPaymentStatus(response?.data?.status);
                } catch (error) {
                    console.error("Error verifying payment:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchVerificationResult();
        } else {
            setLoading(false);
        }
    }, [trxref]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z"></path>
                    </svg>
                    <p className="mt-4 text-lg text-gray-700">Verifying your payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <p className="text-green-600 text-4xl mb-4">
                    <BsBagCheckFill />
                </p>
                <h2 className="text-2xl font-semibold mb-4">Thank you for your order!</h2>
                <p className="text-gray-600 mb-4">Check your email inbox for the receipt.</p>
                <p className="text-gray-600 mb-6">
                    If you have any questions, please email{' '}
                    {/* <a className="text-blue-500" href="mailto:gadgetcartel@gmail.com">
                    
                    </a> */}
                </p>
                <Link href="/orders">
                    <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                        See your orders
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Success;
