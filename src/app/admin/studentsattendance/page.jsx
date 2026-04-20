"use client";

import { supabase } from "@/app/compoments/supabase";
import AdminLayout from "@/app/admin/AdminLayout";
import React, { useEffect, useState } from "react";

const AttendanceListPage = () => {
  const [present, setpresent] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [absent, setAbsent] = useState("");
  const [leave, setLeave] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchingStudents = async () => {
      const { data } = await supabase.from("users").select("*");
      setStudentsList(data || []);
    };
    fetchingStudents();
  }, []);

  const handleAttendance = async () => {
    if (!selectedStudentId || !date) {
      alert("Please select a student and date");
      return;
    }

    setLoading(true);

    const pre = parseInt(present) || 0;
    const abs = parseInt(absent) || 0;
    const lea = parseInt(leave) || 0;
    const currentTotal = pre + abs + lea;

    const { error } = await supabase.from("attendance").insert([
      {
        present: pre,
        absent: abs,
        leave: lea,
        date: date,
        total_Clasees: currentTotal,
        user_id: selectedStudentId,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error: " + error.message);
    } else {
      alert("Attendance submitted successfully!");
      setpresent("");
      setAbsent("");
      setLeave("");
      setDate("");
    }
    setLoading(false);
  };

    const updateAttendance = async () => {
    const pre = parseInt(present) || 0;
    const abs = parseInt(absent) || 0;
    const lea = parseInt(leave) || 0;
    const currentTotal = pre + abs + lea;

    const { error } = await supabase
      .from("attendance")
      .update({
        present: pre,
        absent: abs,
        leave: lea,
        date: date,
        total_Clasees: currentTotal,
      })
      .eq("user_id", selectedStudentId)
      .eq("date", date);

    if (error) {
      console.log(error);
    } else {
      alert("Updated successfully");
    }
  };

  const pre = parseInt(present) || 0;
  const abs = parseInt(absent) || 0;
  const lea = parseInt(leave) || 0;
  const currentTotal = pre + abs + lea;

  return (
    
      <div className="mx-auto max-w-2xl">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Mark student attendance
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Select a student, enter counts, and choose the date.
        </p>

        <div className="mt-6 grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-gray-700">
              Student
            </span>
            <select
              className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm sm:text-base"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              <option value="">— Choose a student —</option>
              {studentsList.map((items, i) => (
                <option key={i} value={items.id}>
                  {items.name} ({items.email})
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="mb-2 block text-sm font-semibold text-gray-700">
              Totals
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="col-span-2 flex items-center justify-center rounded-lg border border-gray-200 bg-white p-3 text-center sm:col-span-1">
                <span className="text-sm text-gray-600">Sum</span>
                <span className="ml-2 text-lg font-bold tabular-nums">
                  {currentTotal}
                </span>
              </div>
              <input
                type="number"
                inputMode="numeric"
                placeholder="Present"
                className="min-w-0 rounded-lg border border-gray-300 p-2.5 text-sm sm:text-base"
                value={present}
                onChange={(e) => setpresent(e.target.value)}
              />
              <input
                type="number"
                inputMode="numeric"
                placeholder="Absent"
                className="min-w-0 rounded-lg border border-gray-300 p-2.5 text-sm sm:text-base"
                value={absent}
                onChange={(e) => setAbsent(e.target.value)}
              />
              <input
                type="number"
                inputMode="numeric"
                placeholder="Leave"
                className="col-span-2 min-w-0 rounded-lg border border-gray-300 p-2.5 text-sm sm:col-span-1 sm:text-base"
                value={leave}
                onChange={(e) => setLeave(e.target.value)}
              />
            </div>
          </div>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-gray-700">
              Date
            </span>
            <input
              type="date"
              className="w-full max-w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm sm:text-base"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleAttendance}
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:bg-gray-400 sm:w-auto sm:min-w-40"
            >
              {loading ? "Saving…" : "Submit attendance"}
            </button>
            <button
              type="button"
              onClick={updateAttendance}
              className="w-full rounded-lg border border-blue-600 bg-white px-4 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 sm:w-auto sm:min-w-40"
            >
              Update
            </button>
          </div>
        </div>
      </div>
  );
};

export default AttendanceListPage;
