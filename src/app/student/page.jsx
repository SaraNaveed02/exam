"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "../compoments/navbar";
import { supabase } from "../compoments/supabase";
import { useUser } from "../compoments/ContentApi";

const StudentDashboard = () => {
  const { userId } = useUser();

  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mycourses, setMycourses] = useState([]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchStudentsData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Fetch error:", error.message);
        setStudents(null);
      } else if (!data) {
        setStudents(null);
      } else {
        setStudents(data);
      }
      setLoading(false);
    };

    fetchStudentsData();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchingCourses = async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select(
          `
      course_id,
      courses (
        name,
        deadline
      )
    `,
        )
        .eq("user_id", userId);

      if (data) {
        setMycourses(data);
      } else {
        console.log(error);
      }
      setLoading(false);
    };
    fetchingCourses();
  }, [userId]);

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-6">
        {loading ? (
          <p className="text-gray-600">Loading…</p>
        ) : students ? (
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
              Welcome, {students.name}
            </h1>

            <h2 className="mt-6 text-lg font-semibold text-gray-800 sm:text-xl">
              My enrolled courses
            </h2>
            <div className="mt-3 space-y-3">
              {mycourses.length > 0 ? (
                mycourses.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
                  >
                    <p className="font-medium text-gray-900">
                      {item.courses?.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 sm:text-base">
                      Deadline: {item.courses?.deadline}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600 sm:text-base">
                  No courses enrolled yet.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No user found.</p>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
