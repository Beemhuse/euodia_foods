"use client"
import React, { useState } from 'react';
import HomeLayout from '@/components/layout/HomeLayout';

const Cart = () => {
  const initialCartItems = [
    { id: 1, name: 'Jollof Rice', price: 20000, quantity: 1 },
    { id: 2, name: 'Fruit Salad', price: 10000, quantity: 1 },
    { id: 3, name: 'Village Rice', price: 5000, quantity: 1 },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <HomeLayout>
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2 flex items-center">
                    <img
                      src={`/images/${item.name.toLowerCase().replace(/ /g, '-')}.jpg`}
                      alt={item.name}
                      className="w-10 h-10 mr-2 object-cover"
                    />
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-right">₦{item.price.toLocaleString()}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        className="px-2 py-1 border rounded-l"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="px-2 py-1 border-t border-b">
                        {item.quantity.toString().padStart(2, '0')}
                      </span>
                      <button
                        className="px-2 py-1 border rounded-r"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <button className="border border-gray-300 px-4 py-2 rounded-md mb-4 md:mb-0">
            Return To Shop
          </button>
          <div className="border border-gray-300 p-4 rounded-md w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Cart Total</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₦{calculateSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>Enter your address to view shipping options.</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span>₦{calculateSubtotal().toLocaleString()}</span>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
              Process to checkout
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Cart;
