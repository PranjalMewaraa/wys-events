import React from "react";
import { FaInstagram, FaLinkedin, FaStar } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";

const Matching = () => {
  return (
    <Layout>
      <div className="w-full h-full bg-white mx-auto p-4 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button>&larr;</button>
          <span className="font-semibold">@AditiWanders</span>
          <button>⋮</button>
        </div>

        <div className="flex mt-4 max-w-sm w-full max-h-64 gap-4 items-center">
          <div className="w-1/2 h-full aspect-square object-fill overflow-hidden rounded-xl">
            <img
              src="https://imgs.search.brave.com/VHUvL7y6Eh8PrBgb1vDIOWhqQwsV7dxyDXNlLWHtT0k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1i/ZWF1dGlmdWwtZ2ly/bC1ibGFjay10c2hp/cnRfNDI3NzcxLTM3/MC5qcGc_c2VtdD1h/aXNfaHlicmlk"
              className="h-full origin-top object-top object-cover w-full"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Aditi WanderLust</h2>
            <div className="flex flex-wrap items-center text-sm">
              <p className=" text-gray-500">Female</p>
              <p className="flex items-center  text-gray-500">
                <GrLocationPin /> Mumbai, India
              </p>
            </div>
            <div className="flex gap-2 py-2">
              <FaInstagram />
              <FaLinkedin />
            </div>
            <div className="flex gap-2">
              <div className="flex justify-center items-center bg-green-500 p-2 text-white poppins-semibold rounded-lg">
                80%
              </div>
              <div className="flex flex-col gap-1 text-xs justify-center items-center bg-[#2D6F2C] p-2 text-white poppins-semibold rounded-lg">
                <p>Host Rating</p>
                <p className="flex items-center text-yellow-300 gap-2 text-sm">
                  <FaStar /> 4.3
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
        {/* Travel Style */}
        <div className="mt-4">
          <h2 className=" font-semibold">My travel style</h2>
          <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
            {["Explorer", "Social Butterfly", "Spontaneous"].map((style) => (
              <span
                key={style}
                className="px-3 py-1 bg-orange-300 text-white rounded-full text-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
        {/* Questions & Answers */}
        <div className="mt-4 space-y-4">
          {[
            {
              icon: "🎒",
              question: "What's one thing you always pack?",
              answer: "A journal & my camera!",
            },
            {
              icon: "🎶",
              question: "What's your travel soundtrack?",
              answer: "Coldplay & Lo-fi beats on the road!",
            },
            {
              icon: "🎬",
              question: "One movie that makes you want to travel?",
              answer: "A journal & my camera!",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-orange-400 text-white p-4 rounded-lg"
            >
              <p className="font-semibold italic">
                {item.icon} {item.question}
              </p>
              <p className="mt-1">{item.answer}</p>
            </div>
          ))}
        </div>
        {/* Ideal Trips */}
        <div className="mt-4">
          <h2 className=" font-semibold">My ideal trips</h2>
          <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
            {["Explorer", "Social Butterfly", "Spontaneous"].map((style) => (
              <span
                key={style}
                className="px-3 py-1 bg-orange-300 text-white rounded-full text-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
        {/* Questions & Answers */}
        <div className="mt-4 space-y-4">
          {[
            {
              icon: "🎒",
              question: "What's one thing you always pack?",
              answer: "A journal & my camera!",
            },
            {
              icon: "🎶",
              question: "What's your travel soundtrack?",
              answer: "Coldplay & Lo-fi beats on the road!",
            },
            {
              icon: "🎬",
              question: "One movie that makes you want to travel?",
              answer: "A journal & my camera!",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-orange-400 text-white p-4 rounded-lg"
            >
              <p className="font-semibold italic">
                {item.icon} {item.question}
              </p>
              <p className="mt-1">{item.answer}</p>
            </div>
          ))}
        </div>
        {/* Events Hosted Section */}
        <h2 className="mt-6 font-semibold text-lg">Events hosted</h2>
        <div className="mt-2 bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="/images/screenshot.png" // Replace with actual hosted image
            alt="Himalayas Trek"
            className="w-full h-[160px] object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold text-lg">Himalayas Trek</h3>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              📅 26 Jan 2025 · 8:00 AM
            </p>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              📍 Prayagraj, Uttarakhand
            </p>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              👥 6 Seekers
            </p>
            <div className="mt-2 flex items-center">
              <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-md">
                Rating 4.2 ★
              </span>
            </div>
          </div>
        </div>
        {/* Events Attended Section */}
        <h2 className="mt-6 font-semibold text-lg">Events Attended</h2>
        <div className="mt-2 bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="/images/screenshot.png" // Replace with actual hosted image
            alt="Himalayas Trek"
            className="w-full h-[160px] object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold text-lg">Himalayas Trek</h3>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              📅 26 Jan 2025 · 8:00 AM
            </p>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              📍 Prayagraj, Uttarakhand
            </p>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              👥 6 Seekers
            </p>
            <div className="mt-2 flex items-center">
              <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-md">
                Rating 4.2 ★
              </span>
            </div>
          </div>
        </div>
        {/* Say Hello Button */}
        <button className="mt-6 w-full bg-gray-900 text-white text-lg py-3 rounded-lg flex items-center justify-center font-medium">
          👋 Say Hello
        </button>
      </div>
      ]
    </Layout>
  );
};

export default Matching;
