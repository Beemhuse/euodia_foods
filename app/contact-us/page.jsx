"use client"
import HomeLayout from '@/components/layout/HomeLayout';
import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage('Thank you for contacting us!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setResponseMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <HomeLayout>

    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-4 text-green-600">Call To Us</h3>
              <p className="mb-4">We are available 24/7, 7 days a week.</p>
              <p className="mb-4 text-gray-700 font-medium">Phone: +234 703 335 6847</p>
              <hr className="my-6 border-gray-200" />
              <h3 className="text-2xl font-bold mb-4 text-green-600">Write To Us</h3>
              <p className="mb-4">Fill out our form and we will contact you within 24 hours.</p>
              <p className="mb-2 text-gray-700 font-medium">Email: euodiawholefoods.dish@gmail.com</p>
            </div>
          </div>
          {/* Contact Form */}
          <div className="w-full lg:w-2/3 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>  
                <div className="flex flex-wrap -mx-2 mb-4">
                  <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                    <input 
                      type="text" 
                      placeholder="Your Name *" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                    <input 
                      type="email" 
                      placeholder="Your Email *" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                    <input 
                      type="tel" 
                      placeholder="Your Phone *" 
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <textarea 
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
                <div className="text-right">
                  <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out">
                  {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </HomeLayout>
  );
};

export default ContactUs;
