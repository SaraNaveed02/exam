"use client";
import { useUser } from "@/app/compoments/ContentApi";
import { Navbar } from "@/app/compoments/navbar";
import { supabase } from "@/app/compoments/supabase";
import React, { useEffect, useState } from "react";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const { userId } = useUser();
  const [enrolledIds, setEnrolledIds] = useState([]);

 useEffect(()=>{
   const fetchingdata = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    setCourses(data || []);
    if (userId) {
      const { data: myEnrollments } = await supabase
        .from("enrollments")
        .select("course_id")
        .eq("user_id", userId);
      const ids = myEnrollments?.map((items) => items.course_id);
      setEnrolledIds(ids);
    }
  };
  fetchingdata()
 },[userId])

  const handleEnroll = async (courseId) => {
    if(enrolledIds.includes(courseId))return;
    const { error } = await supabase
      .from("enrollments")
      .insert([{ user_id: userId, course_id: courseId }]);
   if (!error) {
      alert("Enrolled Successfully!");
      setEnrolledIds([...enrolledIds, courseId]);
    }
  };


 return (

  <div>
    <Navbar/>
      <div className="grid md:grid-cols-3 gap-6">
      {courses.map((item) => {
        // CHECK: Kya ye course ID enrolledIds array mein majood hai?
        const isAlreadyEnrolled = enrolledIds.includes(item.id);
// deadline
const today = new Date()
const deadlineDate = new Date(item.deadline)
const isExpired = today > deadlineDate

const isDisabled = isAlreadyEnrolled || isExpired 
        return (
          <div key={item.id} className="border p-4 rounded-xl shadow">
            <h2 className="text-xl font-bold">{item.name}</h2>
           <p className={`text-sm mb-4 ${isExpired ? "text-red-500 font-bold" : "text-gray-500"}`}>
              Deadline: {item.deadline} {isExpired && "(Expired)"}
            </p> 
            <button
              onClick={() => handleEnroll(item.id)}
              disabled={isDisabled} 
              className={`w-full py-2 rounded-lg mt-4 transition ${
               isDisabled
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isDisabled ? "ALREADY ENROLLED" : isExpired? "DEADLINE PASSED" : "ENROLL NOW"}
            </button>
          </div>
        );
      })}
    </div>
  </div>
  );
};
export default CoursesPage;
