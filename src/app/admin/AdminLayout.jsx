"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "../compoments/navbar";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static z-50
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300
        `}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-5">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-3 p-4 bg-white shadow">
          <Menu className="cursor-pointer" onClick={() => setOpen(true)} />
          <h1 className="font-bold text-lg">Admin Panel</h1>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}