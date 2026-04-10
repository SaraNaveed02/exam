"use client";
import { supabase } from "@/app/compoments/supabase";
import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";

const Courses = () => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [des, setdes] = useState("");
  const [courses, setCourses] = useState([]);

  const isOverdue = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const courseDate = new Date(dateString);
    return courseDate < today;
  };

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert("Error fetching courses");
      console.log(error);
    } else {
      setCourses(data);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async () => {
    if (!name || !deadline || !des) return alert("Fill all fields");

    const { error } = await supabase.from("courses").insert({
      name,
      deadline,
      description: des,
    });

    if (error) {
      alert("Error adding course");
      console.log(error);
    } else {
      setName("");
      setDeadline("");
      setdes("");
      fetchCourses();
    }
  };

  return (
    <AdminLayout>
      <div className="px-2 sm:px-4 py-4 max-w-screen mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Add Course Card */}
          <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-lg h-fit w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
              Add New Course 📚
            </h1>
            <div className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="Course Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
              />
              <input
                type="text"
                placeholder="Course Description"
                value={des}
                onChange={(e) => setdes(e.target.value)}
                className="w-full border p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
              />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full border p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
              />
              <button
                onClick={addCourse}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-base sm:text-lg"
              >
                Add Course
              </button>
            </div>
          </div>

          {/* Courses List */}
          <div className="w-full ">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
              Your Courses 🎓
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {courses.length === 0 && (
                <p className="text-gray-500">No courses added yet.</p>
              )}

              {courses.map((course) => {
                const disabled = isOverdue(course.deadline);

                return (
                  <div
                    key={course.id}
                    className={`p-4 sm:p-5 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 ${disabled ? "bg-gray-200 opacity-60 grayscale" : "bg-white"}`}
                  >
                    <div>
                      <h3
                        className={`text-lg sm:text-xl font-semibold ${disabled ? "text-gray-500 line-through" : "text-gray-800"}`}
                      >
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Deadline: {course.deadline}
                      </p>
                      <p
                        className={`
      ${disabled ? "text-gray-400" : "text-gray-600"}
    text-sm sm:text-base
    max-w-xs sm:max-w-sm lg:max-w-md
    break-words leading-relaxed
    line-clamp-2
  `}
                      >
                        {course.description}
                      </p>
                    </div>

                    {disabled ? (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                        Expired
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Courses;
