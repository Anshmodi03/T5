import React from "react";

const ELearning = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          E-Learning Portal
        </h1>
        <p className="text-gray-600 text-lg">
          Learn at your own pace with expert-led video lessons, interactive
          quizzes, and hands-on projects.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {["Frontend Development", "Data Science", "UI/UX Design"].map(
          (course, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <img
                src={`https://via.placeholder.com/400x200?text=${course.replace(
                  / /g,
                  "+"
                )}`}
                alt={course}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {course}
              </h2>
              <p className="text-gray-600 mb-4">
                Explore modules, practice problems, and real-world projects
                designed by top instructors.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
                Start Learning
              </button>
            </div>
          )
        )}
      </section>

      <section className="bg-blue-50 p-8 rounded-lg text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Why Choose Our E-Learning?
        </h2>
        <ul className="text-gray-600 max-w-2xl mx-auto mb-6 space-y-2">
          <li>✅ Learn anytime, anywhere</li>
          <li>✅ Industry-recognized curriculum</li>
          <li>✅ Community support & mentorship</li>
        </ul>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
          Browse All Courses
        </button>
      </section>
    </div>
  );
};

export default ELearning;
