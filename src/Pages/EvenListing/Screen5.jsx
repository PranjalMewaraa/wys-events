"use client";
import * as React from "react";
import Layout from "../../Layout/Layout";
import { Link } from "react-router-dom";
import SelectGroup from "../../components/SelectGroup";
import { apiPost } from "../../utils/call";

const Categories = [
  { label: "Music & Concerts", value: "Music & Concerts" },
  { label: "Sports & Fitness", value: "Sports & Fitness" },
  { label: "Arts & Culture", value: "Arts & Culture" },
  { label: "Movies & Entertainment", value: "Movies & Entertainment" },
  { label: "Social & Networking", value: "Social & Networking" },
  { label: "Food & Drink", value: "Food & Drink" },
  { label: "Education & Workshops", value: "Education & Workshops" },
  { label: "Wellness & Spirituality", value: "Wellness & Spirituality" },
  { label: "Business & Tech", value: "Business & Tech" },
  { label: "Family & Kids", value: "Family & Kids" },
  { label: "Outdoor & Adventure", value: "Outdoor & Adventure" },
  { label: "Gaming & Esports", value: "Gaming & Esports" },
  { label: "Volunteer & Causes", value: "Volunteer & Causes" },
  { label: "Festivals & Celebrations", value: "Festivals & Celebrations" },
  { label: "Local & Community Events", value: "Local & Community Events" },
  { label: "Other", value: "Other" },
];

function InputDesign() {
  const [isCostInvolved, setIsCostInvolved] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [descriptionCount, setDescriptionCount] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [experience, setExperience] = React.useState({
    name: "",
    description: "",
    state: "",
    city: "",

    category: "",
    fromDate: "",
    toDate: "",
    time: "",
    totalSlots: null,
    cost: null,
    paymentType: null,
  });

  const paymentOptions = [
    { label: "Go Dutch", value: "dutch" },
    { label: "Split the Amount", value: "split" },
    { label: "Admission Fee", value: "fee" },
  ];

  const handleSelectionChange = (selected) => {
    setSelectedCategory(selected);
  };

  const handleChange = (field, value) => {
    setExperience((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleCost = () => {
    setIsCostInvolved((prev) => !prev);
    setSelectedOption("");
    handleChange("cost", null);
    handleChange("paymentType", null);
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    handleChange("paymentType", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...experience,
      availableSlots: experience.totalSlots,
      cost: isCostInvolved ? experience.cost : 0,
      paymentType: isCostInvolved ? experience.paymentType : null,
    };

    console.log("Experience Created:", finalData);
    try {
      const res = await apiPost("/events", finalData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // Send finalData to backend here
  };

  return (
    <Layout>
      <div
        className="relative mx-auto my-0 mb-24 w-full bg-white max-w-sm px-8 max-sm:w-full"
        role="main"
      >
        <nav className="flex gap-5 items-center p-4">
          <Link to={"/listing"} aria-label="Go back">
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
            type="text"
            placeholder="Name your experience"
            className="px-12 py-0 text-lg rounded-xl border border-solid border-zinc-800 h-[60px] text-neutral-400 w-full"
            value={experience.name}
            onChange={(e) => handleChange("name", e.target.value)}
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
                onClick={() => handleChange("totalSlots", num)}
                className={`text-xl rounded-xl border border-solid border-zinc-800 h-[35px] w-[35px] ${
                  experience.totalSlots === num
                    ? "bg-zinc-800 text-white"
                    : "text-black"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <label className="text-base text-black block">From Date</label>
          <input
            type="date"
            value={experience.fromDate}
            onChange={(e) => handleChange("fromDate", e.target.value)}
            className="w-full rounded-xl border border-zinc-800 px-2 h-[42px]"
          />

          <label className="text-base text-black block">To Date</label>
          <input
            type="date"
            value={experience.toDate}
            onChange={(e) => handleChange("toDate", e.target.value)}
            className="w-full rounded-xl border border-zinc-800 px-2 h-[42px]"
          />

          <label className="text-base text-black block">Time</label>
          <input
            type="text"
            placeholder="e.g. 5:00 PM"
            value={experience.time}
            onChange={(e) => handleChange("time", e.target.value)}
            className="w-full rounded-xl border border-zinc-800 px-4 py-2 text-sm"
          />

          <input
            type="text"
            placeholder="City"
            value={experience.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="text-sm rounded-xl border border-zinc-800 px-4 py-2 w-full"
          />

          <input
            type="text"
            placeholder="State"
            value={experience.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className="text-sm rounded-xl border border-zinc-800 px-4 py-2 w-full"
          />

          <textarea
            placeholder="Give a description about your event"
            className="p-4 text-lg rounded-xl border border-zinc-800 h-[76px] w-full text-neutral-400 resize-none"
            minLength={30}
            maxLength={150}
            value={experience.description}
            onChange={(e) => {
              handleChange("description", e.target.value);
              setDescriptionCount(e.target.value.length);
            }}
          />
          <div className="flex gap-3.5 justify-end mt-1 text-xs text-neutral-400">
            <div>Min 30</div>
            <div>{descriptionCount}/150</div>
          </div>

          <div className="my-5">
            <div className="flex gap-2.5 items-center">
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
                  {paymentOptions.map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleOptionSelect(value)}
                      className={`px-4 py-1 text-xs rounded-3xl border h-[21px] focus:outline-none ${
                        experience.paymentType === value
                          ? "border-zinc-800 text-zinc-800 bg-zinc-100"
                          : "border-stone-300 text-stone-300"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Enter cost in INR"
                  className="mt-3 w-full rounded-xl border border-zinc-800 p-2 text-sm"
                  value={experience.cost || ""}
                  onChange={(e) =>
                    handleChange("cost", parseFloat(e.target.value))
                  }
                />
              </>
            )}
          </div>

          <button
            type="submit"
            className="mx-auto my-8 text-xl text-white rounded-3xl bg-zinc-800 h-fit p-4 w-full max-sm:w-4/5"
          >
            🤟 Create Experience
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default InputDesign;
