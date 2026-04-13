"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase";

const roleHome = {
  admin: "/admin",
  user: "/student",
  student: "/student",
};

const normalizeRole = (role) => (role === "user" ? "student" : role);

const ProtectedRoute = ({ allowedRole, children }) => {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAccess = async () => {
      const currentUserId = localStorage.getItem("currentUser");
      const currentUserRole = localStorage.getItem("currentUserRole");

      if (!currentUserId) {
        router.replace("/login");
        return;
      }

      // Fast block for obvious role mismatch before DB call.
      if (currentUserRole && currentUserRole !== allowedRole) {
        router.replace(roleHome[currentUserRole] || "/login");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", currentUserId)
          .maybeSingle();

        if (!isMounted) return;

        if (error || !data?.role) {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("currentUserRole");
          router.replace("/login");
          return;
        }

        const normalizedRole = normalizeRole(data.role);
        localStorage.setItem("currentUserRole", normalizedRole);

        if (normalizedRole !== allowedRole) {
          router.replace(roleHome[data.role] || roleHome[normalizedRole] || "/login");
          return;
        }

        setIsAllowed(true);
      } catch (_error) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentUserRole");
        router.replace("/login");
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [allowedRole, router]);

  if (!isAllowed) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-50 px-4 text-sm text-slate-600">
        Checking authorization...
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
