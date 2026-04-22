import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_IMAGES } from "../../data/mockData";

const GallerySection = () => {
  const sectionRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    setEvents(GALLERY_IMAGES);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("animate-fadeInUp");
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" className="bg-black py-24 text-white overflow-visible">
      <div ref={sectionRef} className="opacity-0">
        <div className="mb-16 px-6 md:px-12 lg:px-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">
            Memories
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl lg:text-5xl">
            Event Gallery
          </h2>
          <div className="mt-4 h-1 w-20 bg-white" />
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Hover over any event card to preview more moments from that event.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-20">
          {events.map((event) => {
            const isHovered = hoveredId === event.id;

            return (
              <div
                key={event.id}
                className="relative overflow-visible"
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    y: isHovered ? -8 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
                >
                  <div className="relative h-72 w-full sm:h-80">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-5">
                      <p className="text-xs uppercase tracking-[0.25em] text-white/55">
                        {event.category || "Event"}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 18, scale: 0.96 }}
                      animate={{ opacity: 1, y: 10, scale: 1 }}
                      exit={{ opacity: 0, y: 18, scale: 0.96 }}
                      transition={{ duration: 0.22 }}
                      className="absolute left-1/2 top-full z-30 mt-4 hidden w-[340px] -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-xl md:block"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white/90">
                          {event.title}
                        </h4>
                        <span className="text-xs text-white/45">Preview</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {event.previewImages?.slice(0, 3).map((img, index) => (
                          <div
                            key={index}
                            className="h-28 overflow-hidden rounded-xl"
                          >
                            <img
                              src={img}
                              alt={`${event.title} preview ${index + 1}`}
                              className="h-full w-full object-cover transition duration-300 hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 grid grid-cols-3 gap-2 md:hidden">
                  {event.previewImages?.slice(0, 3).map((img, index) => (
                    <div
                      key={index}
                      className="h-24 overflow-hidden rounded-xl border border-white/10"
                    >
                      <img
                        src={img}
                        alt={`${event.title} mobile preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;