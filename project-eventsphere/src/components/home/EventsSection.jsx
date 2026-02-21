import { useEffect, useRef, useState } from "react";
import EventCard from "../EventCard";
import { EVENTS } from "../../data/mockData";

const EventsSection = () => {
  const sectionRef = useRef(null);
  const [events, setEvents] = useState([]);

  // Simulate API-ready structure
  useEffect(() => {
    // Later replace with:
    // fetch("/api/events").then(res => res.json()).then(data => setEvents(data))
    setEvents(EVENTS);
  }, []);

  // Scroll reveal
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

  return (
    <section
      id="events"
      className="bg-black text-white py-24 px-6 md:px-16 lg:px-24"
    >
      <div ref={sectionRef} className="max-w-6xl mx-auto opacity-0">

        {/* Heading */}
        <div className="mb-16 flex justify-between items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Upcoming Events
            </h2>
            <div className="w-20 h-1 bg-white mt-4"></div>
          </div>

          <button className="hidden md:block px-6 py-2 border border-white rounded-md hover:bg-white hover:text-black transition">
            View All Events
          </button>
        </div>

        {/* Dynamic Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              category={event.category}
              isLive={event.date === "Every Saturday"} 
            />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-12 text-center md:hidden">
          <button className="px-6 py-3 border border-white rounded-md hover:bg-white hover:text-black transition">
            View All Events
          </button>
        </div>

      </div>
    </section>
  );
};

export default EventsSection;