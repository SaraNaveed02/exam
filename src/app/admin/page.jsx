"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, BookOpen, ClipboardCheck } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { supabase } from "@/app/compoments/supabase";

const AdminDashboard = () => {
  const router = useRouter();
  const [studentCount, setStudentCount] = useState(null);
  const [courseCount, setCourseCount] = useState(null);
  const [attendanceCount, setAttendanceCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      setLoading(true);
      const [studentsRes, coursesRes, attendanceRes] = await Promise.all([
        supabase
          .from("users")
          .select("id", { count: "exact", head: true })
          .neq("role", "admin"),
        supabase.from("courses").select("id", { count: "exact", head: true }),
        supabase.from("attendance").select("id", { count: "exact", head: true }),
      ]);

      setStudentCount(
        studentsRes.error ? 0 : studentsRes.count ?? 0,
      );
      setCourseCount(coursesRes.error ? 0 : coursesRes.count ?? 0);
      setAttendanceCount(attendanceRes.error ? 0 : attendanceRes.count ?? 0);
      setLoading(false);
    };

    loadCounts();
  }, []);

  const cards = [
    {
      title: "Total students",
      value: studentCount,
      description: "View and manage all students",
      icon: Users,
      href: "/admin/studentslist",
      accent: "from-blue-500 to-blue-600",
    },
    {
      title: "Total courses",
      value: courseCount,
      description: "View and add courses",
      icon: BookOpen,
      href: "/admin/courseslist",
      accent: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Attendance",
      value: attendanceCount,
      description: "Mark or update student attendance",
      icon: ClipboardCheck,
      href: "/admin/studentsattendance",
      accent: "from-violet-500 to-violet-600",
    },
  ];

  return (
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Overview of your portal. Select a card to open that section.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(
            ({
              title,
              value,
              description,
              icon: Icon,
              href,
              accent,
            }) => (
              <button
                key={href}
                type="button"
                onClick={() => router.push(href)}
                className="text-left rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br ${accent} p-3 text-white mb-4`}
                >
                  <Icon size={24} />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <p className="mt-2 text-3xl font-bold text-gray-900 tabular-nums">
                  {loading ? "…" : value}
                </p>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
              </button>
            ),
          )}
        </div>
      </div>
  );
};

export default AdminDashboard;
