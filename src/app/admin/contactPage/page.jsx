"use client";

import React, { useEffect, useState } from "react";
import AdminLayout from "@/app/admin/AdminLayout";
import { supabase } from "@/app/compoments/supabase";

const Page = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessage = async () => {
    const { data, error } = await supabase.from("contactUs").select("*");
    if (error) {
      console.log(error);
    } else {
      setMessages(data || []);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl px-2 py-2 sm:px-4 sm:py-4">
        <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl">
          Contact Messages
        </h1>
        <p className="mb-6 text-sm text-gray-500 sm:text-base">
          View messages sent by students from the contact page.
        </p>

        {messages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center text-gray-500 shadow-sm">
            No messages yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
            {messages.map((message) => (
              <article
                key={message.id}
                className="flex min-w-0 flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
              >
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-gray-800 sm:text-xl">
                      {message.name}
                    </h2>
                    <p className="mt-1 break-all text-sm text-gray-500">
                      {message.email}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600 sm:text-sm">
                    Message
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 sm:p-4">
                  <p className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-gray-700 sm:text-base">
                    {message.message}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Page;