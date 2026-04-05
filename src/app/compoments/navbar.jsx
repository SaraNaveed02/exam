"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Logout from "./Logout";
import Link from "next/link";
export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">SMIT Portal</h1>

      {/* Menu */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
     
          <li onClick={() => router.push("/student/profile")} className="cursor-pointer hover:text-blue-600 transition">
            Profile
          </li>
       
          <li onClick={() => router.push("/student/courses")} className="cursor-pointer hover:text-blue-600 transition">
            Courses
          </li>
        
          <li onClick={() => router.push("/student/attendance")} className="cursor-pointer hover:text-blue-600 transition">
            Attendance
          </li>
      </ul>

      {/* Logout Button */}
      <Logout />
    </nav>
  );
};
