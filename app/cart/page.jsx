"use client"
import React from 'react';
import HomeLayout from '@/components/layout/HomeLayout';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { decrementQuantity, incrementQuantity, removeCartItem } from '@/store/reducers/cartReducer';
import useCurrencyFormatter from '@/hooks/useCurrencyFormatter';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const formatCurrency = useCurrencyFormatter();

  const handleQuantityChange = (id, delta) => {
    if (delta > 0) {
      dispatch(incrementQuantity({ id }));
    } else if (delta < 0) {
      dispatch(decrementQuantity({ id }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeCartItem({ product: { _id: id } }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <HomeLayout>
      <div className="container mx-auto p-4">
        {cartItems.length === 0 ? (
          <div className="text-center mt-8">
            <h2 className="text-xl font-semibold mb-6">Your cart is empty</h2>
            <Link href="/menu">
              <button className="mt-4 border border-gray-300 px-4 py-2 rounded-md">
                Return To Shop
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-right">Price</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                    <th className="px-4 py-2 text-right">Subtotal</th>
                    <th className="px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-t">
                      <td className="px-4 py-2 flex items-center">
                        <Image
                          src={item.image.asset.url}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="w-10 h-10 mr-2 object-cover"
                        />
                        {item.name}
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex items-center justify-center">
                          <button
                            className="px-2 py-1 border rounded-l"
                            onClick={() => handleQuantityChange(item._id, -1)}
                          >
                            -
                          </button>
                          <span className="px-2 py-1 border-t border-b">
                            {item.quantity.toString().padStart(2, '0')}
                          </span>
                          <button
                            className="px-2 py-1 border rounded-r"
                            onClick={() => handleQuantityChange(item._id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
              <Link href="/menu">
                <button className="border border-gray-300 px-4 py-2 rounded-md mb-4 md:mb-0">
                  Return To Shop
                </button>
              </Link>
              <div className="border border-gray-300 p-4 rounded-md w-full md:w-1/3">
                <h2 className="text-lg font-bold mb-4">Cart Total</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>Enter your address to view shipping options.</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Total:</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <Link href="/checkout">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
                    Proceed to checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </HomeLayout>
  );
};

export default Cart;
