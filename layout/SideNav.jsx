"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { FiLayout } from "react-icons/fi";
import { RiExchangeLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import Link from "next/link";
import Typography from "@/components/reusables/typography/Typography";
import Image from "next/image";

const sideData = [
  {
    icon: <FiLayout />,
    title: "Dashboard",
    link: "/admin/",
  },
  {
    icon: <HiUsers />,
    title: "Order list",
    link: "/admin/orders",
  },
  {
    icon: <RiExchangeLine />,
    title: "All Products",
    link: "/admin/products",
  },
];

export default function SideNav({ ...props }) {
  const router = useRouter(); // Use the useRouter hook
  const pathname = router.pathname; // Get the current pathname

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
      className={`flex flex-col h-full dark:bg-black dark:text-white p-6 flex-none shadow-lg transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" width={50} height={50} alt="logo" />
        {isExpanded && (
          <Typography variant="h1" size="md" className="text-primary">
            Euodia Wholefoods
          </Typography>
        )}
      </div>
      <nav className="flex-grow flex flex-col mt-10 gap-y-8">
        {sideData.map((item, idx) => {
          const isActive = pathname === item.link;
          return (
            <Link key={idx} href={item.link}>
              <div
                className={`relative cursor-pointer w-full text-base dark:text-white py-3 flex items-center gap-x-4 text-black transition-all duration-200 ${
                  isActive
                    ? "text-black bg-green-500 p-2 dark:text-white"
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
