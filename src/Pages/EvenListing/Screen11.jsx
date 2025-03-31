"use client";
import * as React from "react";

function ReviewInput() {
  const handleSubmit = () => {
    // Handle submit action
    console.log("Review submitted");
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-[480px]">
      <div className="overflow-hidden w-full bg-white" role="main">
        <div className="flex flex-col px-6 pt-48 w-full bg-zinc-800">
          <div className="flex flex-col items-center px-3.5 pt-5 pb-7 text-xl tracking-tight text-black bg-white rounded-xl">
            <h1 className="font-semibold leading-none text-center">
              Leave a <span style={{ color: "rgba(243,142,28,1)" }}>review</span>
            </h1>
            <div
              className="self-stretch px-16 pt-28 pb-24 mt-3.5 text-xs text-center rounded-xl bg-zinc-100 text-zinc-400"
              role="textbox"
              aria-label="Review input area"
            >
              Let us know how was your expericne
            </div>
            <div
              className="mt-4 tracking-tight"
              role="heading"
              aria-level="2"
            >
              Rate your experience
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e577521009322276a940cc5f7768cdaa99b2394a?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              className="object-contain mt-2 max-w-full aspect-[7.94] w-[215px]"
              alt="Rating stars"
              role="img"
            />
            <button
              onClick={handleSubmit}
              className="px-16 py-4 mt-5 max-w-full leading-none text-center text-white whitespace-nowrap rounded-xl bg-zinc-800 w-[190px]"
              aria-label="Submit review"
            >
              Submit
            </button>
          </div>
          <div
            className="self-start mt-20 text-base tracking-tight text-black"
            role="heading"
            aria-level="2"
          >
            Going
          </div>
          <div className="flex gap-2.5 pr-16 mt-3 tracking-tight bg-white">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8930b25fd82d14c27cb2e6e564185fca344485f1?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              className="object-contain shrink-0 aspect-[1.02] w-[41px]"
              alt="User profile"
              role="img"
            />
            <div className="self-start">
              <div className="text-sm leading-loose text-black">
                Aditi Wanderlust
              </div>
              <div className="text-xs leading-loose text-zinc-800">
                Joined on 12 May 2025
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start mt-6 max-w-full bg-white w-[329px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a734892be0ebc702d9b917b29fa191564079adf?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              className="object-contain aspect-[5.13] w-[41px]"
              alt="Additional user information"
              role="img"
            />
          </div>
        </div>
      </div>
      <div className="z-10 self-start -mt-1.5 ml-20 text-sm tracking-tight leading-loose text-black">
        Aditi Wanderlust
      </div>
    </div>
  );
}

export default ReviewInput;