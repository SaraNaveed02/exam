"use client";

import { Navbar } from "@/app/compoments/navbar";
import { supabase } from "@/app/compoments/supabase";
import { useUser } from "@/app/compoments/ContentApi";
import React, { useEffect, useState } from "react";

const Attendance = () => {
  const { userId } = useUser();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchAttendance = async () => {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("attendance")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        setRecords([]);
      } else {
        setRecords(data || []);
      }
      setLoading(false);
    };

    fetchAttendance();
  }, [userId]);

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          My attendance
        </h1>

        {!userId && (
          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Please log in to view your attendance.
          </p>
        )}

        {userId && loading && (
          <p className="mt-3 text-gray-600">Loading…</p>
        )}

        {userId && !loading && error && (
          <p className="mt-3 text-sm text-red-600 sm:text-base">
            Could not load attendance: {error}
          </p>
        )}

        {userId && !loading && !error && records.length === 0 && (
          <p className="mt-3 text-gray-600">No attendance records yet.</p>
        )}

        {userId && !loading && !error && records.length > 0 && (
          <>
            {/* Cards: small screens */}
            <ul className="mt-4 space-y-3 sm:hidden">
              {records.map((row) => (
                <li
                  key={row.id ?? `${row.user_id}-${row.date}`}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </p>
                  <p className="font-medium text-gray-900">{row.date}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-gray-500">Present</dt>
                      <dd className="font-medium tabular-nums">
                        {row.present ?? "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Absent</dt>
                      <dd className="font-medium tabular-nums">
                        {row.absent ?? "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Leave</dt>
                      <dd className="font-medium tabular-nums">
                        {row.leave ?? "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Total</dt>
                      <dd className="font-medium tabular-nums">
                        {row.total_Clasees ?? "—"}
                      </dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>

            {/* Table: sm+ */}
            <div className="mt-4 hidden overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm sm:block">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-3 py-3 font-semibold sm:px-4">Date</th>
                    <th className="px-3 py-3 font-semibold sm:px-4">Present</th>
                    <th className="px-3 py-3 font-semibold sm:px-4">Absent</th>
                    <th className="px-3 py-3 font-semibold sm:px-4">Leave</th>
                    <th className="px-3 py-3 font-semibold sm:px-4">
                      Total classes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((row) => (
                    <tr
                      key={row.id ?? `${row.user_id}-${row.date}`}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-3 py-3 sm:px-4">{row.date}</td>
                      <td className="px-3 py-3 tabular-nums sm:px-4">
                        {row.present ?? "—"}
                      </td>
                      <td className="px-3 py-3 tabular-nums sm:px-4">
                        {row.absent ?? "—"}
                      </td>
                      <td className="px-3 py-3 tabular-nums sm:px-4">
                        {row.leave ?? "—"}
                      </td>
                      <td className="px-3 py-3 tabular-nums sm:px-4">
                        {row.total_Clasees ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Attendance;
