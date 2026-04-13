"use client";

import React from "react";
import { supabase } from "./supabase";
import { useRouter } from "next/navigation";
import { useUser } from "./ContentApi";

const Logout = () => {
  const router = useRouter();
  const { setUserId } = useUser();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (_error) {
      // We keep logout resilient even if Supabase auth session does not exist.
    } finally {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("currentUserRole");
      setUserId(null);
      router.replace("/login");
    }
  };

  return (
    <div>
      <button
        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
