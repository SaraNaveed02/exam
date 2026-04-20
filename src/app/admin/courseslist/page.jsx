"use client";
import { supabase } from "@/app/compoments/supabase";
import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";

const Courses = () => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [des, setdes] = useState("");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  // Improved Date Logic
  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Split string to avoid UTC shifting
    const [year, month, day] = dateString.split("-").map(Number);
    const courseDate = new Date(year, month - 1, day); 
    
    return courseDate < today;
  };

  const fetchCourses = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching courses:", error);
    } else {
      setCourses(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async () => {
    if (!name || !deadline || !des) return alert("Fill all fields");

    // UX: Disable button or show loading here to prevent double clicks
    const { error } = await supabase.from("courses").insert({
      name,
      deadline,
      description: des,
    });

    if (error) {
      alert("Error adding course: " + error.message);
    } else {
      setName("");
      setDeadline("");
      setdes("");
      fetchCourses();
    }
  };

  return (
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
              <textarea // Changed to textarea for descriptions
                placeholder="Course Description"
                value={des}
                onChange={(e) => setdes(e.target.value)}
                className="w-full border p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-blue-500 text-base sm:text-lg min-h-[100px]"
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
              {isLoading ? (
                <p className="text-gray-500 animate-pulse">Loading courses...</p>
              ) : courses.length === 0 ? (
                <p className="text-gray-500">No courses added yet.</p>
              ) : (
                courses.map((course) => {
                  const disabled = isOverdue(course.deadline);
                  return (
                    <div
                      key={course.id}
                      className={`p-4 sm:p-5 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 transition-all ${
                        disabled ? "bg-gray-100 opacity-70 grayscale" : "bg-white border-l-4 border-blue-500"
                      }`}
                    >
                      <div className="flex-1">
                        <h3 className={`text-lg sm:text-xl font-semibold ${disabled ? "text-gray-500 line-through" : "text-gray-800"}`}>
                          {course.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-1">
                          Deadline: {new Date(course.deadline).toLocaleDateString()}
                        </p>
                        <p className={`text-sm sm:text-base line-clamp-2 ${disabled ? "text-gray-400" : "text-gray-600"}`}>
                          {course.description}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          disabled ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                        }`}>
                          {disabled ? "Expired" : "Active"}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Courses;