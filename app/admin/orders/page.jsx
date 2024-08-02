import React from 'react'
import Table from "@/components/reusables/table/Table"


export default function page() {

 const customer_column = [
    
        {
          title: "S/N",
          key: "sn",
          render: (data, index) => <span>{index + 1}</span>,
        },
        { title: "Product", key: "product", render: (data) => <span>{data.product}</span> },
        {
          title: "Order ID",
          key: "order_id",
          render: (data) => <span>{data.order_id}</span>,
        },
        {
          title: "Date",
          key: "date",
          render: (data) => <span> {data.date ?? "Not Available"} </span>,
        },
        { title: "Customer Name", key: "customer_name", render: (data) => <span>{data.name ?? "Not Available"}</span> },
        {
          title: "Status",
          key: "status",
          render: (data) => (
            <span>
              {data?.status?.toLowerCase() === "delivered" && (
                <span style={{background:"#4BB543", color: "white"}} className={`py-2 px-4 rounded-full border bg-[#4BB543]/30 border-[#4BB543] text-[#4BB543]`}>
                  {data?.status}
                </span>
              )}
              {data?.status?.toLowerCase() === "canceled" && (
                <span style={{background:"#FF9494", color: "white"}} className={`py-2 px-4 rounded-full border bg-red/30 border-[#FF9494] text-[#FF9494]`}>
                  {data.status}
                </span>
              )}
              {data?.status?.toLowerCase() === "pending" && (
                <span className={`py-2 px-4 rounded-full border bg-[#F7CB73]/20 border-[#F7CB73] text-[#F7CB73]`}>
                  {data?.status}
                </span>
              )}
            </span>
          )
          
        },
        { title: "Amount", key: "amount", render: (data) => <span>{data.amount ?? "Not Available"}</span> },
      
      ];
      
    return (
    <section>

<div className="p-4 shadow-lg my-6">
        <h2 className=" font-[700] text-lg border-0 border-b-2 py-4 w-full">Recent Orders</h2>
        <Table  columns={customer_column ?? []}
        data={[]}
        isGray={false}/>
      </div>
    </section>
  )
}
