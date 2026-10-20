
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function HomeLayout({ children }) {
  return (
    <div className="bg-[#FF9E0C]/5 flex flex-col min-h-screen h-full">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Analytics />
      <SpeedInsights />
      <Footer />
    </div>
  );
}
