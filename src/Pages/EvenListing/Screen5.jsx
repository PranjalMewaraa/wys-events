"use client";
import * as React from "react";
import Layout from "../../Layout/Layout";
import { Link } from "react-router-dom";
import SelectGroup from "../../components/SelectGroup";

function InputDesign() {
  const [isCostInvolved, setIsCostInvolved] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState("");
  const [experienceName, setExperienceName] = React.useState("");
  const [peopleCount, setPeopleCount] = React.useState(null);
  const [fromDate, setFromDate] = React.useState("");
  const [fromTime, setFromTime] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [toTime, setToTime] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const paymentOptions = ["Go dutch", "Split the amount", "Admission fee"];

  const Categories = [
    { label: "Music & Concerts", value: "music-concerts" },
    { label: "Sports & Fitness", value: "sports-fitness" },
    { label: "Arts & Culture", value: "arts-culture" },
    { label: "Movies & Entertainment", value: "movies-entertainment" },
    { label: "Social & Networking", value: "social-networking" },
    { label: "Food & Drink", value: "food-drink" },
    { label: "Education & Workshops", value: "education-workshops" },
    { label: "Wellness & Spirituality", value: "wellness-spirituality" },
    { label: "Business & Tech", value: "business-tech" },
    { label: "Family & Kids", value: "family-kids" },
    { label: "Outdoor & Adventure", value: "outdoor-adventure" },
    { label: "Gaming & Esports", value: "gaming-esports" },
    { label: "Volunteer & Causes", value: "volunteer-causes" },
    { label: "Festivals & Celebrations", value: "festivals-celebrations" },
    { label: "Local & Community Events", value: "local-community-events" },
    { label: "Other", value: "other" },
  ];

  const handleToggleCost = () => {
    setIsCostInvolved((prev) => !prev);
    setSelectedOption(""); // reset option when toggled off
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSelectionChange = (selected) => {
    setSelectedCategory(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const experienceData = {
      name: experienceName,
      category: selectedCategory,
      dateFrom: `${fromDate} ${fromTime}`,
      dateTo: `${toDate} ${toTime}`,
      peopleCount,
      location,
      description,
      isCostInvolved,
      paymentType: isCostInvolved ? selectedOption : null,
    };

    console.log("Experience Created:", experienceData);

    // You can now send this data to your backend or handle as needed
  };

  return (
    <Layout>
      <link
        href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <div
        className="relative mx-auto my-0 mb-24 w-full bg-white max-w-sm px-8 max-sm:w-full"
        role="main"
      >
        <nav className="flex gap-5 items-center p-4">
          <Link to={"/listing"} aria-label="Go back">
            {/* Back arrow icon */}
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[15px] h-[16px]"
            >
              <path
                d="M16 9C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM16 7L0.999999 7V9L16 9V7Z"
                fill="black"
              />
            </svg>
          </Link>
          <h1 className="text-base text-center text-black">
            Create your experience
          </h1>
        </nav>

        <form className="space-y-5 w-full" onSubmit={handleSubmit}>
          <input
            name="experienceName"
            type="text"
            placeholder="Name your experience"
            className="px-12 py-0 text-lg rounded-xl border border-solid border-zinc-800 h-[60px] text-neutral-400 w-full"
            value={experienceName}
            onChange={(e) => setExperienceName(e.target.value)}
          />

          <p className="mt-4">Select a Category</p>
          <SelectGroup
            options={Categories}
            isMulti={false}
            maxSelections={1}
            onChange={handleSelectionChange}
          />

          <p className="mt-5">How many people can join you?</p>
          <div className="flex gap-2 px-4 py-2">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPeopleCount(num)}
                className={`text-xl rounded-xl border border-solid border-zinc-800 h-[35px] w-[35px] ${
                  peopleCount === num ? "bg-zinc-800 text-white" : "text-black"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="px-0 py-0 mb-5">
            <label className="mb-2.5 text-base text-black block">From</label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2.5 px-2 w-1/2 rounded-xl border border-solid border-zinc-800 h-[42px]">
                📅
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="text-sm text-stone-300 bg-transparent border-none focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2.5 px-2 w-1/2 rounded-xl border border-solid border-zinc-800 h-[42px]">
                ⏰
                <input
                  type="time"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  className="text-sm text-stone-300 bg-transparent border-none focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="px-0 py-0 mb-5">
            <label className="mb-2.5 text-base text-black block">To</label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2.5 px-2 w-1/2 rounded-xl border border-solid border-zinc-800 h-[42px]">
                📅
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="text-sm text-stone-300 bg-transparent border-none focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2.5 px-2 w-1/2 rounded-xl border border-solid border-zinc-800 h-[42px]">
                ⏰
                <input
                  type="time"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  className="text-sm text-stone-300 bg-transparent border-none focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2.5 items-center px-4 py-4 my-5 rounded-xl border border-solid border-zinc-800 h-fit">
            📍
            <input
              name="location"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-sm text-stone-300 bg-transparent border-none focus:outline-none w-full"
            />
          </div>

          <div className="my-5">
            <textarea
              name="description"
              placeholder="Give a description about your event"
              className="p-4 text-lg rounded-xl border border-solid border-zinc-800 h-[76px] w-full text-neutral-400 resize-none"
              minLength={30}
              maxLength={150}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-3.5 justify-end mt-1 text-xs text-neutral-400">
              <div>Min 30</div>
              <div>{description.length}/150</div>
            </div>
          </div>

          {/* Cost Toggle and Options */}
          <div className="my-5">
            <div className="flex gap-2.5 items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d86b0902f259a50df41694d4b2b7ec555b671ab"
                alt=""
                className="w-6 h-6"
              />
              <label className="text-lg text-black">
                Is there a cost involved?
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={isCostInvolved}
                onClick={handleToggleCost}
                className={`relative rounded-lg h-[18px] w-[37px] focus:outline-none ${
                  isCostInvolved ? "bg-zinc-800" : "bg-zinc-300"
                }`}
              />
            </div>

            {isCostInvolved && (
              <>
                <div className="mt-4 text-xs">
                  Select how payments will happen
                </div>
                <div className="flex flex-wrap gap-2.5 mt-3">
                  {paymentOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleOptionSelect(option)}
                      className={`px-4 py-1 text-xs whitespace-nowrap rounded-3xl border h-[21px] focus:outline-none ${
                        selectedOption === option
                          ? "border-zinc-800 text-zinc-800 bg-zinc-100"
                          : "border-stone-300 text-stone-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className="mx-auto my-8 text-xl text-white rounded-3xl cursor-pointer bg-zinc-800 h-fit p-4 w-full max-sm:w-4/5 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-800"
          >
            🤟 Create Experience
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default InputDesign;
