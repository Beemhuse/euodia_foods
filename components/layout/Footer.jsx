"use client"
import { FiArrowRight } from 'react-icons/fi';
import { useState } from 'react';

export default function Footer() {
  // const [email, setEmail] = useState('');
  // const [showPopup, setShowPopup] = useState(false);

  // const handleSubscribe = () => {
  //   if (email) {
  //     setShowPopup(true);
  //     setEmail('');
  //     setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
  //   }
  // };

  return (
    <footer className="bg-white py-10 border-t mt-auto relative">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold">
              Join Our <span className="text-green-600">Newsletter</span>
            </h2>
            <p className="text-gray-600">
              Be the first to know about our latest updates, exclusive offers, and more.
            </p>
          </div>
          <div className="flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-green-600"
            />
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700"
            >
              Subscribe
            </button>
          </div>
        </div> */}

        <hr className="mb-8" />

        {/* Consolidated Footer Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4 text-lg">Support</h3>
            <ul className="text-gray-600 space-y-3">
              <li className="flex items-center">
                Customer Support <FiArrowRight className="ml-2" />
              </li>
              <li className="flex items-center">
                Email Support <FiArrowRight className="ml-2" />
              </li>
              <li className="flex items-center">
                Delivery Details <FiArrowRight className="ml-2" />
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="text-gray-600 space-y-3">
              <li className="flex items-center">
                Contact <FiArrowRight className="ml-2" />
              </li>
              <li className="flex items-center">
                About Us <FiArrowRight className="ml-2" />
              </li>
              <li className="flex items-center">
                Services <FiArrowRight className="ml-2" />
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-lg">Legal</h3>
            <ul className="text-gray-600 space-y-3">
              <li className="flex items-center">
                Privacy Policy <FiArrowRight className="ml-2" />
              </li>
              <li className="flex items-center">
                Terms of Use <FiArrowRight className="ml-2" />
              </li>
              <li className="flex items-center">
                Refund Policy <FiArrowRight className="ml-2" />
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 text-gray-600">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Refund Policy</a>
          </div>
          <p className="text-gray-600 mt-4 md:mt-0">
            © 2024 All Rights Reserved. Euodia Whole Foods
          </p>
        </div>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg">
          Thank you for subscribing!
        </div>
      )}
    </footer>
  );
}
