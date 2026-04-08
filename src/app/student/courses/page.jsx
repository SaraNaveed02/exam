"use client";
import { supabase } from "@/app/compoments/supabase";
import React, { useState } from "react";

const CoursesPage = () => {
  const [courses, setcourses] = useState([]);
  const fetchingdata = async () => {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setcourses(data);
    }
  };
  const data = fetchingdata();
  return (
    <div>
      <h1>courses</h1>
      <span>we offer</span>
      {courses.map((items) => {
        return (
          <div key={items.id}>
            <h2>{items.name}</h2>
            <small>deadline: {items.deadline}</small>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesPage;
