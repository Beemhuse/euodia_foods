'use client';
import Hero from "@/components/pages/Hero.jsx"
import Features from '@/components/pages/Features';
import Qualities from '@/components/pages/Qualities';
import BestSellerDishes from '@/components/pages/BestDishes';
import HomeLayout from '@/components/layout/HomeLayout';

export default function Home() {
  return (
    <HomeLayout>

      <section className="min-h-screen ">
        <Hero />
        <BestSellerDishes />
        <Features />
        <Qualities />
      </section>
    </HomeLayout>
  );
}

