// components/CTASection.tsx

const CTASection = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Ready to Be Part of Something Bigger?
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-gray-400 text-lg md:text-xl">
          Join our community, attend events, build projects, and grow with passionate tech enthusiasts.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">

          <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition duration-300">
            Join Now
          </button>

          <button className="border border-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition duration-300">
            Explore Events
          </button>

        </div>

      </div>
    </section>
  );
};

export default CTASection;