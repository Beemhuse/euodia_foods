"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/utils/sanity/client";

export default function OrdersSummary() {
  const [orderData, setOrderData] = useState({
    totalOrdersAmount: 0,
    activeOrdersAmount: 0,
    shippedOrdersAmount: 0,
    rejectedOrdersAmount: 0,
    totalOrdersGrowth: 0,
    activeOrdersGrowth: 0,
    shippedOrdersGrowth: 0,
    rejectedOrdersGrowth: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const currentDate = new Date();
      const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const firstDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const previousMonthName = firstDayOfPreviousMonth.toLocaleString('default', { month: 'long' });
      const previousYear = firstDayOfPreviousMonth.getFullYear();

      const query = `*[_type == "order" && transactionDate >= $firstDayOfPreviousMonth]{
        status,
        total,
        transactionDate
      }`;

      const params = {
        firstDayOfPreviousMonth: firstDayOfPreviousMonth.toISOString(),
      };

      const results = await client.fetch(query, params);

      // Filter results by current and previous month
      const currentMonthOrders = results.filter(
        (order) => new Date(order.transactionDate) >= firstDayOfCurrentMonth
      );
      const previousMonthOrders = results.filter(
        (order) => new Date(order.transactionDate) < firstDayOfCurrentMonth
      );

      // Calculate totals for the current month
      const totalOrdersAmount = currentMonthOrders.reduce((sum, order) => sum + (order.total || 0), 0);
      const activeOrdersAmount = currentMonthOrders
        .filter(order => order.status === "processing")
        .reduce((sum, order) => sum + (order.total || 0), 0);
      const shippedOrdersAmount = currentMonthOrders
        .filter(order => order.status === "shipped")
        .reduce((sum, order) => sum + (order.total || 0), 0);
      const rejectedOrdersAmount = currentMonthOrders
        .filter(order => order.status === "rejected")
        .reduce((sum, order) => sum + (order.total || 0), 0);

      // Calculate totals for the previous month
      const previousTotalOrdersAmount = previousMonthOrders.reduce((sum, order) => sum + (order.total || 0), 0);
      const previousActiveOrdersAmount = previousMonthOrders
        .filter(order => order.status === "processing")
        .reduce((sum, order) => sum + (order.total || 0), 0);
      const previousShippedOrdersAmount = previousMonthOrders
        .filter(order => order.status === "shipped")
        .reduce((sum, order) => sum + (order.total || 0), 0);
      const previousRejectedOrdersAmount = previousMonthOrders
        .filter(order => order.status === "rejected")
        .reduce((sum, order) => sum + (order.total || 0), 0);

      // Calculate growth percentages
      const totalOrdersGrowth = calculateGrowth(totalOrdersAmount, previousTotalOrdersAmount);
      const activeOrdersGrowth = calculateGrowth(activeOrdersAmount, previousActiveOrdersAmount);
      const shippedOrdersGrowth = calculateGrowth(shippedOrdersAmount, previousShippedOrdersAmount);
      const rejectedOrdersGrowth = calculateGrowth(rejectedOrdersAmount, previousRejectedOrdersAmount);

      setOrderData({
        totalOrdersAmount,
        activeOrdersAmount,
        shippedOrdersAmount,
        rejectedOrdersAmount,
        totalOrdersGrowth,
        activeOrdersGrowth,
        shippedOrdersGrowth,
        rejectedOrdersGrowth,
        comparisonText: `Compared to ${previousMonthName} ${previousYear}`,
      });
    };

    fetchOrders();
  }, []);

  const calculateGrowth = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0; // Handle division by zero
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <OrderCard
        title="Total Orders"
        amount={orderData.totalOrdersAmount}
        comparisonText={orderData.comparisonText}
        growth={orderData.totalOrdersGrowth}
      />
      <OrderCard
        title="Active Orders"
        amount={orderData.activeOrdersAmount}
        comparisonText={orderData.comparisonText}
        growth={orderData.activeOrdersGrowth}
      />
      <OrderCard
        title="Shipped Orders"
        amount={orderData.shippedOrdersAmount}
        comparisonText={orderData.comparisonText}
        growth={orderData.shippedOrdersGrowth}
      />
      <OrderCard
        title="Rejected Orders"
        amount={orderData.rejectedOrdersAmount}
        comparisonText={orderData.comparisonText}
        growth={orderData.rejectedOrdersGrowth}
      />
    </div>
  );
}

function OrderCard({ title, amount, comparisonText, growth }) {
  const isGrowthPositive = growth >= 0;
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="font-bold text-lg">{title}</h2>
      <div className="flex items-center mt-4">
        <div className="p-3 bg-green-500 rounded-full text-white">
          {/* Replace with your preferred icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3v18h18V3H3zm18-2a2 2 0 012 2v18a2 2 0 01-2 2H3a2 2 0 01-2-2V3a2 2 0 012-2h18zM9 9h2v6H9V9zM13 9h2v6h-2V9z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="font-bold text-2xl">₦{amount.toLocaleString()}</h3>
          <p className="text-gray-500 mt-1">
            <span className={`mr-1 ${isGrowthPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isGrowthPositive ? `↑ ${growth.toFixed(1)}%` : `↓ ${growth.toFixed(1)}%`}
            </span>
            {comparisonText}
          </p>
        </div>
      </div>
    </div>
  );
}
