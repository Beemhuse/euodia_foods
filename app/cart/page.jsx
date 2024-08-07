"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Cart = ({ initialCartItems }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, delta) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2 flex items-center">
                  <img src={item.image} alt={item.name} className="w-10 h-10 mr-2" />
                  {item.name}
                </td>
                <td className="px-4 py-2">₦{item.price.toLocaleString()}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 border border-gray-300"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b border-gray-300">
                      {item.quantity.toString().padStart(2, '0')}
                    </span>
                    <button
                      className="px-2 py-1 border border-gray-300"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2">₦{(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-start">
        <Link href="/shop">
          <a className="border border-gray-300 px-4 py-2">Return To Shop</a>
        </Link>
        <div className="border border-gray-300 p-4">
          <h2 className="text-lg font-bold">Cart Total</h2>
          <div className="flex justify-between mt-2">
            <span>Subtotal:</span>
            <span>₦{calculateSubtotal().toLocaleString()}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Shipping:</span>
            <span>Enter your address to view shipping options.</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Total:</span>
            <span>₦{calculateSubtotal().toLocaleString()}</span>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 mt-4 w-full">Process to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
