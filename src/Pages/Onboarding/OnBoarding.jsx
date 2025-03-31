import React, { useState } from "react";
import Layout from "./Layout";
import ProgressBar from "../../components/ProgressBar";
import InputBox from "../../components/InputBox";
import SelectGroup from "../../components/SelectGroup";
import PhotoPicker from "../../components/PhotoPicker";

const OnBoarding = () => {
  const [page, setPage] = useState(0);

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
  const handleSelectionChange = (selected) => {
    console.log("Selected:", selected);
  };
  const handleImageSelect = (file) => {
    console.log("Image selected:", file.name);
    // Handle the file (e.g., upload to server)
  };
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
            <form className="flex px-8 w-full flex-col gap-8">
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
                label={"Hey traveler!"}
                label2={"What should we call you?"}
                placeholder={"Full Name"}
                name={"fullname"}
              />
              <InputBox
                label={"Hey traveler!"}
                label2={"What should we call you?"}
                placeholder={"Full Name"}
                name={"fullname"}
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
      </div>
    </Layout>
  );
};

export default OnBoarding;
