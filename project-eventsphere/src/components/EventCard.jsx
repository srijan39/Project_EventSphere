import { useEffect, useState } from "react";

const EventCard = ({ title, description, date, category, isLive }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!date || date === "Every Saturday") return;

    const interval = setInterval(() => {
      const eventDate = new Date(date).getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance <= 0) {
        setTimeLeft("Event Started");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);

      setTimeLeft(`${days}d ${hours}h`);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:-translate-y-3 transition duration-500">

      {/* Category Badge */}
      <div className="mb-4">
        <span className="text-xs px-3 py-1 bg-white/10 rounded-full">
          {category}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-white mb-3">
        {title}
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        {description}
      </p>

      {timeLeft && (
        <p className="text-sm text-gray-300 mb-4">
          Starts In: <span className="font-semibold">{timeLeft}</span>
        </p>
      )}

      <p className="text-xs text-gray-500">{date}</p>
    </div>
  );
};

export default EventCard;