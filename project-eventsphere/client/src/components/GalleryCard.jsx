const GalleryCard = ({ image }) => {
  return (
    <div className="overflow-hidden rounded-xl">
      <img
        src={image}
        alt="gallery"
        className="w-full h-60 object-cover hover:scale-110 transition duration-500"
      />
    </div>
  );
};

export default GalleryCard;
