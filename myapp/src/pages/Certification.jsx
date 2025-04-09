import React from "react";

const Certification = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Certification Programs
        </h1>
        <p className="text-gray-600 text-lg">
          Get recognized for your skills with industry-validated certifications.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="bg-white shadow-md rounded-lg overflow-hidden p-6 text-center"
          >
            <img
              src={`https://via.placeholder.com/400x200?text=Certification+${id}`}
              alt={`Certification ${id}`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Certification Course {id}
            </h2>
            <p className="text-gray-600 mb-4">
              Learn, practice, and earn a certificate for your achievements.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700">
              Get Certified
            </button>
          </div>
        ))}
      </section>

      <section className="mt-16 text-center bg-green-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Why Get Certified?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Stand out to employers, validate your expertise, and gain confidence
          in your abilities with our professionally designed certification
          programs.
        </p>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">
          Explore All Certifications
        </button>
      </section>
    </div>
  );
};

export default Certification;
