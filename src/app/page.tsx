import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Storytelling from "@/components/Storytelling";
import PerformanceStats from "@/components/PerformanceStats";
import FeatureGrid from "@/components/FeatureGrid";
import PowerMode from "@/components/PowerMode";
import VisualBreak from "@/components/VisualBreak";
import PressQuotes from "@/components/PressQuotes";
import ReserveForm from "@/components/ReserveForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Storytelling />
      <PerformanceStats />
      <FeatureGrid />
      <PowerMode />
      <VisualBreak />
      <PressQuotes />
      <ReserveForm />
      <Footer />
    </main>
  );
}
