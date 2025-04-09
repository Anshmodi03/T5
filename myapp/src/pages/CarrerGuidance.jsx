import React from "react";

const CarrerGuidance = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Career Guidance
        </h1>
        <p className="text-gray-600 text-lg">
          Empowering your future with expert advice, planning, and mentoring.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Resume & Portfolio Building
          </h2>
          <p className="text-gray-600">
            Get help crafting a professional resume and a compelling portfolio
            that showcases your skills and projects.
          </p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Mock Interviews & Feedback
          </h2>
          <p className="text-gray-600">
            Practice real interview scenarios and receive detailed feedback from
            experienced mentors.
          </p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Career Path Planning
          </h2>
          <p className="text-gray-600">
            Understand industry roles and map out a personalized learning and
            development plan.
          </p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            LinkedIn & Networking Tips
          </h2>
          <p className="text-gray-600">
            Learn how to build your online presence, grow your professional
            network, and reach out to recruiters.
          </p>
        </div>
      </section>

      <section className="bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Book a one-on-one session with a career mentor to get started on your
          path to success.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
          Book Now
        </button>
      </section>
    </div>
  );
};

export default CarrerGuidance;
