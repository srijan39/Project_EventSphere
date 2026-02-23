import { useEffect, useRef, useState } from "react";
import { GALLERY_IMAGES } from "../../data/mockData";

const GallerySection = () => {
  const sectionRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(GALLERY_IMAGES);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("animate-fadeInUp");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Pattern generator (scalable)
  const getSpanClasses = (index) => {
    const pattern = [
      "col-span-2 row-span-2", // Big
      "row-span-2",            // Tall
      "col-span-2",            // Wide
      "",                      // Normal
      "row-span-2",            // Tall
      "",                      // Normal
    ];

    return pattern[index % pattern.length];
  };

  return (
    <section
  id="gallery"
  className="bg-black text-white py-24"
>
  <div ref={sectionRef} className="opacity-0">

    {/* Heading */}
    <div className="px-6 md:px-16 lg:px-24 mb-16">
      <h2 className="text-3xl md:text-4xl font-bold">
        Event Gallery
      </h2>
      <div className="w-20 h-1 bg-white mt-4"></div>
    </div>

    {/* Symmetric Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-16">

      {images.map((image) => (
        <div
          key={image.id}
          className="relative overflow-hidden rounded-xl group"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-64 object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300"></div>
        </div>
      ))}

    </div>

  </div>
</section>
  );
};

export default GallerySection;