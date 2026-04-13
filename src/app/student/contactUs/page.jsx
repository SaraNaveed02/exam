"use client";
import React, { useState } from 'react'
import { supabase } from '@/app/compoments/supabase'
import { useUser } from '@/app/compoments/ContentApi';

const page = () => {
    const { userId } = useUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const handleSumbit =async () => {
        const { error } = await supabase
  .from('contactUs')
  .insert({ name: name, email: email, message: message ,user_id: userId})
  
  if(error){
    alert(error.message);
  } else {
    alert("Message sent successfully");
    setEmail("");
    setMessage("");
    setName("");
  }
    }
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
          <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
            
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Contact Us ✉️
            </h1>
            <p className="text-gray-500 mb-6">
              Have a question? Send us a message and we’ll get back to you.
            </p>
      
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSumbit();
              }}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
      
              {/* Email */}
              <div>
                <label className="text-sm text-gray-600">Email Address</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
      
              {/* Message */}
              <div>
                <label className="text-sm text-gray-600">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full mt-1 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
      
              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      );
}

export default page