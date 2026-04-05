"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../compoments/supabase";
import { useUser } from "../compoments/ContentApi";

const Loginpage = () => {
  const {setUserId} = useUser()
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
    setUserId(data.id);  // save id in state
      localStorage.setItem("currentUser", data.id);  // save id in localStorage because when page refresh state will be lost but localStorage will not be lost until we clear it.
      (router.push("/"));
    } else {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Loginpage;
