// import Image from "next/image";
// import Button from "../reusables/buttons/Button";
// import foodImage from "@/public/image 29.png"
// import profilePic from "@/public/Frame 18.png"

// const Hero = () => {
//     return (
//         <div className="flex items-center justify-between py-10 px-6 ">
//             <div className="max-w-md">
//                 <h1 className="text-4xl font-bold mb-4">
//                     Come For The <span className="bg-orange-400 text-white px-5 py-1 rounded-full">Food</span>
//                 </h1>
//                 <h2 className="text-2xl font-semibold mb-4">Stay For The Memory</h2>
//                 <p className="mb-6">
//                     Food is what we eat to stay alive and healthy. It comes in many different forms and flavors, from fruits and vegetables to meats and grains.
//                 </p>
//                 <Button title='Order Now' color='accent'/>
//                 {/* <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Order Now</button> */}
//             </div>
//             <div className="relative">
//                 <div className="relative h-80 w-80">
//                     <Image src={foodImage} alt="Food" className="rounded-lg bg-orange-500" layout="fill" objectFit="cover" />
//                 </div>
               
//             </div>
//         </div>
//     );
// };

// export default Hero;


// components/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/path-to-your-video.mp4"
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center text-white p-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Euodia Whole Foods</h1>
          <p className="text-xl md:text-2xl mb-6">Discover the best meals. Food is what we eat to stay alive and healthy.
             It comes in many different forms and flavors, from fruits and vegetables to meats and grains.</p>
          <a href="/menu" className="inline-block px-6 py-3 bg-green-500 text-white font-semibold text-lg rounded hover:bg-green-700 transition-colors duration-300">
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
