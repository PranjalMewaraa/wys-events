"use client";
import * as React from "react";

function Listing() {
  return (
    <main
      className="flex overflow-hidden flex-col px-2 pb-3.5 mx-auto w-full bg-white max-w-[480px]"
      role="main"
      aria-label="Experience Creation Form"
    >
      <header
        className="flex overflow-hidden gap-4 items-start pr-4 pb-2.5 pl-8 w-full bg-white"
        role="banner"
      >
        <div
          className="grow mt-3.5 text-base italic tracking-tight leading-snug text-black"
          aria-label="Current time"
        >
          9:41
        </div>
        <div className="flex flex-auto items-start">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7413a31b7a6d643e420db1ba2614f50407ffe996?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
            className="object-contain shrink-0 max-w-full aspect-[7.81] fill-black w-[219px]"
            alt="Status bar background"
          />
          <div
            className="flex gap-0.5 items-start mt-4"
            role="status"
            aria-label="System status icons"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/098f4e6cc7c061d120395c9a49c287e395d48874?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              className="object-contain shrink-0 w-5 aspect-[1.25]"
              alt="Signal strength indicator"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d903407392f67f430fdd85d64dfe52123227676b?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              className="object-contain shrink-0 w-4 aspect-square"
              alt="WiFi status"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/be7f6612e69d876a8e5858881c2f587152d42a7e?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              className="object-contain shrink-0 aspect-[1.56] w-[25px]"
              alt="Battery status"
            />
          </div>
        </div>
      </header>

      <section className="flex gap-5 justify-between mt-3.5 ml-8 max-w-full text-xs tracking-tight leading-5 text-center text-black w-[219px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/964fce9e1c634c03ead4985407efc211a748b06a?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
          className="object-contain shrink-0 my-auto aspect-[1.21] w-[17px]"
          alt="Experience creation icon"
        />
        <h1 className="text-xs">Create your experience</h1>
      </section>

      <section
        className="mt-12"
        role="form"
        aria-label="Experience Details Form"
      >
        <input
          type="text"
          placeholder="Name your experience"
          className="self-center px-16 py-5 w-full text-lg tracking-tight leading-none text-center bg-white rounded-xl border border-solid border-zinc-800 max-w-[295px] text-neutral-400"
          aria-label="Experience name input"
        />

        <div className="mt-10">
          <h2 className="self-start ml-11 text-sm tracking-tight text-black">
            Choose one category
          </h2>
          <div
            className="flex flex-wrap gap-1.5 self-center mt-2.5 w-full max-w-[281px] mx-auto"
            role="group"
            aria-label="Category selection"
          >
            <button className="px-2.5 py-2.5 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Music & Concerts
            </button>
            <button className="px-3 py-2 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Sports & Fitness
            </button>
            <button className="px-2.5 py-2.5 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Arts & Culture
            </button>
            <button className="px-3.5 py-2.5 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Movies & Entertainment
            </button>
            <button className="px-4 py-2 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Social & Networking
            </button>
            <button className="px-3 py-2.5 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Food & Drink
            </button>
            <button className="px-3.5 py-2 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Education & Workshops
            </button>
            <button className="px-3.5 py-2 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Wellness & Spirituality
            </button>
            <button className="px-5 py-2.5 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Business & Tech
            </button>
            <button className="px-4 py-2 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Family & Kids
            </button>
            <button className="px-2.5 py-2.5 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Outdoor & Adventure
            </button>
            <button className="px-3.5 py-2 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Gaming & Esports
            </button>
            <button className="px-3.5 py-2.5 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Volunteer & Causes
            </button>
            <button className="px-4 py-2.5 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Festivals & Celebrations
            </button>
            <button className="px-3.5 py-2 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Local & Community Events
            </button>
            <button className="px-5 py-2.5 rounded-3xl border border-solid border-zinc-800 text-xs tracking-tight">
              Other
            </button>
          </div>
        </div>

        <section className="mt-10" aria-labelledby="participants-heading">
          <h2
            id="participants-heading"
            className="self-start ml-10 text-sm tracking-tight text-black"
          >
            How people can join you?
          </h2>
          <div
            className="flex gap-2 self-center mt-4 w-full max-w-[287px] mx-auto"
            role="group"
            aria-label="Select number of participants"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                className="px-3.5 bg-white rounded-xl border border-solid border-zinc-800 h-[35px] w-[35px] text-xl tracking-tight text-center"
                aria-label={${num} participant${num > 1 ? "s" : ""}}
              >
                {num}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-label="Date and Time Selection">
          <h2 className="self-start ml-10 text-xl tracking-tight text-black">
            From
          </h2>
          <div className="flex gap-10 self-center mt-3 w-full max-w-[295px]">
            <div className="flex flex-col flex-1 text-xl tracking-tight text-black whitespace-nowrap">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aea765a2ec43ded99ea481aa0a77db9d9917a32?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                className="object-contain rounded-xl aspect-[3.22] w-[135px]"
                alt="From date selector"
              />
              <h2 className="self-start mt-5">To</h2>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aea765a2ec43ded99ea481aa0a77db9d9917a32?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                className="object-contain mt-3 rounded-xl aspect-[3.22] w-[135px]"
                alt="To date selector"
              />
            </div>
            <div className="flex-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/94512810cbde3a77bdb92cde164d0d784a7589d1?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                className="object-contain rounded-xl aspect-[2.79] w-[117px]"
                alt="Start time selector"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/94512810cbde3a77bdb92cde164d0d784a7589d1?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                className="object-contain mt-14 rounded-xl aspect-[2.79] w-[117px]"
                alt="End time selector"
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Listing;