import React, {  useEffect, useState } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '../../lib/utils';
import axios from 'axios';


const Success = () => {
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(null);

    
  const urlSearchParams = new URLSearchParams(window.location.search);
  const trxref = urlSearchParams.get("trxref");
  
  useEffect(() => {
    localStorage.clear();
    if(paymentStatus === 200){

      runFireworks();
    }
  }, []);

  useEffect(() => {
    // Fetch verification result from the backend
    if (trxref) {
      const fetchVerificationResult = async () => {
        try {
          setLoading(true);

          const response = await axios.get(`/api/verify?trxref=${trxref}`);
          setPaymentStatus(response?.data?.status);
          console.log(response);
        } catch (error) {
          console.error("Error verifying payment:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchVerificationResult();
    }
  }, [trxref]);
  
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:gadgetcartel@gmail.com">
            gadgetcartel@gmail.com
          </a>
        </p>
        <Link href="/orders">
          <button type="button" width="300px" className="btn capitalize">
            See your orders
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success