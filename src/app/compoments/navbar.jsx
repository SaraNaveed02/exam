"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Logout from "./Logout";
import {
  Home,
  Users,
  BookOpen,
  ClipboardCheck,
  X,
  Menu,
} from "lucide-react";

export const Navbar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (path) => {
    router.push(path);
    setMobileOpen(false);
  };

  const linkClass =
    "cursor-pointer rounded-lg px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 md:px-0 md:py-0 md:hover:bg-transparent";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:py-4">
        <h1 className="shrink-0 text-lg font-bold text-blue-600 sm:text-2xl">
          SMIT Portal
        </h1>

        <ul className="hidden flex-1 justify-center gap-6 text-sm font-medium text-gray-700 md:flex lg:gap-8 lg:text-base">
          <li onClick={() => router.push("/student")} className={linkClass}>
            Profile
          </li>
          <li
            onClick={() => router.push("/student/courses")}
            className={linkClass}
          >
            Courses
          </li>
          <li
            onClick={() => router.push("/student/attendance")}
            className={linkClass}
          >
            Attendance
          </li>
        </ul>

        <div className="hidden shrink-0 md:block">
          <Logout />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            <li>
              <button
                type="button"
                className="w-full rounded-lg px-3 py-3 text-left text-base font-medium text-gray-800 hover:bg-gray-50"
                onClick={() => go("/student")}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full rounded-lg px-3 py-3 text-left text-base font-medium text-gray-800 hover:bg-gray-50"
                onClick={() => go("/student/courses")}
              >
                Courses
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full rounded-lg px-3 py-3 text-left text-base font-medium text-gray-800 hover:bg-gray-50"
                onClick={() => go("/student/attendance")}
              >
                Attendance
              </button>
            </li>
          </ul>
          <div className="mt-3 border-t border-gray-100 pt-3 [&_button]:w-full">
            <Logout />
          </div>
        </div>
      )}
    </nav>
  );
};



export const AdminSidebar = ({ onNavigate }) => {
  const router = useRouter();

  const item =
    "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-800 transition";

  const go = (path) => {
    router.push(path);
    onNavigate?.();
  };

  return (
    <aside className="flex h-full min-h-screen w-[min(100vw,16rem)] sm:w-64 flex-col bg-slate-900 text-white shadow-lg">
      <div className="relative flex shrink-0 items-center justify-between gap-2 border-b border-slate-700 p-4 sm:p-6 pr-12 md:pr-6">
        <h1 className="text-lg font-bold sm:text-2xl">Admin Panel</h1>
        {onNavigate && (
          <button
            type="button"
            aria-label="Close menu"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
            onClick={onNavigate}
          >
            <X size={22} />
          </button>
        )}
      </div>

      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3 sm:p-4">
        <ul className="space-y-1 sm:space-y-2">
          <li onClick={() => go("/admin")} className={item}>
            <Home size={18} /> Home
          </li>

          <li onClick={() => go("/admin/studentslist")} className={item}>
            <Users size={18} /> Students
          </li>

          <li onClick={() => go("/admin/courseslist")} className={item}>
            <BookOpen size={18} /> Courses
          </li>

          <li onClick={() => go("/admin/studentsattendance")} className={item}>
            <ClipboardCheck size={18} /> Attendance
          </li>
        </ul>
        <div className="mt-auto shrink-0 border-t border-slate-700 pt-4 [&_button]:w-full">
          <Logout />
        </div>
      </nav>
    </aside>
  );
};