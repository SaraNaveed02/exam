"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "../compoments/navbar";
import { supabase } from "../compoments/supabase";
import { useUser } from "../compoments/ContentApi";

const StudentDashboard = () => {
  const { userId } = useUser();

  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const[mycourses,setMycourses]=useState([])

  useEffect(() => {
    if (!userId) {
      console.log("Waiting for userId from Context...");
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
        console.log("No user found in DB for email:", userId);
        setStudents(null);
      } else {
        console.log("Success! Data found:", data);
        setStudents(data);
      }
      setLoading(false);
    };

    fetchStudentsData();
  }, [userId]);

  useEffect(() => {
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
        console.log(data);
        setMycourses(data)
      } else {
        console.log(error);
      }
        setLoading(false);

    };
    fetchingCourses();
  }, [userId]);

  return (
    <div>
      <Navbar />
      <div className="p-5">
        {loading ? (
          <p>Loading...</p>
        ) : students ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome, {students.name}</h1>
            
            <h2 className="text-xl font-semibold mt-4">My Enrolled Courses:</h2>
            <div className="mt-2">
              {mycourses.length > 0 ? (
                mycourses.map((item, i) => (
                  <div key={i} className="border p-3 my-2 rounded shadow-sm bg-gray-50">
                    {/* FIX 3: Access nested name from courses object */}
                    <p className="font-medium">{item.courses?.name}</p>
                    <p className="text-sm text-gray-500">Deadline: {item.courses?.deadline}</p>
                  </div>
                ))
              ) : (
                <p>No courses enrolled yet.</p>
              )}
            </div>
          </div>
        ) : (
          <p>No User Found</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
