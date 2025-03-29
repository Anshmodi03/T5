import React from "react";
import { Link, useParams } from "react-router-dom";
import courses from "./coursedata";

const CourseDetailPage = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="text-center text-xl font-bold mt-10">
        Course not found.
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-3xl font-bold">{course.title}</h2>
      <p className="text-gray-700 my-4">{course.description}</p>
      <p className="text-lg text-green-600 font-semibold">
        Price: {course.price}
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
      <Link
        to="/"
        className="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition"
      >
        Back to Courses
      </Link>
    </div>
  );
};

export default CourseDetailPage;
