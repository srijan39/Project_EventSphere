import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "../../data/mockData";

const GallerySection = () => {
  const sectionRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [slideIndex, setSlideIndex] = useState({});

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

  const nextSlide = (eventId, total) => {
    setSlideIndex((prev) => ({
      ...prev,
      [eventId]: ((prev[eventId] || 0) + 1) % total,
    }));
  };

  const prevSlide = (eventId, total) => {
    setSlideIndex((prev) => ({
      ...prev,
      [eventId]: ((prev[eventId] || 0) - 1 + total) % total,
    }));
  };

  return (
    <section id="gallery" className="overflow-visible bg-black py-24 text-white">
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
            Hover over any event image to preview photos and details.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-20">
          {events.map((event) => {
            const images = event.previewImages || [];
            const activeIndex = slideIndex[event.id] || 0;

            return (
              <div key={event.id} className="group relative overflow-visible">
                <motion.div
                  whileHover={{ scale: 1.025, y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 will-change-transform"
                >
                  <div className="relative h-72 w-full sm:h-80">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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

                <div className="absolute left-1/2 top-1/2 z-40 hidden w-[430px] -translate-x-1/2 -translate-y-1/2 scale-90 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 opacity-0 shadow-2xl transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 lg:block">
                  <div className="relative h-[300px] bg-black">
                    <img
                      src={images[activeIndex] || event.coverImage}
                      alt={event.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => prevSlide(event.id, images.length)}
                          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:bg-black/80"
                        >
                          ‹
                        </button>

                        <button
                          type="button"
                          onClick={() => nextSlide(event.id, images.length)}
                          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:bg-black/80"
                        >
                          ›
                        </button>

                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                          {images.map((_, index) => (
                            <span
                              key={index}
                              className={[
                                "h-2 w-2 rounded-full transition",
                                activeIndex === index
                                  ? "bg-white"
                                  : "bg-white/40",
                              ].join(" ")}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                      {event.category || "Event"}
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {event.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/65">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 lg:hidden">
                  {images.slice(0, 3).map((img, index) => (
                    <div
                      key={index}
                      className="h-24 overflow-hidden rounded-xl border border-white/10"
                    >
                      <img
                        src={img}
                        alt={`${event.title} mobile preview ${index + 1}`}
                        loading="lazy"
                        decoding="async"
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