import { FiArrowRight } from 'react-icons/fi';

export default function Footer  ()  {
  return (
    <footer className="bg-white py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
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
              placeholder="Enter your email address"
              className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-green-600"
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700">
              Subscribe
            </button>
          </div>
        </div>
        <hr className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Help</h3>
            <ul className="text-gray-600">
              <li className="mb-2 flex items-center">
                Customer Support <FiArrowRight className="ml-2" />
              </li>
              <li className="mb-2 flex items-center">
                Email Support <FiArrowRight className="ml-2" />
              </li>
              <li className="mb-2 flex items-center">
                Delivery Details <FiArrowRight className="ml-2" />
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <ul className="text-gray-600">
              <li className="mb-2">Contact</li>
              <li className="mb-2">Service</li>
            </ul>
          </div>
          <div className="md:col-span-1 flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:underline">Privacy</a>
              <a href="#" className="text-gray-600 hover:underline">Terms of use</a>
              <a href="#" className="text-gray-600 hover:underline">Refund Policy</a>
            </div>
            <p className="text-gray-600 mt-4 md:mt-0">
              © 2024 All Rights Reserved. Euodia Whole Foods
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

