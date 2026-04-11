"use client";

import AdminLayout from "@/app/admin/AdminLayout";
import { supabase } from "@/app/compoments/supabase";
import React, { useEffect, useState } from "react";

const StudentsListPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("users").select(`
        id,
        name,
        email,
        enrollments (
          id,
          course_name
        )
      `);

      if (error) {
        console.error(error);
      } else {
        setStudents(data || []);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Students
        </h1>
        <p className="mt-1 text-sm text-gray-600 sm:text-base">
          All registered students and their enrollments.
        </p>

        <div className="mt-6 space-y-4">
          {students.length === 0 ? (
            <p className="text-gray-500">No students found.</p>
          ) : (
            students.map((student) => (
              <article
                key={student.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {student.name}
                </h2>
                <p className="mt-1 break-all text-sm text-gray-700 sm:text-base">
                  {student.email}
                </p>

                <div className="mt-3 border-t border-gray-100 pt-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Enrollments
                  </h3>
                  {student.enrollments && student.enrollments.length > 0 ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-800 sm:text-base">
                      {student.enrollments.map((enrol) => (
                        <li key={enrol.id}>{enrol.course_name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-xs italic text-gray-500 sm:text-sm">
                      No active enrollments
                    </p>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default StudentsListPage;
