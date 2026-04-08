"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Logout from "./Logout";
import Link from "next/link";
import { Home, Users, BookOpen, ClipboardCheck, Settings } from "lucide-react";

export const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">SMIT Portal</h1>

      {/* Menu */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
     
          <li onClick={() => router.push("/student")} className="cursor-pointer hover:text-blue-600 transition">
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



export const AdminSidebar = () => {

    const router = useRouter();

  return (
    <aside className="h-screen w-64 bg-slate-900 text-white fixed left-0 top-0 shadow-lg">
      
      {/* Logo / Title */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-2">

          <li onClick={()=>router.push('/admin')} className="sidebarItem">
            <Home size={18} />
            <span>Home</span>
          </li>

          <li   onClick={()=>router.push('/admin/studentslist')} className="sidebarItem">
            <Users size={18} />
            <span>Students</span>
          </li>

          <li   onClick={()=>router.push('/admin/courseslist')} className="sidebarItem">
            <BookOpen size={18} />
            <span>Courses</span>
          </li>

          <li   onClick={()=>router.push('/admin/studentsattendance')} className="sidebarItem">
            <ClipboardCheck size={18} />
            <span>Attendance</span>
          </li>

          <li   onClick={()=>router.push('/admin/settings')} className="sidebarItem">
            <Settings size={18} />
            <span>Settings</span>
          </li>

        </ul>
      </nav>
    </aside>
  );
};