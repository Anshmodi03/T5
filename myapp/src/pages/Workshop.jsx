import React from "react";

const Workshop = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Upcoming Workshops
        </h1>
        <p className="text-gray-600 text-lg">
          Join interactive workshops led by industry professionals to boost your
          skills.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[1, 2, 3].map((id) => (
          <div key={id} className="bg-white p-6 shadow-md rounded-lg">
            <img
              src={`https://via.placeholder.com/400x200?text=Workshop+${id}`}
              alt={`Workshop ${id}`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Workshop Title {id}
            </h2>
            <p className="text-gray-600 mb-2">
              A hands-on session to explore technology trends and practical
              tools.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Date: April {10 + id}, 2025
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
              Register Now
            </button>
          </div>
        ))}
      </section>

      <section className="bg-yellow-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Host a Workshop
        </h2>
        <p className="text-gray-600 mb-6">
          Have something to share? Reach out to collaborate on hosting your own
          workshop with our community.
        </p>
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default Workshop;
