const AboutSection = () => {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-16 lg:px-24">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* CEO Image */}
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/src/assets/ceo.jpg"   // replace with your CEO image if needed
              alt="CEO of VIBRANTA"
              className="w-full h-[450px] object-cover rounded-2xl transform transition duration-700 group-hover:scale-105"
            />
          </div>

          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
        </div>

        {/* CEO Content */}
        <div className="space-y-6 animate-fadeInUp">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              About Our CEO
            </h2>
            <div className="w-20 h-1 bg-white mt-4"></div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-200">
            Srijan 
          </h3>

          <p className="text-gray-400">
            Founder & Chief Executive Officer
          </p>

          <p className="text-gray-300 leading-relaxed">
            Srijan founded EventSphere with a vision to build a powerful
            student-driven community where innovation, leadership, and
            creativity thrive together.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Under his leadership, the club has successfully organized
            impactful tech events, collaborative workshops, and high-energy
            hackathons that empower students to grow beyond classrooms.
          </p>

          <button className="mt-4 px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition duration-300">
            Learn More
          </button>

        </div>

      </div>

    </section>
  );
};

export default AboutSection;