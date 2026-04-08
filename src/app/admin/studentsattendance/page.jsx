"use client";
import { useUser } from "@/app/compoments/ContentApi";
import { supabase } from "@/app/compoments/supabase";
import React, { useEffect } from "react";
import { useState } from "react";

const AttendanceListPage = () => {
  const { userId } = useUser();
  const [present, setpresent] = useState("");
  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [absent, setAbsent] = useState("");
  const [leave, setLeave] = useState("");
  const [date, setDate] = useState("");
  const [totalClasees, settotalClasees] = useState("");
  const [loading, setLoading] = useState(false);
  // fetching students
  useEffect(() => {
    const fetchingStudents = async () => {
      const { data, error } = await supabase.from("users").select("*");
      setStudentsList(data || []);
    };
    fetchingStudents();
  }, []);

  // inserting attendance
 const handleAttendance = async () => {
    if (!selectedStudentId || !date) {
      alert("Please select a student and date");
      return;
    }
    
    setLoading(true);

    // Calculation yahan karein taake latest values milen
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
        // Column ka naam wahi likhein jo Supabase table mein hai (total_Clasees)
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
  };;
  // updating data
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
          total_Clasees: currentTotal, // Update ke waqt bhi naya total bhejien
        })
      .eq("user_id", selectedStudentId)
      .eq("date", date);

    if (error) {
      console.log(error);
    } else {
      alert("Updated successfully");
    }
  };



  // Calculate currentTotal for display
  const pre = parseInt(present) || 0;
  const abs = parseInt(absent) || 0;
  const lea = parseInt(leave) || 0;
  const currentTotal = pre + abs + lea;

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Admin: Mark Student Attendance
      </h2>

      <div className="grid gap-4 bg-gray-50 p-6 rounded-xl border">
        {/* Step 2: Dropdown for selecting student */}
        <label className="font-semibold text-gray-700">Select Student:</label>
        <select
          className="border p-2 rounded bg-white"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
        >
          <option value="">-- Choose a Student --</option>
          {studentsList.map((items, i) => (
            <option key={i} value={items.id}>
              {items.name} ({items.email})
            </option>
          ))}
        </select>

        <div className="grid grid-cols-3 gap-2">
          <div  className="border p-2">
            {currentTotal}
          </div>
          <input
            type="number"
            placeholder="Present"
            className="border p-2"
            value={present}
            onChange={(e) => setpresent(e.target.value)}
          />
          <input
            type="number"
            placeholder="Absent"
            className="border p-2"
            value={absent}
            onChange={(e) => setAbsent(e.target.value)}
          />
          <input
            type="number"
            placeholder="Leave"
            className="border p-2"
            value={leave}
            onChange={(e) => setLeave(e.target.value)}
          />
        </div>

        <input
          type="date"
          className="border p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={handleAttendance}
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "SUBMIT ATTENDANCE"}
        </button>

        <button
          onClick={updateAttendance}
          className="bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AttendanceListPage;
