"use client"
import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const videoRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
          observer.disconnect();
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={videoRef} className="absolute top-0 left-0 w-full h-full">
        {isVideoVisible && (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/Euodia foods.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        )}
      </div>
      <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center text-white p-4 mt-8 sm:mt-4 md:mt-0">
          <h1 className="sm:text-4xl md:text-5xl font-bold mb-4">Welcome to Euodia Whole Foods</h1>
          <p className="sm:text-lg md:text-2xl mb-6">Discover nutritious drinks and meals that support your wellness journey. From fresh produce to wholesome options, we’re here to help you eat healthy and stay vibrant.</p>
          <a href="/menu" className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white font-semibold text-sm sm:text-lg rounded hover:bg-green-700 transition-colors duration-300">
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
