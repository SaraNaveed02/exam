"use client";

import React from "react";
import ProtectedRoute from "../compoments/ProtectedRoute";
import { AdminSidebar } from "../compoments/navbar";

const AdminRouteLayout = ({ children }) => {
  return <ProtectedRoute allowedRole="admin">
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <AdminSidebar  />
      {children}
    </div>
    </ProtectedRoute>;
};

export default AdminRouteLayout;
