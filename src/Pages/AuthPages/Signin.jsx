import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../Firebase/fireBaseConfig";
import axios from "axios";
import Layout from "../Onboarding/Layout";
import ProgressBar from "../../components/ProgressBar";
import InputBox from "../../components/InputBox";
import SelectGroup from "../../components/SelectGroup";
import PhotoPicker from "../../components/PhotoPicker";
import "../../App.css";

const UnifiedAuth = () => {
  const [firebaseToken, setFirebaseToken] = useState(null);
  const [page, setPage] = useState(-1);
  const [formData, setFormData] = useState({});

  const genderOption = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const traveldesc = [
    { label: "🌍 Explorer", value: "explorer", desc: "I want to see it" },
    { label: "🍹 Relaxer", value: "relaxer", desc: "Beach, spa, easygoing" },
    { label: "🎉 Social Butterfly", value: "social", desc: "Nightlife, events, people" },
    { label: "🎒 Backpacker", value: "backpacker", desc: "Low-budget, high-adventure" },
    { label: "🗘 Planner", value: "planner", desc: "I love making itineraries" },
    { label: "🚀 Spontaneous", value: "spontaneous", desc: "Book a ticket & go!" },
  ];

  const traveldesc2 = [
    { label: "🌍 Hiking in mountain", value: "hiking" },
    { label: "🍹 Tropical Beach Escape", value: "beach" },
    { label: "🎉 Cultural and Historical Sites", value: "culture" },
    { label: "🎒 Music Festival and Nightlife", value: "music" },
    { label: "🗘 Adventure Sport", value: "adventure" },
    { label: "🚀 A food hopping journey", value: "food" },
    { label: "🎒 Road trips and long drive", value: "roadtrip" },
    { label: "🗘 Camping and offbeat destinations", value: "camping" },
  ];

  const travelGeneric = [
    { label: "🌍 Slow and Immersive", value: "slow" },
    { label: "🍹 Relaxer", value: "relaxer" },
    { label: "🎉 Social Butterfly", value: "social" },
    { label: "🎒 Backpacker", value: "backpacker" },
    { label: "🗘 Planner", value: "planner" },
  ];

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      setFirebaseToken(token);

      const res = await axios.post("https://wysbackend.onrender.com/api/users/check-user", {
        firebaseToken: token,
      });

      if (res.data.exists) {
        const loginRes = await axios.post("https://wysbackend.onrender.com/api/users/login", {
          firebaseToken: token,
        });

        const accessToken = loginRes.data.data.accessToken;
        const userID = loginRes.data.data.user._id;

        localStorage.setItem("userID", userID);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("authToken", token);

        window.location.href = "/";
      } else {
        setPage(0);
      }
    } catch (error) {
      console.error("Google sign-in failed", error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectionChange = (selected, name) => {
    setFormData((prev) => ({ ...prev, [name]: selected }));
  };

  const handleImageSelect = (file, name) => {
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleFinalSubmit = async () => {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => payload.append(key, v));
      } else {
        payload.append(key, value);
      }
    });
    payload.append("firebaseToken", firebaseToken);

    try {
      await axios.post("https://wysbackend.onrender.com/api/users/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const loginRes = await axios.post("https://wysbackend.onrender.com/api/users/login", {
        firebaseToken,
      });

      const accessToken = loginRes.data.data.accessToken;
      const userID = loginRes.data.data.user._id;

      localStorage.setItem("userID", userID);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("authToken", firebaseToken);

      window.location.href = "/";
    } catch (error) {
      console.error("Final submission failed:", error);
    }
  };

  if (page === -1) {
    return (
      <Layout>
        <div className="flex flex-col h-full flex-1 w-full justify-center gap-8 items-center">
          <p className="poppins-semibold-italic text-2xl text-center w-full">
            Place worth <span className="text-orange-400">Going</span>,<br />
            place worth <span className="text-orange-400">Knowing</span>
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition"
          >
            <img src="/google.webp" alt="Google" className="w-5 h-5" />
            <span className="text-base text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>
        </div>
      </Layout>
    );
  }

  const stepConfigs = [
    { title: "Create your", highlight: "account", content: (
      <>
        <InputBox label={"Hey traveler!"} label2={"What should we call you?"} placeholder={"Full Name"} name={"fullname"} onChange={handleInputChange} />
        <InputBox label={"Where are you now?"} placeholder={"City, Country"} name={"location"} onChange={handleInputChange} />
        <InputBox label={"When is your birthday!"} placeholder={"Date of Birth"} name={"dob"} type="date" onChange={handleInputChange} />
        <SelectGroup options={genderOption} onChange={(selected) => handleSelectionChange(selected, "gender")} />
        <PhotoPicker onImageSelect={(file) => handleImageSelect(file, "profilePic")} label={"Pick a profile photo to show your vibe!"} />
      </>
    ) },
    { title: "How do you love", highlight: "to travel", options: traveldesc, name: "travelStyle", isMulti: true, maxSelections: 3 },
    { title: "What is your", highlight: "Ideal Trip", options: traveldesc2, name: "idealTrip", isMulti: true, maxSelections: 3 },
    { title: "What is your", highlight: "travel Energy", options: travelGeneric, name: "travelEnergy", isMulti: true, maxSelections: 1 },
    { title: "Who do you", highlight: "Vibe with best", options: travelGeneric, name: "vibeMatch", isMulti: true, maxSelections: 1 },
    { title: "Last Minute trip", highlight: "What do you do", options: travelGeneric, name: "lastMinute", isMulti: true, maxSelections: 1 },
    { title: "Are you", highlight: "here for", options: travelGeneric, name: "hereFor", isMulti: true, maxSelections: 1 },
    { title: "Want to verify your profile for", highlight: "trust & safety", options: travelGeneric, name: "verifyReason", isMulti: true, maxSelections: 1 },
    { title: "Let's Make your", highlight: "Profile Interesting", content: (
      <>
        <PhotoPicker label="Multiple Photos (Max 3)" isMulti={true} maxSelections={6} onImageSelect={(files) => handleImageSelect(files, "gallery")} />
        <button type="submit" className="px-4 w-full bg-black rounded-xl text-white py-3">Finish & Start Exploring</button>
      </>
    ), finalStep: true }
  ];

  const currentStep = stepConfigs[page];

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center mt-4 gap-6">
        <ProgressBar width={page + 1} />
        <div className="w-full flex flex-col gap-6">
          <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
            {currentStep.title}<br /> <span className="text-amber-500 ">{currentStep.highlight}</span>
          </h1>
          <form
            className="flex px-8 w-full flex-col gap-8"
            onSubmit={(e) => {
              if (!currentStep.finalStep) e.preventDefault();
              currentStep.finalStep ? handleFinalSubmit() : setPage(page + 1);
            }}
          >
            {currentStep.content}
            {currentStep.options && (
              <SelectGroup
                options={currentStep.options}
                isMulti={currentStep.isMulti}
                maxSelections={currentStep.maxSelections}
                onChange={(selected) => handleSelectionChange(selected, currentStep.name)}
              />
            )}
            {!currentStep.finalStep && (
              <button type="submit" className="px-4 w-full bg-black rounded-xl text-white py-3">
                Continue
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UnifiedAuth;
