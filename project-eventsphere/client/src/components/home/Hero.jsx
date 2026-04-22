import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CLUB_NAME } from "../../data/mockData";

const texts = [
  "Celebrating Participation and Excellence",
  "Creating Meaningful Events on Campus",
  "Inspiring Talent, Recognition, and Growth",
];

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentFullText = texts[textIndex];
    const typingSpeed = isDeleting ? 35 : 65;

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentFullText.substring(0, prev.length - 1)
          : currentFullText.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 1200);
      }

      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fff7f7]">
      <div className="absolute inset-0 heroRoseBg" />

      <div className="absolute left-[8%] top-[16%] h-44 w-44 rounded-full bg-[#f7c7cf]/45 blur-3xl pointer-events-none" />
      <div className="absolute right-[14%] top-[12%] h-56 w-56 rounded-full bg-[#f3a8b4]/30 blur-3xl pointer-events-none" />
      <div className="absolute right-[18%] bottom-[16%] h-52 w-52 rounded-full bg-[#ffd5dc]/35 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 md:px-12 lg:px-20">
        <motion.div
          className="w-full md:w-[64%] lg:w-[58%]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.35em] text-[#9b7a80] font-medium">
            Certificate Inspired Event Experience
          </p>

          <h1 className="mt-5 text-5xl sm:text-6xl md:text-7xl leading-[0.98] text-[#2f2226] font-semibold">
            <span className="block font-serif">{CLUB_NAME}</span>
          </h1>

          <div className="mt-6 h-[2px] w-28 bg-gradient-to-r from-[#d14b5c] via-[#ec4f76] to-[#f08aa0]" />

          <p className="mt-7 min-h-[48px] text-lg sm:text-xl md:text-2xl font-medium text-[#5c4349]">
            {displayText}
            <span className="ml-1 animate-pulse text-[#d14b5c]">|</span>
          </p>

          <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-8 text-[#746167]">
            We design memorable seminars, competitions, and club experiences that
            celebrate creativity, participation, and achievement with a refined,
            warm, and elegant identity.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/events")}
              className="rounded-full bg-gradient-to-r from-[#d14b5c] via-[#ec4f76] to-[#f08aa0] px-8 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_18px_45px_-20px_rgba(209,75,92,0.45)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_20px_55px_-18px_rgba(209,75,92,0.6)] active:scale-[0.98]"
            >
              Explore Events
            </button>

            <button
              onClick={() => navigate("/recruitment")}
              className="rounded-full border border-[#efcfd5] bg-white/85 px-8 py-3.5 text-sm sm:text-base font-semibold text-[#5a3f45] transition duration-300 hover:border-[#d14b5c] hover:bg-white hover:scale-[1.03] active:scale-[0.98]"
            >
              Join the Club
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        .heroRoseBg {
          background:
            radial-gradient(circle at 14% 20%, rgba(247, 199, 207, 0.55), transparent 30%),
            radial-gradient(circle at 82% 18%, rgba(240, 138, 160, 0.22), transparent 28%),
            radial-gradient(circle at 78% 78%, rgba(236, 79, 118, 0.16), transparent 26%),
            linear-gradient(135deg, #fffdfd 0%, #fff4f5 42%, #fff8f8 100%);
        }
      `}</style>
    </section>
  );
};

export default Hero;