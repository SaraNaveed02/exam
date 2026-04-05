"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import smit from "../../../public/images/smit.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">SMIT Portal</h1>

        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center px-10 md:px-20 py-16 gap-10">
        
        {/* Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            Welcome To <span className="text-blue-600">SMIT Content Portal</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Access all study materials, notes, and resources in one place.
            Explore lecture notes, video tutorials, practice questions and
            everything you need to excel in your studies.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/signup">
              <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md">
                Get Started
              </button>
            </Link>

            <Link href="/login">
              <button className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
                Already a Student?
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <Image
            src={smit}
            alt="SMIT"
            width={500}
            height={400}
            className="rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-10 md:px-20 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          What You’ll Get
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Lecture Notes</h3>
            <p className="text-gray-600">
              Access organized notes from every class anytime.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Video Tutorials</h3>
            <p className="text-gray-600">
              Learn with recorded lectures and helpful tutorials.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Practice Questions</h3>
            <p className="text-gray-600">
              Test your skills with quizzes and assignments.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;