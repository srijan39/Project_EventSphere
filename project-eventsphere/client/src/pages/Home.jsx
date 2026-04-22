import Hero from "../components/home/Hero";
import EventsSection from "../components/home/EventsSection";
import GallerySection from "../components/home/GallerySection";
import AboutSection from "../components/home/AboutSection";
import CTASection from "../components/home/CTASection";
import AnnouncementStrip from "../components/AnnouncementStrip";
const Home = () => {
  return (
    <>
      <AnnouncementStrip/>
      <Hero />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      
      <CTASection />
    </>
  );
};

export default Home;