import React from "react";

const Webinar = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Upcoming Webinars
        </h1>
        <p className="text-gray-600 text-lg">
          Learn from top industry professionals in our live and recorded webinar
          sessions.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((id) => (
          <div key={id} className="bg-white p-6 shadow-md rounded-lg">
            <img
              src={`https://via.placeholder.com/400x200?text=Webinar+${id}`}
              alt={`Webinar ${id}`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Webinar Topic {id}
            </h2>
            <p className="text-gray-600 mb-2">
              Join our expert speakers as they cover key insights, trends, and
              live Q&A sessions.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Date: April {15 + id}, 2025
            </p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700">
              Register Now
            </button>
          </div>
        ))}
      </section>

      <section className="bg-indigo-50 p-8 rounded-lg text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Want to Host a Webinar?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Share your expertise with a global audience. Submit your proposal to
          host a session with us.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700">
          Submit Proposal
        </button>
      </section>
    </div>
  );
};

export default Webinar;
