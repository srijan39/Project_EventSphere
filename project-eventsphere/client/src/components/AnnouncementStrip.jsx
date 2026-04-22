const items = [
  "Registrations Open for Upcoming Events",
  "Participation Certificates for All Members",
  "Workshop Series Starting This Month",
  "Creative, Technical, and Cultural Events",
  "Join the Club and Showcase Your Talent",
];

const AnnouncementStrip = () => {
  return (
    <div className="w-full overflow-hidden border-b border-[#f1d6db] bg-[#fff1f3]">
      <div className="marquee whitespace-nowrap py-3">
        <div className="inline-flex items-center gap-10 px-6 text-[13px] uppercase tracking-[0.22em] text-[#7a656b]">
          {[...items, ...items].map((item, index) => (
            <span key={index} className="flex items-center gap-10">
              <span>{item}</span>
              <span className="text-[#d14b5c] text-base">•</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .marquee {
          display: flex;
          width: max-content;
          animation: scrollStrip 26s linear infinite;
        }

        @keyframes scrollStrip {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementStrip;