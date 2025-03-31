"use client";
import * as React from "react";

function Listing() {
  return (
    <div
      className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px]"
      role="main"
      aria-label="Listing View"
    >
      <div className="flex flex-col items-center px-2 w-full">
        <header
          className="flex overflow-hidden gap-4 items-start self-stretch pr-4 pb-2.5 pl-8 w-full bg-white"
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
              alt="Status bar"
            />
            <div
              className="flex gap-0.5 items-start mt-4"
              role="status"
              aria-label="System status"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/098f4e6cc7c061d120395c9a49c287e395d48874?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                className="object-contain shrink-0 w-5 aspect-[1.25]"
                alt="Signal strength"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d903407392f67f430fdd85d64dfe52123227676b?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                className="object-contain shrink-0 w-4 aspect-square"
                alt="WiFi status"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3994c1d0881d2bc9cdd6f36f4dec5f5699fc2836?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                className="object-contain shrink-0 aspect-[1.56] w-[25px]"
                alt="Battery status"
              />
            </div>
          </div>
        </header>

        <div className="flex gap-5 justify-between mt-2 w-full whitespace-nowrap max-w-[334px]">
          <h1
            className="text-3xl tracking-tight leading-none text-black"
            aria-label="WYS Section"
          >
            WYS
          </h1>
          <div
            className="self-start px-1.5 text-xs font-semibold tracking-tight text-center text-white bg-amber-500 rounded-full h-[15px] w-[15px]"
            role="status"
            aria-label="2 notifications"
          >
            2
          </div>
        </div>

        <nav
          className="flex gap-5 justify-between px-3.5 py-2 mt-10 w-full text-xs tracking-tight rounded-3xl bg-zinc-800 max-w-[295px]"
          role="navigation"
          aria-label="Main navigation"
        >
          <button
            className="px-9 py-3 text-black whitespace-nowrap bg-white rounded-2xl"
            aria-current="page"
          >
            Upcoming
          </button>
          <button className="my-auto text-white">
            Your Events
          </button>
        </nav>

        <div
          className="self-start mt-9 ml-14 text-xs tracking-tight text-black"
          aria-label="Section heading"
        >
          Upcoming
        </div>

        <section className="flex relative flex-col gap-5 justify-between items-start pt-96 pr-5 pb-6 pl-14 mt-4 w-full text-xs tracking-tight text-white rounded-none aspect-[0.514]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbad97da0c120d1174acad8d7fca04ea22c21c2f?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
            className="object-cover absolute inset-0 size-full"
            alt="Event background"
            role="img"
          />
          <button
            className="relative px-7 py-2.5 text-center whitespace-nowrap rounded-xl bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
            aria-label="View details"
          >
            View
          </button>
          <button
            className="relative px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
            aria-label="Open chat"
          >
            Go to chat
          </button>
        </section>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ce41e4c5e709ffa991ae102f32f8e8a77bed37a?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
        className="object-contain self-center mt-2 rounded-none aspect-[4.39] w-[373px]"
        alt="Footer decoration"
      />
    </div>
  );
}

export default Listing;