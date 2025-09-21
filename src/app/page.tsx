import ResourceCards from "@/components/resourceCards";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import HeroSection from "@/components/heroSection";

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <ResourceCards />
      <Footer />
    </div>
  );
}
