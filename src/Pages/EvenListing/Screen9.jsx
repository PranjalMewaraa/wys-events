"use client";
import * as React from "react";

function TrekEventDetails() {
  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
  const [selectedRating, setSelectedRating] = React.useState(0);

  const toggleReviewModal = () => {
    setIsReviewModalOpen(!isReviewModalOpen);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=ABeeZee:ital,wght@0,400;1,400&family=Poppins:wght@600&family=Raleway:wght@400&display=swap"
      />
      <main className="relative mx-auto max-w-none bg-white h-[844px] w-[390px] max-md:max-w-[991px] max-sm:w-full max-sm:max-w-screen-sm">
        <header className="relative">
          <button
            aria-label="Go back"
            className="absolute left-[39px] top-[68px] z-[2]"
          >
            <i className="ti ti-arrow-left" aria-hidden="true" />
          </button>
          <h1 className="absolute text-xs tracking-tight leading-8 text-black left-[154px] top-[52px]">
            Himalayas Trek
          </h1>
        </header>

        <section className="overflow-hidden absolute shadow-sm h-[280px] left-[25px] rounded-[15px_15px_0_0] top-[115px] w-[341px] max-sm:left-[5%] max-sm:w-[90%]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/18fa717c24207541f1245b992d861cdd5e5ff956"
            className="object-cover size-full"
            alt="Mountain landscape"
            role="img"
          />
          <div
            className="flex absolute gap-2 left-[182px] top-[268px]"
            role="navigation"
            aria-label="Image carousel"
          >
            {[1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                className="w-1.5 h-1.5 rounded-full bg-white"
                aria-label={Go to slide ${dot}}
              />
            ))}
          </div>
        </section>

        <article className="absolute left-6 top-[407px] w-[346px] max-sm:left-[5%] max-sm:w-[90%]">
          <h2 className="mb-3 text-xl tracking-tight leading-8 text-black">
            Himalayas Trek
          </h2>

          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center text-xs text-black">
              <i className="ti ti-calendar" aria-hidden="true" />
              <time dateTime="2025-06-26">26 Jun 2025</time>
              <span className="mx-1.5 my-0" aria-hidden="true">
                •
              </span>
              <time dateTime="08:00">8:00 AM</time>
            </div>

            <div className="flex gap-2 items-center text-xs text-black">
              <i className="ti ti-map-pin" aria-hidden="true" />
              <span>Praygraj, Uttarakhand</span>
            </div>

            <div className="flex gap-5 items-center text-xs">
              <div className="flex gap-2 items-center">
                <i className="ti ti-target" aria-hidden="true" />
                <span>Total Slots</span>
                <span>7</span>
              </div>
              <div className="flex gap-2 items-center text-green-800">
                <span>Slots Available</span>
                <span>2</span>
              </div>
            </div>

            <div className="flex gap-2 items-center text-xs">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/564b697172e49803c51cbbace728bafcf318f0a9"
                className="h-[15px] w-[15px]"
                alt="Money icon"
                role="img"
              />
              <span>Rs. 3000 per person</span>
            </div>
          </div>

          <div className="flex items-center px-0 py-4 mt-5 border-solid border-y-[0.5px] border-y-zinc-800">
            <div
              className="w-8 h-8 rounded-full bg-zinc-300"
              role="img"
              aria-label="Host profile picture"
            />
            <div className="ml-3">
              <div className="text-xs text-black">Jhone Doe</div>
              <div className="text-xs text-black">active since 2025</div>
            </div>
            <div className="px-3 py-2 ml-auto text-white bg-green-800 rounded-xl">
              <div className="text-xs">Rating</div>
              <div className="flex gap-1 items-center text-xs">
                <span>4.2</span>
                <i className="ti ti-star" aria-hidden="true" />
              </div>
            </div>
            <div className="ml-5">65%</div>
          </div>

          <div className="mt-5 text-xs tracking-tight text-black">
            Description about the event, Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
            pellentesque eu, pretium quis.
          </div>

          <button className="mt-2 text-xs text-black border-b border-solid border-b-black w-[49px]">
            Read More
          </button>
        </article>

        <button
          onClick={toggleReviewModal}
          className="absolute right-6 px-6 py-2.5 text-xs text-amber-500 rounded-3xl border border-amber-500 border-solid top-[410px]"
        >
          Leave review
        </button>

        <section className="absolute left-[31px] top-[740px] w-[329px] max-sm:left-[5%] max-sm:w-[90%]">
          <div className="flex gap-2.5 items-center text-base text-black">
            <span>Going</span>
            <div className="flex justify-center items-center bg-amber-500 rounded-full h-[15px] text-[white] w-[15px]">
              <i className="ti ti-check" aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-center p-2.5 mt-5">
            <img
              src="https://placehold.co/40x40/e0e0e0/e0e0e0"
              className="w-10 h-10 rounded-full"
              alt="Attendee profile"
              role="img"
            />
            <div className="ml-2.5">
              <div className="text-sm text-black">Aditi Wanderlust</div>
              <div className="text-xs text-zinc-800">Joined on 12 May 2025</div>
            </div>
            <button className="flex gap-1 ml-auto" aria-label="More options">
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
            </button>
          </div>
        </section>

        {isReviewModalOpen && (
          <div
            className="flex absolute top-0 left-0 justify-center items-center bg-zinc-800 bg-opacity-50 size-full"
            role="dialog"
            aria-labelledby="review-modal-title"
          >
            <div className="p-8 text-center rounded-xl w-[341px] bg-white">
              <h2
                id="review-modal-title"
                className="mb-10 text-xl font-semibold"
              >
                <span>Leave a </span>
                <span className="text-amber-500">review</span>
              </h2>

              <div className="mb-10">
                <div className="flex gap-5 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      aria-label={Rate ${star} stars}
                    >
                      <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill={selectedRating >= star ? "#F38E1C" : "none"}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5 2.25L16.9763 9.2925L24.75 10.4288L19.125 15.9075L20.4525 23.6475L13.5 19.9913L6.5475 23.6475L7.875 15.9075L2.25 10.4288L10.0237 9.2925L13.5 2.25Z"
                          stroke="#F38E1C"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="mx-auto my-0 text-xl opacity-40 text-zinc-800 w-[190px]"
                onClick={() => {
                  // Handle submit logic
                  setIsReviewModalOpen(false);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default TrekEventDetails;