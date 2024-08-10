"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
import Button from "../reusables/buttons/Button";
import { useRouter, usePathname } from "next/navigation";
import useCookies from "@/hooks/useCookies";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const totalQuantities = useSelector(state => state.cart.totalQuantities);

  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const { getCookie } = useCookies();
  let euodia_token = getCookie("euodia_token");

  useEffect(() => { }, [euodia_token]);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="Euodia Logo" width={40} height={40} />
            <span className="ml-2 text-md text-accent font-bold">
              Euodia WholeFoods
            </span>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`hover:text-green-800 ${pathname === '/' ? 'text-green-600' : ''}`}>
            Home
          </Link>
          <Link href="/menu" className={`hover:text-green-800 ${pathname === '/menu' ? 'text-green-600' : ''}`}>
            Our Menu
          </Link>
          <Link href="/contact-us" className={`hover:text-green-800 ${pathname === '/contact-us' ? 'text-green-600' : ''}`}>
            Contact us
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/cart">
            <button className="hover:text-green-800 relative">
              <FiShoppingCart className="text-xl" />
              {
                totalQuantities === 0 ? null : 
              <p className='absolute -top-2 right-0 bg-red h-4 w-4 text-white flex items-center justify-center p-1 text-sm rounded-full' >

              { totalQuantities}
              </p>
              }
            </button>
            </Link>
            {euodia_token ? (
              <button className="hover:text-green-800">
                <FiUser className="h-5 w-5" />
              </button>
            ) : (
              <Button
                color="green"
                title="Login"
                hoverAnimation={"bounce"}
                isBorder
                onClick={() => router.push("/auth/login")}
              />
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleSidebar}>
            {isOpen ? (
              <FiX className="h-6 w-6 text-green-600" />
            ) : (
              <FiMenu className="h-6 w-6 text-green-600" />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-white shadow-lg p-4 space-y-4">
          <Link href="/" className={`hover:text-green-800 ${pathname === '/' ? 'text-green-600' : ''}`} onClick={toggleSidebar}>
            Home
          </Link>
          <Link href="/menu" className={`hover:text-green-800 ${pathname === '/menu' ? 'text-green-600' : ''}`} onClick={toggleSidebar}>
            Our Menu
          </Link>
          <Link href="/contact-us" className={`hover:text-green-800 ${pathname === '/contact-us' ? 'text-green-600' : ''}`} onClick={toggleSidebar}>
            Contact us
          </Link>
          <div className="flex flex-col items-center space-y-4 w-full">
            {euodia_token ? (
              <button
                onClick={toggleSidebar}
                className="flex items-center justify-center text-green-600 border border-green-600 rounded-lg px-4 py-2 w-full hover:bg-green-600 hover:text-white"
              >
                <FiUser className="mr-2 h-5 w-5" />
                Account
              </button>
            ) : (
              <Button
                title="Login"
                color="accent"
                isBorder
                onClick={() => {
                  toggleSidebar();
                  router.push("/auth/login");
                }}
                className="w-full"
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
