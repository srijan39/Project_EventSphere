import Hero from "../components/home/Hero";
import EventsSection from "../components/home/EventsSection";
import GallerySection from "../components/home/GallerySection";
import AboutSection from "../components/home/AboutSection";
import CTASection from "../components/home/CTASection";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      
      <CTASection />
    </>
  );
};

export default Home;