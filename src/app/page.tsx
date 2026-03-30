import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Storytelling from "@/components/Storytelling";
import PerformanceStats from "@/components/PerformanceStats";
import PowerMode from "@/components/PowerMode";
import VisualBreak from "@/components/VisualBreak";
import ReserveForm from "@/components/ReserveForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Storytelling />
      <PerformanceStats />
      <PowerMode />
      <VisualBreak />
      <ReserveForm />
      <Footer />
    </main>
  );
}
