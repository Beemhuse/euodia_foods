"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdDashboard, MdOutlineLocationOn, MdOutlineShoppingBag } from "react-icons/md";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import Link from "next/link";

const sideData = [
  {
    icon: <MdDashboard />,
    title: "Dashboard",
    link: "/admin",
  },
  {
    icon: <BsFileEarmarkTextFill />,
    title: "Order list",
    link: "/admin/orders",
  },
  {
    icon: <MdOutlineShoppingBag />,
    title: "All Products",
    link: "/admin/products",
  },
  {
    icon: <MdOutlineShoppingBag />,
    title: "Category",
    link: "/admin/category",
  },
  {
    icon: <MdOutlineLocationOn />,
    title: "Location",
    link: "/admin/location",
  },
];

export default function SideNav({ ...props }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as per your design
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <menu
      {...props}
      className={`flex flex-col h-full dark:bg-black dark:text-white p-2 mt-6 flex-none transition-all duration-300 ${
        isExpanded ? "w-80" : "w-20"
      }`}
    >
      <nav className="flex-grow flex flex-col mt-[5rem] gap-y-8">
        {sideData.map((item, idx) => {
          const isActive = pathname === item.link;
          return (
            <Link key={idx} href={item.link}>
              <div
                className={`relative mt-10 cursor-pointer w-full text-sm dark:text-white space-x-1 py-4 flex items-center gap-x-4 transition-all duration-200 ${
                  isActive
                    ? "text-white bg-green-500 rounded-xl p-2 dark:text-white"
                    : "hover:text-green-500 hover:scale-95"
                }`}
              >
                {item.icon}
                {isExpanded && <span>{item.title}</span>}
              </div>
            </Link>
          );
        })}
      </nav>
      <button onClick={toggleSidebar} className="mt-auto bg-green-500 p-2 rounded">
        {isExpanded ? "Collapse" : "Expand"}
      </button>
    </menu>
  );
}
