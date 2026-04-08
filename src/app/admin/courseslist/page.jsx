"use client";
import { supabase } from "@/app/compoments/supabase";
import React, { useState, useEffect } from "react";

const Courses = () => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [des, setdes] = useState("");
  const [courses, setCourses] = useState([]);

  // Helper to check if the deadline has passed
  const isOverdue = (dateString) => {
    const today = new Date();
    // Set time to 00:00:00 to compare dates accurately without hours/minutes interference
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
    <div className="min-h-screen bg-slate-50 px-6 py-10 grid md:grid-cols-2 gap-10">
      {/* Add Course Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg h-fit">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Course 📚</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Course Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Course Description"
            value={des}
            onChange={(e) => setdes(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCourse}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Course
          </button>
        </div>
      </div>

      {/* Courses List */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Courses 🎓</h2>
        <div className="space-y-4">
          {courses.length === 0 && <p className="text-gray-500">No courses added yet.</p>}

          {courses.map((course) => {
            const disabled = isOverdue(course.deadline);
            
            return (
              <div
                key={course.id}
                className={`p-5 rounded-xl shadow-md flex justify-between items-center transition-opacity ${
                  disabled ? "bg-gray-200 opacity-60 grayscale" : "bg-white"
                }`}
              >
                <div>
                  <h3 className={`text-xl font-semibold ${disabled ? "text-gray-500 line-through" : "text-gray-800"}`}>
                    {course.name}
                  </h3>
                  <p className="text-sm text-gray-500">Deadline: {course.deadline}</p>
                  <p className={disabled ? "text-gray-400" : "text-gray-600"}>
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
  );
};

export default Courses;