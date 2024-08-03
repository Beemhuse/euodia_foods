import Image from "next/image";
import Table from "@/components/reusables/table/Table"


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
      meal: "jollof Rice",
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
    <div className="">
      <div className="grid grid-cols-3 gap-x-8">
        <div className="rounded-xl shadow-md bg-[#fff] p-5 py-10 ">
          <h2 className="font-[700] text-sm">Total Orders</h2>
          <p>#344,000</p>
        </div>
        <div className="rounded-xl shadow-md bg-[#fff] p-5 py-10 ">
          <h2 className="font-[700] text-sm">Total Orders</h2>
          <p>#344,000</p>
        </div>
        <div className="rounded-xl shadow-md bg-[#fff] p-5 py-10">
          <h2 className="font-[700] text-sm">Total Orders</h2>
          <p>#344,000</p>
        </div>
      </div>

      {/* Best sellers dish */}
      <div className=" p-4 bg-[#fff] mt-8 shadow-lg">
        <div className=" py-2 flex flex-col w-full items-start gap-y-8 p-4">
          <h2 className=" font-[700] text-lg border-0 border-b-2 py-4 w-full">Best Sellers Dishes</h2>
          <div className="w-full space-y-8">
            {data.map((meal) => (
              <div key={meal.id} className="flex justify-between items-center w-full">
                <div className="flex  items-center gap-2 border-b-1">
                  <Image
                    src={meal.img}
                    alt=""
                    width={80}
                    height={80}
                    className="rounded-2xl"
                  />
                  <div>

                  <h2 className="font-[700]">{meal.meal}</h2>
                  <p className="text-gray-500">{meal.total_sales} sales</p>
                  </div>
                </div>
                <div>
                  <h2 className="font-[700]">NGN{meal.total_amount}</h2>
                  <p className="text-gray-500">{meal.total_sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 shadow-lg bg-[#fff] my-8">
        <h2 className=" font-[700] text-lg border-0 border-b-2 py-4 w-full">Recent Orders</h2>
        <Table  columns={customer_column ?? []}
        data={[]}
        isGray={false}/>
      </div>
    </div>
  );
}
