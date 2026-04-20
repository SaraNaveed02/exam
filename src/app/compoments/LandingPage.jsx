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

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16 px-10 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-700">What Students Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-700 italic mb-4">“This portal made my studies so much easier. All resources in one place!”</p>
            <div className="font-semibold text-blue-600">— Ayesha, Web Student</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-700 italic mb-4">“Video tutorials and notes helped me clear my concepts quickly.”</p>
            <div className="font-semibold text-blue-600">— Bilal, App Dev Student</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-gray-700 italic mb-4">“Assignments and quizzes are very helpful for practice!”</p>
            <div className="font-semibold text-blue-600">— Sana, AI Student</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-10 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="font-semibold text-lg text-blue-700">How do I sign up?</h3>
            <p className="text-gray-600">Click the Sign Up button at the top and fill in your details. You’ll get instant access!</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-blue-700">Is the portal free?</h3>
            <p className="text-gray-600">Yes, all resources are free for enrolled students.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-blue-700">Who can I contact for help?</h3>
            <p className="text-gray-600">Use the contact form below or email support@smit.edu.pk for assistance.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-10 md:px-20 bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-700">Contact Us</h2>
        <form className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6">
          <input type="text" placeholder="Your Name" className="w-full border p-3 rounded-lg" />
          <input type="email" placeholder="Your Email" className="w-full border p-3 rounded-lg" />
          <textarea placeholder="Your Message" className="w-full border p-3 rounded-lg min-h-[100px]" />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 px-10 md:px-20 text-center mt-10 rounded-t-2xl">
        <div className="mb-2">&copy; {new Date().getFullYear()} SMIT Portal. All rights reserved.</div>
        <div className="flex justify-center gap-4 text-blue-200">
          <a href="https://facebook.com/SMIT.official" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
          <a href="https://twitter.com/SMIT_Official" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
          <a href="mailto:support@smit.edu.pk" className="hover:text-white">Email</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;