import React from "react";

const Mentorship = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Mentorship Program
        </h1>
        <p className="text-gray-600 text-lg">
          Unlock your full potential with guidance from industry experts.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1-on-1 Mentoring
          </h2>
          <p className="text-gray-600">
            Personalized sessions with mentors to address your unique goals and
            challenges.
          </p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Live Group Sessions
          </h2>
          <p className="text-gray-600">
            Join live discussions, Q&A, and workshops on trending tech topics.
          </p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Career Guidance
          </h2>
          <p className="text-gray-600">
            Get help with resumes, portfolios, job interviews, and career
            roadmaps.
          </p>
        </div>
      </section>

      <section className="bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Become a Mentee
        </h2>
        <p className="text-gray-600 mb-6">
          Ready to accelerate your learning and career growth? Join our
          mentorship program today.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
          Apply Now
        </button>
      </section>
    </div>
  );
};

export default Mentorship;
