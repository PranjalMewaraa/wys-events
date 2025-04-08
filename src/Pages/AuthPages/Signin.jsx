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

  const travelOptions = [
    { label: "🌍 Explorer", value: "Explorer" },
    { label: "🍹 Relaxer", value: "Relaxer" },
    { label: "🎉 Social Butterfly", value: "Social Butterfly" },
    { label: "🎒 Backpacker", value: "Backpacker" },
    { label: "🗘 Planner", value: "Planner" },
    { label: "🚀 Spontaneous", value: "Spontaneous" },
  ];

  const travelTypes = [
    { label: "🌍 Hiking in mountain", value: "Hiking in the mountains" },
    { label: "🍹 Tropical Beach Escape", value: "Tropical beach escape" },
    {
      label: "🎉 Cultural and Historical Sites",
      value: "Cultural & historical sites",
    },
    {
      label: "🎒 Music Festival and Nightlife",
      value: "Music festivals & nightlife",
    },
    { label: "🗘 Adventure Sport", value: "Adventure sports" },
    { label: "🚀 A food hopping journey", value: "A food hopping journey" },
    {
      label: "🎒 Road trips and long drive",
      value: "Road trips & long drives",
    },
    {
      label: "🗘 Camping and offbeat destinations",
      value: "Camping & offbeat destinations",
    },
  ];

  const travelGeneric = [
    {
      label: "🐢  Slow and Immersive",
      value: "Slow and Immersive",
      desc: "(Take it easy, soak it in)",
    },
    {
      label: " 🦎 Balanced explorer",
      value: "Balanced explorer",
      desc: "(Mix of adventure & chill)",
    },
    {
      label: "⚡ Fast & intense",
      value: "Fast and intense",
      desc: "(Pack in as much as possible!)",
    },
  ];
  const vibe = [
    {
      label: "🎭 Opposites attract",
      value: "Opposite attract",
      desc: "(I enjoy different perspectives)",
    },
    {
      label: " 😎 My kind of people",
      value: "My kind of people",
      desc: "(Shared interests matter)",
    },
    {
      label: "🙃 I can adapt to anyone",
      value: "I can adapt to anyone",
      desc: "( I can adapt to anyone)",
    },
  ];
  const lastMinuteTrip = [
    {
      label: "📅 Make an itinerary immediately",
      value: "Make an itinerary immediately",
    },
    {
      label: " 🎫 Book a flight & figure it out later",
      value: "Book a Flight & figure it out later",
    },
    {
      label: "🚗 Drive somewhere close & explore spontaneously",
      value: "Drive somewhere close & explore spontaneously",
    },
    {
      label: "📞 Call a friend & convince them to join",
      value: "Call a friend and convince them to join",
    },
  ];
  const purpose = [
    {
      label: "🚶 Find a travel companion",
      value: "Find a travel companion",
    },
    {
      label: "🎉 Join awesome events",
      value: "Join awesome events",
    },
    {
      label: "🎭 Host events & bring people together",
      value: "Host events & bring people together",
    },
    {
      label: "🤷 Just exploring for now",
      value: "Just exploring for now",
    },
  ];

  const trustVerification = [
    {
      label: "✅ Yes, I feel safer that way",
      value: "true",
    },
    {
      label: "🚀 Not necessary, I trust good vibes",
      value: "false",
    },
  ];

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      setFirebaseToken(token);

      const res = await axios.post(
        "https://wysbackend.onrender.com/api/users/check-user",
        {
          firebaseToken: token,
        }
      );

      if (res.data.exists) {
        const loginRes = await axios.post(
          "https://wysbackend.onrender.com/api/users/login",
          {
            firebaseToken: token,
          }
        );

        const { accessToken, user } = loginRes.data.data;
        localStorage.setItem("userID", user._id);
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

  const handleSelectionChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = async () => {
    const payload = new FormData();

    payload.append("firebaseToken", firebaseToken);

    const stringFields = [
      "name",
      "currentLocation",
      "mobileNo",
      "dateOfBirth",
      "gender",
      "lastMinuteTripChoices",
      "travelEnergy",
      "vibe",
    ];
    stringFields.forEach((key) => {
      if (formData[key]) payload.append(key, formData[key]);
    });

    const arrayFields = [
      "travelPreferences",
      "idealTrip",
      "purpose",
    ];
    arrayFields.forEach((key) => {
      if (formData[key]) payload.append(key, JSON.stringify(formData[key]));
    });

    ["profileDetails", "socialLinks"].forEach((key) => {
      if (formData[key]) payload.append(key, JSON.stringify(formData[key]));
    });

    if (formData.avatar) {
      payload.append("avatar", formData.avatar);
    }

    if (formData.profileImages && Array.isArray(formData.profileImages)) {
      formData.profileImages.forEach((img) =>
        payload.append("profileImages", img)
      );
    }

    if (typeof formData.trustVerification === "boolean") {
      payload.append("trustVerification", JSON.stringify(formData.trustVerification));
    }

    // if (firebaseToken) {
    //   payload.append("firebaseToken", firebaseToken);
    // }
    // console.log(firebaseToken);
    if (firebaseToken)
      try {
        await axios.post(
          "https://wysbackend.onrender.com/api/users/register",
          payload
        );

        const loginRes = await axios.post(
          "https://wysbackend.onrender.com/api/users/login",
          {
            firebaseToken,
          }
        );

        const { accessToken, user } = loginRes.data.data;
        localStorage.setItem("userID", user._id);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("authToken", firebaseToken);
        window.location.href = "/";
      } catch (err) {
        console.error("Final submission failed", err);
      }
  };

  const renderStep = () => {
    switch (page) {
      case 0:
        return (
          <>
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              Let's start with <br />
              <span className="text-amber-500">your phone number</span>
            </h1>
            <InputBox
              label="What's your phone number?"
              name="mobileNo"
              placeholder="Enter your number"
              type="tel"
              value={formData.mobileNo || ""}
              onChange={handleInputChange}
            />
          </>
        );
      case 1:
        return (
          <>
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              Create your <br />
              <span className="text-amber-500">account</span>
            </h1>
            <InputBox
              label={"Hey traveler!"}
              label2={"What should we call you?"}
              placeholder={"Full Name"}
              name={"name"}
              value={formData.name || ""} // Ensure formData.value is passed here
              onChange={handleInputChange}
            />
            <InputBox
              label={"Where are you now?"}
              placeholder={"City, Country"}
              name="currentLocation"
              value={formData.currentLocation || ""} // Bind value from formData
              onChange={handleInputChange}
            />
            <InputBox
              label={"When is your birthday!"}
              placeholder={"Date of Birth"}
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth || ""} // Bind value from formData
              onChange={handleInputChange}
            />
            <SelectGroup
              options={genderOption}
              value={formData.gender || ""} // Bind selected value
              onChange={(val) => handleSelectionChange(val, "gender")}
            />
            <PhotoPicker
              label="Upload Profile Picture"
              onImageSelect={(file) => handleImageSelect(file, "avatar")}
            />
          </>
        );

      case 2:
        return (
          <>
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              How do you love <br />
              <span className="text-amber-500">to travel</span>
            </h1>
            <SelectGroup
              key={`step-${page}`}
              options={travelOptions}
              isMulti
              maxSelections={3}
              onChange={(val) =>
                handleSelectionChange(val, "travelPreferences")
              }
            />
          </>
        );
      case 3:
        return (
          <>
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              What is your <br />
              <span className="text-amber-500">Ideal Trip</span>
            </h1>
            <SelectGroup
              key={`step-${page}`}
              options={travelTypes}
              isMulti
              maxSelections={3}
              onChange={(val) => handleSelectionChange(val, "idealTrip")}
            />
          </>
        );
      case 4:
        return (
          <>
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              What's your <br />
              <span className="text-amber-500">Travel Energy</span>
            </h1>
            <SelectGroup
              key={`step-${page}`}
              options={travelGeneric}
              onChange={(val) => handleSelectionChange(val, "travelEnergy")}
            />
          </>
        );
      case 5:
        return (
          <>
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              Who do you <br />
              <span className="text-amber-500">Vibe With</span>
            </h1>
            <SelectGroup
              key={`step-${page}`}
              options={vibe}
              onChange={(val) => handleSelectionChange(val, "vibe")}
            />
          </>
        );
      case 6:
        return (
          <>
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              Last minute trip <br />
              <span className="text-amber-500">What do you do?</span>
            </h1>
            <SelectGroup
              key={`step-${page}`}
              options={lastMinuteTrip}
              onChange={(val) =>
                handleSelectionChange(val, "lastMinuteTripChoices")
              }
            />
          </>
        );
      case 7:
        return (
          <>
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              You are here for <br />
              <span className="text-amber-500">what purpose?</span>
            </h1>
            <SelectGroup
              key={`step-${page}`}
              options={purpose}
              isMulti
              maxSelections={1}
              onChange={(val) => handleSelectionChange(val, "purpose")}
            />
          </>
        );
      case 8:
        return (
          <>
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              Verify your profile <br />
              <span className="text-amber-500">for trust & safety</span>
            </h1>
            <SelectGroup
              key={`step-${page}`}
              options={trustVerification}
              isMulti
              maxSelections={1}
              onChange={(val) =>
                handleSelectionChange(val, "trustVerification")
              }
            />
          </>
        );
      case 9:
        return (
          <>
            <h1 className="poppins-medium-italic flex flex-col items-center leading-6 text-2xl">
              Let's make your <br />
              <span className="text-amber-500">profile interesting</span>
            </h1>

            {/* ✅ New Fields */}
            <InputBox
              label="What’s something you always pack?"
              name="alwaysPack"
              value={formData.profileDetails?.alwaysPack || ""}
              placeholder="e.g., Portable charger, sunglasses"
              onChange={(name, value) =>
                setFormData((prev) => ({
                  ...prev,
                  profileDetails: {
                    ...prev.profileDetails,
                    [name]: value,
                  },
                }))
              }
            />

            <InputBox
              label="Your travel soundtrack?"
              name="travelSoundtrack"
              value={formData.profileDetails?.travelSoundtrack || ""}
              placeholder="e.g., Coldplay - Paradise"
              onChange={(name, value) =>
                setFormData((prev) => ({
                  ...prev,
                  profileDetails: {
                    ...prev.profileDetails,
                    [name]: value,
                  },
                }))
              }
            />

            <InputBox
              label="What's your ideal evening during travel?"
              name="idealEvening"
              value={formData.profileDetails?.idealEvening || ""}
              placeholder="e.g., Sunset walk followed by local dinner"
              onChange={(name, value) =>
                setFormData((prev) => ({
                  ...prev,
                  profileDetails: {
                    ...prev.profileDetails,
                    [name]: value,
                  },
                }))
              }
            />

            <InputBox
              label="Your favorite travel movie?"
              name="favoriteTravelMovie"
              value={formData.profileDetails?.favoriteTravelMovie || ""}
              placeholder="e.g., Into the Wild"
              onChange={(name, value) =>
                setFormData((prev) => ({
                  ...prev,
                  profileDetails: {
                    ...prev.profileDetails,
                    [name]: value,
                  },
                }))
              }
            />

            {/* Social Links */}
            <InputBox
              label="Instagram Username or Link"
              name="instagram"
              value={formData.socialLinks?.instagram || ""}
              placeholder="e.g., @you or https://instagram.com/you"
              onChange={(name, value) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: {
                    ...prev.socialLinks,
                    [name]: value,
                  },
                }))
              }
            />

            <InputBox
              label="LinkedIn URL"
              name="linkedin"
              value={formData.socialLinks?.linkedin || ""}
              placeholder="e.g., https://linkedin.com/in/you"
              onChange={(name, value) =>
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: {
                    ...prev.socialLinks,
                    [name]: value,
                  },
                }))
              }
            />

            <PhotoPicker
              label="Upload Gallery Images (Max 6)"
              isMulti
              maxSelections={6}
              onImageSelect={(files) =>
                handleImageSelect(files, "profileImages")
              }
            />
          </>
        );

      default:
        return null;
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

  return (
    <Layout>
      <div className="w-full flex flex-col items-center mt-6 gap-6">
        <ProgressBar width={page + 1} />
        <form
          className="w-full px-6 py-4 flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            page === 9 ? handleFinalSubmit() : setPage(page + 1);
          }}
        >
          {renderStep()}
          <button
            type="submit"
            className="bg-black text-white rounded-xl py-3 w-full"
          >
            {page === 9 ? "Finish & Start Exploring" : "Continue"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UnifiedAuth;
