import { motion } from "framer-motion";

const GalleryCard = ({ event }) => {
  return (
    <div className="group relative overflow-visible">
      <motion.div
        whileHover={{
          scale: 1.025,
          y: -4,
        }}
        transition={{
          duration: 0.22,
          ease: "easeOut",
        }}
        className="overflow-hidden rounded-xl border border-white/10 bg-white/5 will-change-transform"
      >
        <div className="relative h-60 w-full overflow-hidden">
          <img
            src={event.coverImage}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-lg font-semibold text-white">
              {event.title}
            </h3>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute left-1/2 top-full z-30 mt-4 hidden w-[300px] -translate-x-1/2 translate-y-3 scale-95 rounded-xl bg-black/90 p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-1 group-hover:scale-100 group-hover:opacity-100 md:block">
        <div className="grid grid-cols-3 gap-2">
          {event.previewImages.slice(0, 3).map((img, index) => (
            <div key={index} className="h-20 overflow-hidden rounded-lg">
              <img
                src={img}
                alt={`${event.title} preview ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 md:hidden">
        {event.previewImages.slice(0, 3).map((img, index) => (
          <div key={index} className="h-20 overflow-hidden rounded-lg">
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
};

export default GalleryCard;