import Image from "next/image";
import Table from "@/components/reusables/table/Table";

export const customer_column = [
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
    render: (data) => <span>{data.date ?? "Not Available"}</span>,
  },
  { title: "Customer Name", key: "customer_name", render: (data) => <span>{data.name ?? "Not Available"}</span> },
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
  { title: "Amount", key: "amount", render: (data) => <span>{data.amount ?? "Not Available"}</span> },
];

export default function Dashboard() {
  const data = [
    {
      id: 1,
      total_amount: "200000",
      img: "/meal.png",
      meal: "Village Rice",
      total_sales: "999",
    },
    {
      id: 2,
      total_amount: "500000",
      meal: "Jollof Rice",
      img: "/meal.png",
      total_sales: "1200",
    },
    {
      id: 3,
      total_amount: "100000",
      meal: "Afang Soup",
      img: "/meal.png",
      total_sales: "533",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Total Orders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['Total Orders', 'Total Orders', 'Total Orders'].map((title, index) => (
          <div key={index} className="rounded-xl shadow-md bg-white p-5 py-10">
            <h2 className="font-bold text-sm">{title}</h2>
            <p>#344,000</p>
          </div>
        ))}
      </div>

      {/* Best Sellers Dishes */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="font-bold text-lg border-b-2 pb-4 mb-4">Best Sellers Dishes</h2>
        <div className="space-y-8">
          {data.map((meal) => (
            <div key={meal.id} className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-4">
                <Image src={meal.img} alt={meal.meal} width={80} height={80} className="rounded-2xl" />
                <div>
                  <h2 className="font-bold">{meal.meal}</h2>
                  <p className="text-gray-500">{meal.total_sales} sales</p>
                </div>
              </div>
              <div className="text-right">
                <h2 className="font-bold">NGN{meal.total_amount}</h2>
                <p className="text-gray-500">{meal.total_sales} sales</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="font-bold text-lg border-b-2 pb-4 mb-4">Recent Orders</h2>
        <Table columns={customer_column} data={[]} isGray={false} />
      </div>
    </div>
  );
}
