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
  const [page, setPage] = useState(-1); // -1 means not started onboarding yet
  const [formData, setFormData] = useState({});
  const genderOption = [
    { label: "Male", value: "maale" },
    { label: "Female", value: "n" },
    { label: "Other", value: "other" },
  ];
  const traveldesc = [
    { label: "🌍 Explorer", value: "male", desc: "I want to see it" },
    { label: "🍹 Relaxer", value: "ww", desc: "Beach, spa, easygoing" },
    {
      label: "🎉 Social Butterfly",
      value: "Nightlife, xw, people",
      desc: "Nightlife, events, people",
    },
    {
      label: "🎒 Backpacker",
      value: "y",
      desc: "Low-budget, high-adventure",
    },
    { label: "🗺 Planner", value: "x", desc: "I love making itineraries" },
    {
      label: "🚀 Spontaneous",
      value: "Book a ticket & go!",
      desc: "Book a ticket & go!",
    },
  ];
  const traveldesc2 = [
    { label: "🌍 Hiking in mountain", value: "male" },
    { label: "🍹 Tropical Beach Escape", value: "ww" },
    {
      label: "🎉 Cultural and Historical Sites",
      value: "Nightlife, xw, people",
    },
    {
      label: "🎒 Music Festival and Nightlife",
      value: "y",
    },
    { label: "🗺 Adventure Sport", value: "x" },
    {
      label: "🚀 A food hopping journey",
      value: "Book a ticket & go!",
    },
    {
      label: "🎒 Road trips and long drive",
      value: "ys",
    },
    { label: "🗺 Camping and offbeat destinations", value: "x" },
  ];
  const traveldesc3 = [
    { label: "🌍 Slow and Immersive", value: "male" },
    { label: "🍹 Relaxer", value: "ww" },
    {
      label: "🎉 Social Butterfly",
      value: "Nightlife, xw, people",
    },
    {
      label: "🎒 Backpacker",
      value: "y",
    },
    { label: "🗺 Planner", value: "x" },
  ];

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const email = result.user.email;

      setFirebaseToken(token);

      // Check if user exists
      const res = await axios.post(
        "https://wysbackend.onrender.com/api/users/check-user",
        {
          firebaseToken: token,
        }
      );

      if (res.data.exists) {
        // Login request
        const loginRes = await axios.post(
          "https://wysbackend.onrender.com/api/users/login",
          {
            firebaseToken: token,
          }
        );

        const accessToken = loginRes.data.data.accessToken;
        const userID = loginRes.data.data.user._id;
        localStorage.setItem("userID", userID);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("authToken", token);

        window.location.href = "/"; // or use navigate("/")
      } else {
        setPage(0); // start onboarding
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
    console.log("Submitting with data: ", formData);

    try {
      // Register the user
      await axios.post(
        "https://wysbackend.onrender.com/api/users/register",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Then login
      const loginRes = await axios.post(
        "https://wysbackend.onrender.com/api/users/login",
        {
          firebaseToken,
        }
      );
      const accessToken = loginRes.data.data.accessToken;
      const userID = loginRes.data.data.user._id;
      localStorage.setItem("userID", userID);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("authToken", token);
      window.location.href = "/";
    } catch (error) {
      console.error("Final submission failed:", error);
    }
  };

  if (page === -1) {
    return (
      <Layout>
        <div className="flex  flex-col h-full flex-1 w-full justify-center gap-8 items-center">
          <p className=" poppins-semibold-italic text-2xl text-center w-full">
            Place worth <span className="text-orange-400">Going</span>,
            <br />
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

  // render onboarding steps like your existing logic (same structure as before)
  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center mt-4 gap-6">
        <ProgressBar width={page + 1} />
        {page === 0 && (
          <div className="w-full flex flex-col gap-6">
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              Create your <br />{" "}
              <span className="text-amber-500 ">account</span>
            </h1>
            <form className="flex px-8 w-full flex-col gap-8">
              <InputBox
                label={"Hey traveler!"}
                label2={"What should we call you?"}
                placeholder={"Full Name"}
                name={"fullname"}
              />
              <InputBox
                label={"Where are you now?"}
                placeholder={"City, Country"}
                name={"fullname"}
              />
              <InputBox
                label={"When is your birthday!"}
                placeholder={"Date of Birth"}
                name={"fullname"}
                type="date"
              />
              <SelectGroup
                options={genderOption}
                onChange={handleSelectionChange}
              />
              <PhotoPicker
                onImageSelect={handleImageSelect}
                label={"Pick a profile photo to \n\n show your vibe!"}
              />
              <button
                className="px-4 w-full bg-black rounded-xl text-white py-3"
                onClick={() => setPage(page + 1)}
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {page === 1 && (
          <div className="w-full flex flex-col gap-6">
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              How do you love <br />{" "}
              <span className="text-amber-500 ">to travel</span>
            </h1>
            <form className="flex px-8 w-full flex-col gap-8">
              <SelectGroup
                options={traveldesc}
                isMulti={true}
                maxSelections={3}
                onChange={handleSelectionChange}
              />
              <button
                className="px-4 w-full bg-black rounded-xl text-white py-3"
                onClick={() => setPage(page + 1)}
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {page === 2 && (
          <div className="w-full flex flex-col gap-6">
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              What is your <br />{" "}
              <span className="text-amber-500 ">Ideal Trip</span>
            </h1>
            <form className="flex px-8 w-full flex-col gap-8">
              <SelectGroup
                options={traveldesc2}
                isMulti={true}
                maxSelections={3}
                onChange={handleSelectionChange}
                clx={"w-full h-full grid grid-cols-2 gap-4"}
              />
              <button
                className="px-4 w-full bg-black rounded-xl text-white py-3"
                onClick={() => setPage(page + 1)}
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {page === 3 && (
          <div className="w-full flex flex-col gap-6">
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              What is your <br />{" "}
              <span className="text-amber-500 ">travel Energy</span>
            </h1>
            <form className="flex px-8 w-full flex-col gap-8">
              <SelectGroup
                options={traveldesc3}
                isMulti={true}
                maxSelections={1}
                onChange={handleSelectionChange}
              />
              <button
                className="px-4 w-full bg-black rounded-xl text-white py-3"
                onClick={() => setPage(page + 1)}
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {page === 4 && (
          <div className="w-full flex flex-col gap-6">
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              Who do you
              <br /> <span className="text-amber-500 ">Vibe with best</span>
            </h1>
            <form className="flex px-8 w-full flex-col gap-8">
              <SelectGroup
                options={traveldesc3}
                isMulti={true}
                maxSelections={1}
                onChange={handleSelectionChange}
              />
              <button
                className="px-4 w-full bg-black rounded-xl text-white py-3"
                onClick={() => setPage(page + 1)}
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {page === 5 && (
          <div className="w-full flex flex-col gap-6">
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              Last Minute trip
              <br /> <span className="text-amber-500 ">What do you do</span>
            </h1>
            <form className="flex px-8 w-full flex-col gap-8">
              <SelectGroup
                options={traveldesc3}
                isMulti={true}
                maxSelections={1}
                onChange={handleSelectionChange}
              />
              <button
                className="px-4 w-full bg-black rounded-xl text-white py-3"
                onClick={() => setPage(page + 1)}
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {page === 6 && (
          <div className="w-full flex flex-col gap-6">
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              Are you
              <br /> <span className="text-amber-500 ">here for</span>
            </h1>
            <form className="flex px-8 w-full flex-col gap-8">
              <SelectGroup
                options={traveldesc3}
                isMulti={true}
                maxSelections={1}
                onChange={handleSelectionChange}
              />
              <button
                className="px-4 w-full bg-black rounded-xl text-white py-3"
                onClick={() => setPage(page + 1)}
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {page === 7 && (
          <div className="w-full flex flex-col gap-6">
            <h1 className="poppins-medium-italic flex text-center flex-col items-center leading-6 text-2xl">
              Want to verify your profile for
              <br /> <span className="text-amber-500 ">trust & safety</span>
            </h1>
            <form className="flex px-8 w-full flex-col gap-8">
              <SelectGroup
                options={traveldesc3}
                isMulti={true}
                maxSelections={1}
                onChange={handleSelectionChange}
              />
              <button
                className="px-4 w-full bg-black rounded-xl text-white py-3"
                onClick={() => setPage(page + 1)}
              >
                Continue
              </button>
            </form>
          </div>
        )}
        {page === 8 && (
          <div className="w-full flex flex-col gap-6">
            <h1 className="poppins-light-italic flex flex-col text-center items-center leading-6 text-2xl">
              Let's Make your <br />{" "}
              <span className="text-amber-500 ">Profile Interesting</span>
            </h1>
            <form
              className="flex px-8 w-full flex-col gap-8"
              onSubmit={(e) => {
                e.preventDefault();
                handleFinalSubmit();
              }}
            >
              <PhotoPicker
                label="Multiple Photos (Max 3)"
                isMulti={true}
                maxSelections={6}
                onImageSelect={handleImageSelect}
              />
              <InputBox
                label={"Hey traveler!"}
                label2={"What should we call you?"}
                placeholder={"Full Name"}
                name={"fullname"}
              />
              <InputBox
                label={"Where are you now?"}
                placeholder={"City, Country"}
                name={"location"}
              />
              <InputBox
                label={"When is your birthday?"}
                placeholder={"Date of Birth"}
                name={"dob"}
              />
              <SelectGroup
                options={genderOption}
                onChange={handleSelectionChange}
              />
              <PhotoPicker
                onImageSelect={handleImageSelect}
                label={"Pick a profile photo to \n\n show your vibe!"}
              />
              <button
                type="submit"
                className="px-4 w-full bg-black rounded-xl text-white py-3"
              >
                Finish & Start Exploring
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UnifiedAuth;
