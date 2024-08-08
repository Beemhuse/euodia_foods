import React from 'react';
import Table from "@/components/reusables/table/Table";

export default function Page() {
  const customerColumn = [
    {
      title: "S/N",
      key: "sn",
      render: (data, index) => <span>{index + 1}</span>,
    },
    {
      title: "Product",
      key: "product",
      render: (data) => <span>{data.product}</span>,
    },
    {
      title: "Order ID",
      key: "order_id",
      render: (data) => <span>{data.order_id}</span>,
    },
    {
      title: "Date",
      key: "date",
      render: (data) => <span>{data.date ?? "Not Available"}</span>,
    },
    {
      title: "Customer Name",
      key: "customer_name",
      render: (data) => <span>{data.name ?? "Not Available"}</span>,
    },
    {
      title: "Status",
      key: "status",
      render: (data) => {
        const status = data?.status?.toLowerCase();
        const statusStyles = {
          delivered: { background: "#4BB543", color: "white" },
          canceled: { background: "#FF9494", color: "white" },
          pending: { background: "#F7CB73", color: "black" },
        };
        const style = statusStyles[status] || {};
        return (
          <span style={style} className={`py-2 px-4 rounded-full border ${status && `bg-${style.background}/30 border-${style.background} text-${style.color}`}`}>
            {data?.status}
          </span>
        );
      },
    },
    {
      title: "Amount",
      key: "amount",
      render: (data) => <span>{data.amount ?? "Not Available"}</span>,
    },
  ];

  return (
    <section className="p-4 my-6 ">
      <div className="shadow-lg p-2">
        <h2 className="font-bold text-lg border-b-2 py-4 px-2 mb-3 ">Recent Orders</h2>
        <Table columns={customerColumn} data={[]} isGray={false} />
      </div>
    </section>
  );
}
