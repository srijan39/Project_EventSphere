import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GalleryCard = ({ event }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main Card */}
      <motion.div
        animate={{
          scale: hovered ? 1.05 : 1,
          y: hovered ? -6 : 0,
        }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
      >
        <div className="relative h-60 w-full">
          <img
            src={event.coverImage}
            alt={event.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition duration-300" />

          {/* Title */}
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-white font-semibold text-lg">
              {event.title}
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Hover Popup (Desktop only) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-30 mt-4 hidden w-[320px] -translate-x-1/2 rounded-xl bg-black/90 p-3 shadow-2xl md:block"
          >
            <div className="grid grid-cols-3 gap-2">
              {event.previewImages.map((img, index) => (
                <div key={index} className="h-24 overflow-hidden rounded-lg">
                  <img
                    src={img}
                    alt={`preview-${index}`}
                    className="h-full w-full object-cover hover:scale-110 transition duration-300"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile fallback (no hover) */}
      <div className="mt-3 grid grid-cols-3 gap-2 md:hidden">
        {event.previewImages.map((img, index) => (
          <div key={index} className="h-20 overflow-hidden rounded-lg">
            <img
              src={img}
              alt={`mobile-${index}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryCard;