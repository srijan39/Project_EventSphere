import Button from "./Button";

const EventCard = ({ title, date, description, image }) => {
  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-purple-400 text-sm">{date}</p>
        <p className="text-gray-400 text-sm">{description}</p>

        <Button className="w-full mt-2">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
