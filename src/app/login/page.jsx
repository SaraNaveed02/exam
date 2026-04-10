"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../compoments/supabase";
import { useUser } from "../compoments/ContentApi";
import Link from "next/link";

const Loginpage = () => {
  const { setUserId } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (data) {
      setUserId(data.id);
      localStorage.setItem("currentUser", data.id);
      if(data.role === "admin"){
        router.push("/admin");
      } else {
        router.push("/student");
      }
    } else {
      alert(error?.message);
      console.error(error?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 px-4">
      
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to access SMIT Content Portal
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?
          <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Loginpage;