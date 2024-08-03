"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import the useRouter hook
import { FiLayout } from "react-icons/fi";
import { RiExchangeLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import Link from "next/link";
import Typography from "@/components/reusables/typography/Typography";
// import Image from "next/image";
import { MdDashboard, MdOutlineShoppingBag } from "react-icons/md";
import { BsFileEarmarkTextFill } from "react-icons/bs";

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
];

export default function SideNav({ ...props }) {
  const router = useRouter(); // Use the useRouter hook
  const pathname = usePathname(); // Get the current pathname
console.log(pathname)
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
      className={`flex flex-col h-full dark:bg-black dark:text-white p-4 mt-8 flex-none  transition-all duration-300 ${
        isExpanded ? "w-80" : "w-20"
      }`}
    >
    
      <nav className="flex-grow flex flex-col mt-[5rem] gap-y-8">
        {sideData.map((item, idx) => {
          const isActive = pathname === item.link;
          // console.log(isActive)
          return (
            <Link key={idx} href={item.link}>
              <div
                className={`relative mt-10 cursor-pointer w-full text-sm dark:text-white space-x-2 py-3 flex items-center gap-x-4 text-black transition-all duration-200 ${
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
