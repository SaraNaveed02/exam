import React from "react";
import { supabase } from "./supabase";
import { useRouter } from "next/navigation";

const logout = () => {
    const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }else{
        router.push("/");
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

export default logout;
