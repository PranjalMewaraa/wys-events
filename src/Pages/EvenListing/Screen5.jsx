"use client";
import * as React from "react";
import Layout from "../../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import SelectGroup from "../../components/SelectGroup";
import { apiGet, apiPost } from "../../utils/call";
import getCategoryImage from "../../utils/getImage";

const Categories = [
  { label: "Weekend Getaways", value: "Weekend Getaways" },
  { label: "Adventure & Treks", value: "Adventure & Treks" },
  { label: "Camping & Bonfire Nights", value: "Camping & Bonfire Nights" },
  { label: "Beach & Island Escapes", value: "Beach & Island Escapes" },
  {
    label: "Hill Stations & Scenic Stays",
    value: "Hill Stations & Scenic Stays",
  },
  { label: "Cultural & Temple Trails", value: "Cultural & Temple Trails" },
  { label: "City Heritage & Food Walks", value: "City Heritage & Food Walks" },
  { label: "Nightlife & Social Meetups", value: "Nightlife & Social Meetups" },
  { label: "Food & Coffee Trails", value: "Food & Coffee Trails" },
  { label: "Wellness & Yoga Retreats", value: "Wellness & Yoga Retreats" },
  { label: "Bike Rides & Road Trips", value: "Bike Rides & Road Trips" },
  { label: "Offbeat & Hidden Escapes", value: "Offbeat & Hidden Escapes" },
  { label: "Women-Only Trips", value: "Women-Only Trips" },
  { label: "Solo-Friendly Group Trips", value: "Solo-Friendly Group Trips" },
  {
    label: "Create Your Own Scene (Other)",
    value: "Create Your Own Scene (Other)",
  },
];

function InputDesign() {
  const [isCostInvolved, setIsCostInvolved] = React.useState(true);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [descriptionCount, setDescriptionCount] = React.useState(0);
  const nav = useNavigate();

  const [locations, setLocations] = React.useState([]);
  const [availableCities, setAvailableCities] = React.useState([]);

  const [experience, setExperience] = React.useState({
    name: "",
    description: "",
    state: "",
    city: "",
    image: "",
    category: "",
    customCategory: "",
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
    if (value !== "fee") {
      handleChange("cost", 0);
    }
  };

  const handleStateChange = (value) => {
    handleChange("state", value);
    const selected = locations.find((loc) => loc.state === value);
    setAvailableCities(selected?.cities || []);
    handleChange("city", "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...experience,
      category:
        experience.category === "Create Your Own Scene (Other)"
          ? experience.customCategory
          : experience.category,
      availableSlots: experience.totalSlots,
      cost: isCostInvolved && selectedOption === "fee" ? experience.cost : 0,
      paymentType: isCostInvolved ? experience.paymentType : null,
    };

    let image = "";
    let payloadData = {};
    if (finalData.category) {
      image = getCategoryImage(finalData.category);
      payloadData = {
        ...finalData,
        image: image,
      };
    }

    try {
      const res = await apiPost("/events", payloadData);
      console.log(res);
      alert("Event Created , Sent for Approval");
      nav("/events");
    } catch (error) {
      console.error("Error creating experience:", error);
    }
  };

  const getLocations = async () => {
    try {
      const res = await apiGet("/location");
      setLocations(res);
    } catch (err) {
      console.error("Error fetching locations", err);
    }
  };

  React.useEffect(() => {
    getLocations();
  }, []);

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
            className="px-12 py-0 text-lg rounded-xl border border-zinc-800 h-[60px] text-neutral-400 w-full"
            value={experience.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <p className="mt-4">Select a Category</p>
          <SelectGroup
            options={Categories}
            isMulti={false}
            maxSelections={1}
            onChange={(val) => handleChange("category", val)}
          />

          {experience.category === "Create Your Own Scene (Other)" && (
            <input
              type="text"
              placeholder="Enter your custom category"
              className="mt-3 w-full rounded-xl border border-zinc-800 p-2 text-sm"
              value={experience.customCategory}
              onChange={(e) => handleChange("customCategory", e.target.value)}
            />
          )}

          <label className="text-base text-black block mt-5">
            How many people can join you?
          </label>
          <input
            type="number"
            min={1}
            placeholder="Enter number of slots"
            className="w-full rounded-xl border border-zinc-800 px-4 py-2 text-sm"
            value={experience.totalSlots || ""}
            onChange={(e) =>
              handleChange("totalSlots", parseInt(e.target.value) || "")
            }
          />

          <label className="text-base text-black block">From Date</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={experience.fromDate}
            onChange={(e) => handleChange("fromDate", e.target.value)}
            className="w-full rounded-xl border border-zinc-800 px-2 h-[42px]"
          />

          <label className="text-base text-black block">To Date</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={experience.toDate}
            onChange={(e) => handleChange("toDate", e.target.value)}
            className="w-full rounded-xl border border-zinc-800 px-2 h-[42px]"
          />

          <label className="text-base text-black block">Time</label>
          <input
            type="time"
            placeholder="e.g. 5:00 PM"
            value={experience.time}
            onChange={(e) => handleChange("time", e.target.value)}
            className="w-full rounded-xl border border-zinc-800 px-4 py-2 text-sm"
          />

          <label className="text-base text-black block">State</label>
          <select
            value={experience.state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="text-sm rounded-xl border border-zinc-800 px-4 py-2 w-full"
          >
            <option value="">Select State</option>
            {locations.map((loc) => (
              <option key={loc._id} value={loc.state}>
                {loc.state}
              </option>
            ))}
          </select>

          <label className="text-base text-black block mt-4">City</label>
          <select
            value={experience.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="text-sm rounded-xl border border-zinc-800 px-4 py-2 w-full"
            disabled={!experience.state}
          >
            <option value="">Select City</option>
            {availableCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>

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

                {selectedOption === "fee" && (
                  <input
                    type="number"
                    min={0}
                    placeholder="Enter cost in INR"
                    className="mt-3 w-full rounded-xl border border-zinc-800 p-2 text-sm"
                    value={experience.cost || ""}
                    onChange={(e) =>
                      handleChange("cost", parseFloat(e.target.value))
                    }
                  />
                )}
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
