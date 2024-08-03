import React from 'react';
import Button from '../reusables/buttons/Button';

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
          <p className="text-xl md:text-2xl mb-6">Food is what we eat to stay alive and healthy.
             It comes in many different forms and flavors, from fruits and vegetables to meats and grains.</p>
          <a href="/menu" className="inline-block px-6 py-3 bg-green-500 text-white font-semibold text-lg rounded hover:bg-green-700 transition-colors duration-300">
            Order Now
          </a>
          <Button title='Order Now' color='accent'/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
