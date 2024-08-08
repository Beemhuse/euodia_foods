// components/CategoryComponent.js
"use client";
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const categories = [
  'FEATURED',
  'BREAKFAST COMBOS',
  'MADE FROM SCRATCH™ BISCUITS & MORE',
  'BREAKFAST BURRITOS & WRAPS',
  'PLATTERS',
  '2 FOR $5',
  'CHARBROILED BURGER COMBO',
];

const Category = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const handleScroll = () => {
      const containerWidth = scrollContainer.offsetWidth;
      const scrollLeft = scrollContainer.scrollLeft;
      const newIndex = Math.round(scrollLeft / (containerWidth / categories.length));
      setActiveIndex(newIndex);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-green-500 py-4 px-6 relative flex items-center overflow-hidden">
      <button onClick={scrollLeft} className="absolute left-0 outline-none">
        <motion.svg
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.0 }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </motion.svg>
      </button>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scroll-smooth whitespace-nowrap no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Firefox and IE
      >
        {[...categories, ...categories, ...categories].map((category, index) => (
          <motion.div
            key={index}
            className={`text-${activeIndex === (index % categories.length) ? 'white' : 'black'} font-bold px-4 cursor-pointer hover:underline`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (index % categories.length) * 0.1 }}
            onClick={() => setActiveIndex(index % categories.length)}
          >
            {category}
          </motion.div>
        ))}
      </div>

      <button onClick={scrollRight} className="absolute right-0 outline-none">
        <motion.svg
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.0 }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </motion.svg>
      </button>
    </div>
  );
};

export default Category;
