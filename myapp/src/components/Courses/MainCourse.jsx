import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import coursedata from "./coursedata";

const MainCourse = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 text-gray-900 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        🎓 Explore Our Courses 🎓
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {coursedata.map((course) => (
          <div
            key={course.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold">{course.title}</h3>
            <p className="text-gray-600 my-2">{course.description}</p>
            <p className="text-lg text-green-600 font-semibold my-2">
              {course.price}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Batch Size:</strong> {course.batchSize}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Validity:</strong> {course.validity}
            </p>
            <p
              className={`text-sm font-semibold ${
                course.live === "Live" ? "text-green-500" : "text-red-500"
              }`}
            >
              <strong>Status:</strong> {course.live}
            </p>
            <div className="flex justify-between gap-4 mt-4">
              <Link
                to={`/course/${course.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold w-full text-center hover:bg-blue-600 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCourse;
