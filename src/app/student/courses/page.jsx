"use client";

import { useUser } from "@/app/compoments/ContentApi";
import { Navbar } from "@/app/compoments/navbar";
import { supabase } from "@/app/compoments/supabase";
import React, { useEffect, useState } from "react";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const { userId } = useUser();
  const [enrolledIds, setEnrolledIds] = useState([]);

  useEffect(() => {
    const fetchingdata = async () => {
      const { data } = await supabase.from("courses").select("*");
      setCourses(data || []);
      if (userId) {
        const { data: myEnrollments } = await supabase
          .from("enrollments")
          .select("course_id")
          .eq("user_id", userId);
        const ids = myEnrollments?.map((items) => items.course_id);
        setEnrolledIds(ids || []);
      }
    };
    fetchingdata();
  }, [userId]);

  const handleEnroll = async (courseId) => {
    if (enrolledIds.includes(courseId)) return;
    const { error } = await supabase
      .from("enrollments")
      .insert([{ user_id: userId, course_id: courseId }]);
    if (!error) {
      alert("Enrolled successfully!");
      setEnrolledIds([...enrolledIds, courseId]);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Available courses
        </h1>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">
          Enroll before the deadline.
        </p>
        {!userId && (
          <p className="mt-2 text-sm text-amber-800">
            Sign in to enroll in courses.
          </p>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {courses.map((item) => {
            const isAlreadyEnrolled = enrolledIds.includes(item.id);
            const today = new Date();
            const deadlineDate = new Date(item.deadline);
            const isExpired = today > deadlineDate;
            const isDisabled =
              isAlreadyEnrolled || isExpired || !userId;

            return (
              <article
                key={item.id}
                className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {item.name}
                </h2>
                <p
                  className={`mt-2 text-sm sm:text-base ${isExpired ? "font-semibold text-red-600" : "text-gray-600"}`}
                >
                  Deadline: {item.deadline}
                  {isExpired && " (expired)"}
                </p>
                {item.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                    {item.description}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => handleEnroll(item.id)}
                  disabled={isDisabled}
                  className={`mt-auto w-full shrink-0 rounded-lg py-2.5 text-sm font-semibold transition sm:py-3 sm:text-base ${
                    isDisabled
                      ? "cursor-not-allowed bg-gray-300 text-gray-600"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {!userId
                    ? "Sign in to enroll"
                    : isAlreadyEnrolled
                      ? "Already enrolled"
                      : isExpired
                        ? "Deadline passed"
                        : "Enroll now"}
                </button>
              </article>
            );
          })}
        </div>

        {courses.length === 0 && (
          <p className="mt-8 text-center text-gray-500">No courses yet.</p>
        )}
      </main>
    </div>
  );
};

export default CoursesPage;
