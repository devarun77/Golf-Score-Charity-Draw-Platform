import { useNavigate } from "react-router-dom";
import React from 'react';


export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

      {/* HERO */}
      <div className="max-w-4xl mx-auto text-center animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Play. Win. Give Back.
        </h1>

        <p className="text-gray-400 mb-6">
          Track your golf scores, enter monthly draws, and support a charity —
          all in one place.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded transition transform hover:scale-105"
        >
          Get Started
        </button>
      </div>

      {/* FEATURES */}
      <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-3 gap-6">

        <div className="bg-gray-900 p-6 rounded-2xl hover:scale-105 transition animate-fadeIn">
          <h3 className="text-xl mb-2">Track Scores</h3>
          <p className="text-gray-400">
            Add your latest golf scores and stay consistent.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl hover:scale-105 transition animate-fadeIn [animation-delay:0.2s]">
          <h3 className="text-xl mb-2">Win Monthly Draws</h3>
          <p className="text-gray-400">
            Your scores become your entry into exciting prize draws.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl hover:scale-105 transition animate-fadeIn [animation-delay:0.4s]">
          <h3 className="text-xl mb-2">Support Charity</h3>
          <p className="text-gray-400">
            A portion of your subscription goes to a cause you care about.
          </p>
        </div>

      </div>

      {/* CTA SECTION */}
      <div className="text-center mt-16">
        <h2 className="text-2xl mb-4">
          Ready to play and make an impact?
        </h2>

        <button
          onClick={() => navigate("/signup")}
          className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded transition transform hover:scale-105"
        >
          Join Now
        </button>
      </div>

    </div>
  );
}