"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../compoments/supabase";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ role, setRole] = useState("user");
const router = useRouter()
  const handleSignup = async (e)=>{
    e.preventDefault();


const { error,data } = await supabase
  .from('users')
  .insert([{ email: email, password: password, name: name, role: role }])
if (error) {
      console.error("Error inserting data:", error.message);
      alert("Error: " + error.message);
    
    } else {
      console.log("Success:", data);
      router.push('/login')
    }
   
  }
  return <div>
    <h1>Sign Up</h1>
    <form onSubmit={handleSignup}>
      <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <input type="text" placeholder="Role" value={role} onChange={(e)=>setRole(e.target.value)} />
        <button type="submit"  >Sign Up</button>
    </form>
  </div>;
};

export default SignUpPage;
