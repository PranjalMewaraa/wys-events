"use client";
import * as React from "react";

function EventListing() {
  return (
    <article
      className="flex flex-col mx-auto w-full max-w-[480px]"
      role="article"
    >
      <div className="flex overflow-hidden flex-col items-start px-2 w-full bg-white">
        <header className="flex overflow-hidden gap-4 items-start self-stretch pr-4 pb-2.5 pl-8 w-full bg-white">
          <div className="grow mt-3.5 text-base italic tracking-tight leading-snug text-black">
            9:41
          </div>
          <div className="flex flex-auto items-start">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7413a31b7a6d643e420db1ba2614f50407ffe996?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              alt="Status bar"
              className="object-contain shrink-0 max-w-full aspect-[7.81] fill-black w-[219px]"
            />
            <div className="flex gap-0.5 items-start mt-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/098f4e6cc7c061d120395c9a49c287e395d48874?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                alt="Status icon"
                className="object-contain shrink-0 w-5 aspect-[1.25]"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d903407392f67f430fdd85d64dfe52123227676b?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                alt="Status icon"
                className="object-contain shrink-0 w-4 aspect-square"
              />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2faddf2852580982b14905c7af59b96ea75cb992?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                alt="Status icon"
                className="object-contain shrink-0 aspect-[1.56] w-[25px]"
              />
            </div>
          </div>
        </header>

        <div className="flex gap-5 justify-between mt-2 ml-8 max-w-full text-xs tracking-tight leading-8 text-black w-[199px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/964fce9e1c634c03ead4985407efc211a748b06a?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
            alt="Trek icon"
            className="object-contain shrink-0 my-auto aspect-[1.21] w-[17px]"
          />
          <h1 className="text-xs">Himalayas Trek</h1>
        </div>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/72a84b3b87ebcb652fb5099e874e8c8e8e5b8604?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
          alt="Himalayas Trek landscape"
          className="object-contain self-center mt-8 w-full rounded-none aspect-[1.22] max-w-[341px]"
        />

        <section className="flex gap-5 justify-between self-center mt-3 w-full max-w-[341px]">
          <h2 className="text-xl tracking-tight leading-relaxed text-black">
            Himalayas Trek
          </h2>
          <button
            className="self-start px-2.5 py-2.5 text-xs tracking-tight text-center text-amber-500 rounded-3xl border border-amber-500 border-solid"
            aria-label="Share your experience"
          >
            Share your experience
          </button>
        </section>

        <section
          className="flex flex-col gap-2 mt-3 ml-5"
          aria-label="Event details"
        >
          <div className="flex gap-2 items-center text-xs tracking-tight leading-3 text-black">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/394837d0d5b2c69a3ee173384a1de268f452ccde?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              alt="Calendar icon"
              className="object-contain shrink-0 self-stretch aspect-square w-[15px]"
            />
            <time className="self-stretch my-auto">26 Jun 2025</time>
            <time className="self-stretch my-auto text-center">8:00 AM</time>
          </div>

          <div className="flex gap-2 text-xs tracking-tight leading-3 text-black">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0898970ccc6ff7b6bbfb07df09d66ede40e0ef3a?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              alt="Location icon"
              className="object-contain shrink-0 aspect-square w-[18px]"
            />
            <address className="my-auto basis-auto not-italic">
              Praygraj, Uttarakhand
            </address>
          </div>

          <div className="flex gap-2 items-start text-xs tracking-tight">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/514abc6b5c19da4f9d834e9bf4171789f5176058?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              alt="Slots icon"
              className="object-contain shrink-0 self-stretch aspect-square w-[15px]"
            />
            <div className="flex gap-1 text-black">
              <span>Total Slots</span>
              <span>7</span>
            </div>
            <div className="flex gap-1 text-green-800">
              <span>Slots Available</span>
              <span>2</span>
            </div>
          </div>

          <div className="flex gap-2 text-xs tracking-tight text-black">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d2af160ac6c5e624e3f46be4712abb904dc8c08?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              alt="Price icon"
              className="object-contain shrink-0 aspect-square w-[15px]"
            />
            <span>Rs. 3000 per person</span>
          </div>
        </section>

        <section
          className="flex gap-10 self-center py-1.5 pr-3 pl-1 mt-5 w-full tracking-tight bg-white border-t border-b border-zinc-800 max-w-[341px]"
          aria-label="Organizer information"
        >
          <div className="flex flex-1 gap-2.5 self-start mt-1.5 text-black">
            <div
              className="flex shrink-0 self-start w-8 h-8 rounded-full bg-zinc-300"
              role="img"
              aria-label="Profile picture of Jhone Doe"
            />
            <div className="flex flex-col">
              <div className="self-start text-xs">Jhone Doe</div>
              <div className="mt-2.5 text-xs">active since 2025</div>
            </div>
          </div>
          <div className="flex flex-1 gap-2 text-white whitespace-nowrap">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/89f188d1d9db5f5275ec7b0010a5b27d8d712d07?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              alt="Rating badge"
              className="object-contain shrink-0 rounded-none aspect-[1.12] w-[46px]"
            />
            <div className="px-3 py-2 bg-green-800 rounded-xl">
              <div className="text-xs">Rating</div>
              <div className="flex gap-0.5 text-xs">
                <span>4.2</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/eceb9feb3bb9e619ffd1c8a9f53731aa10c2c401?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
                  alt="Star icon"
                  className="object-contain shrink-0 my-auto w-2.5 aspect-square"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="self-center mt-5" aria-label="Event description">
          <p className="text-xs tracking-tight text-black">
            Description about the event, Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
            pellentesque eu, pretium quis.
          </p>
          <button className="mt-2 ml-5 text-xs tracking-tight text-black">
            Read More
          </button>
          <div className="shrink-0 ml-5 h-px border border-black border-solid w-[49px]" />
        </section>

        <section className="mt-10" aria-label="Attendees">
          <h3 className="ml-6 text-base tracking-tight text-black">Going</h3>
          <div className="flex gap-2.5 self-center pr-16 mt-3 max-w-full tracking-tight bg-white w-[329px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8930b25fd82d14c27cb2e6e564185fca344485f1?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              alt="Aditi's profile picture"
              className="object-contain shrink-0 aspect-[1.02] w-[41px]"
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
          <div className="flex flex-col items-start self-center mt-6 max-w-full bg-white w-[329px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a734892be0ebc702d9b917b29fa191564079adf?placeholderIfAbsent=true&apiKey=4d8d61fdffcb4a598737f184e595e38e"
              alt="Additional attendees"
              className="object-contain aspect-[5.13] w-[41px]"
            />
          </div>
        </section>
      </div>
      <div className="z-10 self-start -mt-1.5 ml-20 text-sm tracking-tight leading-loose text-black">
        Aditi Wanderlust
      </div>
    </article>
  );
}

export default EventListing;