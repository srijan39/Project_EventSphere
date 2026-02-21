import { useState, useEffect } from "react";
import { CLUB_NAME } from "../../data/mockData";

const texts = [
  "Where Innovation Meets Community",
  "Build. Create. Inspire.",
  "Empowering Future Leaders.",
];

const Hero = () => {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const speed = isDeleting ? 50 : 90;

    const timeout = setTimeout(() => {
      const fullText = texts[textIndex];

      setCurrentText((prev) =>
        isDeleting
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, textIndex]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white pt-24">

      {/* Background with cinematic zoom */}
      <div className="absolute inset-0 animate-slowZoom">
        <img
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=2000"
          alt="Club Event"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 md:px-16 lg:px-24">
        <div className="max-w-xl animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {CLUB_NAME}
          </h1>

          <p className="mt-6 text-xl text-gray-300 min-h-[32px]">
            {currentText}
            <span className="ml-1 animate-pulse">|</span>
          </p>

          <p className="mt-6 text-gray-400">
            A student-driven tech community focused on innovation,
            collaboration, and building impactful experiences on campus.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition">
              Explore Events
            </button>

            <button className="px-6 py-3 border border-gray-500 rounded-md hover:bg-white hover:text-black transition">
              Join Us
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;