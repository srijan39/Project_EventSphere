import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GalleryPreview = ({ event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = event.previewImages || [];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="pointer-events-auto absolute left-1/2 top-1/2 z-50 hidden w-[900px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl md:flex">
      <div className="relative h-[520px] w-[58%] bg-black">
        <img
          src={images[currentIndex]}
          alt={event.title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />

        <button
          type="button"
          onClick={prevImage}
          className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={nextImage}
          className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={[
                "h-2 w-2 rounded-full transition",
                currentIndex === index ? "bg-white" : "bg-white/40",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      <div className="flex h-[520px] w-[42%] flex-col bg-zinc-950">
        <div className="border-b border-white/10 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-white/45">
            {event.category}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {event.title}
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <p className="text-sm leading-7 text-white/75">
            {event.description}
          </p>

          <div className="mt-6 space-y-3 text-sm text-white/55">
            <p>
              This event brought students together through collaboration,
              creativity, and active participation.
            </p>
            <p>
              Each activity was planned to create a memorable experience and
              build stronger connections within the community.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 p-5">
          <p className="text-xs text-white/40">
            Hover preview • EventSphere Gallery
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryPreview;