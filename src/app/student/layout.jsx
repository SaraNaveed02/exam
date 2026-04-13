"use client";

import React from "react";
import ProtectedRoute from "../compoments/ProtectedRoute";
import { Navbar } from "../compoments/navbar";

const StudentRouteLayout = ({ children }) => {
  return <ProtectedRoute allowedRole="student">
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <Navbar/>
      {children}
    </div>
    </ProtectedRoute>;
};

export default StudentRouteLayout;
