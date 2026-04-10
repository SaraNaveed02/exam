"use client";
import { AdminSidebar } from "@/app/compoments/navbar";
import { supabase } from "@/app/compoments/supabase";
import React, { useEffect, useState } from "react";

const StudentsListPage = () => {
  const [students, setStudents] = useState([]);
  const [enrollments,setEnrollments] = useState([])
 useEffect(()=>{
 const fetchData= async()=>{
       const [studentsRes, enrollmentsRes] = await Promise.all([
        supabase.from("users").select('*'),
        supabase.from("enrollments").select('*')
      ])
if (studentsRes.error){
  console.log(studentsRes.error)
}else{
  setStudents(studentsRes.data || [])
  console.log(studentsRes.data)
}
if(enrollmentsRes.error){
  console.log(enrollmentsRes.error)

}else{
  setEnrollments(enrollmentsRes.data || [])
  console.log(enrollmentsRes.data)

}
 }
fetchData()
 },[])
  return (
    <div>
      <AdminSidebar />
   <div>
    {students.map((student) => {
  // Find enrollments belonging to this specific student
  const studentEnrollments = enrollments.filter(e => e.user_id === student.id);
console.log(studentEnrollments)
  return (
    <div key={student.id} className="p-4 border-b">
      <h1 className="text-xl font-bold">{student.name}</h1>
      <p className="text-black">{student.email}</p>
      
      {/* Displaying their specific enrollments */}
      <div className="mt-2">
        <h3 className="text-sm font-semibold">Enrollments:</h3>
        {studentEnrollments.length > 0 ? (
          <ul className="list-disc ml-5">
            {studentEnrollments.map((enrol) => (
              <li key={enrol.id}>{enrol.course_name || "Unknown Course"}</li>
            ))}
          </ul>
        ) : (
          <p className="text-xs italic">No active enrollments</p>
        )}
      </div>
    </div>
  );
})}
   </div>
    </div>
  );
};

export default StudentsListPage;
