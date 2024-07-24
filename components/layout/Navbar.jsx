"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi'; // Import icons from react-icons
import Button from '../reusables/buttons/Button';
import { useRouter } from 'next/navigation';
import useCookies from '@/hooks/useCookies';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
const router = useRouter()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const {getCookie} = useCookies()
  let euodia_token = getCookie("euodia_token")

  useEffect(()=>{
    
  }, [euodia_token])
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Euodia Logo" width={40} height={40}  />
          <span className="ml-2 text-md text-accent font-bold">Euodia WholeFoods</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-green-600 hover:text-green-800">
            Home
          </Link>
          <Link href="/menu">
            <span className="hover:text-green-800">Our Menu</span>
          </Link>
          <Link href="/contact-us">
            <span className="hover:text-green-800">Contact us</span>
          </Link>
          <div className="flex items-center space-x-4">
            {/* <Button /> */}
            <button className="hover:text-green-800">
              <FiShoppingCart className="h-5 w-5" />
            </button>
            {
              euodia_token ? 
            <button className="hover:text-green-800">
              <FiUser className="h-5 w-5" />
            </button> : 

          <Button title='Login'    hoverAnimation={"bounce"} isBorder onClick={() =>router.push("/auth/login")}  />
            }
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
          <Link href="/">
            <span className="text-green-600 hover:text-green-800">Home</span>
          </Link>
          <Link href="/menu">
            <span className="hover:text-green-800">Our Menu</span>
          </Link>
          <Link href="/contact-us">
            <span className="hover:text-green-800">Contact us</span>
          </Link>
          <Button title='Login' color='accent' isBorder onClick={() =>router.push("/auth/   login")} />
          {/* <button className="text-green-600 border border-green-600 rounded-lg px-4 py-2 hover:bg-green-600 hover:text-white">
            Log In
          </button> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
