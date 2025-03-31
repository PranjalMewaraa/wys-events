"use client";
import * as React from "react";

function TrekEventDetails() {
  return (
    <div
      className="relative bg-white h-[844px] w-[390px] max-sm:w-full"
      role="main"
    >
      {/* Status Bar */}
      <header
        className="flex justify-between items-center px-10 py-3.5 h-11"
        role="banner"
      >
        <div
          className="text-base italic text-black"
          role="status"
          aria-label="Time"
        >
          9:41
        </div>
        <div className="h-[30px] w-[219px]">
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="I436:2122;9:41" layer-name="notch" width="219" height="28" viewBox="0 0 219 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 -2H219C216.894 -1.39731 215.418 0.495246 215.345 2.68446L215.317 3.5618C215.317 17.0587 204.375 28 190.878 28H28.1217C14.6249 28 3.68349 17.0587 3.68349 3.5618L3.65455 2.68447C3.58233 0.49525 2.10586 -1.39731 0 -2Z" fill="#020202"></path></svg>',
            }}
          />
        </div>
        <div className="flex gap-0.5" role="status" aria-label="System status">
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="I436:2122;9:57;9:17" width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_4005_2484)"><path opacity="0.35" d="M1.5 4.66666C1.5 3.47005 2.47005 2.5 3.66667 2.5H20.3333C21.53 2.5 22.5 3.47005 22.5 4.66667V10.6667C22.5 11.8633 21.53 12.8333 20.3333 12.8333H3.66667C2.47005 12.8333 1.5 11.8633 1.5 10.6667V4.66666Z" stroke="#020202"></path><path opacity="0.4" d="M24 5.6665V9.6665C24.8047 9.32773 25.328 8.53964 25.328 7.6665C25.328 6.79337 24.8047 6.00528 24 5.6665Z" fill="#020202"></path><path d="M3 5.33333C3 4.59695 3.59695 4 4.33333 4H19.6667C20.403 4 21 4.59695 21 5.33333V10C21 10.7364 20.403 11.3333 19.6667 11.3333H4.33333C3.59695 11.3333 3 10.7364 3 10V5.33333Z" fill="#020202"></path></g><defs><clipPath id="clip0_4005_2484"><rect width="25" height="16" fill="white"></rect></clipPath></defs></svg>',
            }}
          />
        </div>
      </header>

      <main className="px-6 py-0 max-sm:px-4 max-sm:py-0">
        {/* Back Navigation */}
        <nav className="mt-6" role="navigation">
          <button
            className="flex items-center"
            onClick={() => window.history.back()}
            aria-label="Go back"
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 9C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7V9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM16 7L0.999999 7V9L16 9V7Z" fill="black"></path></svg>',
              }}
            />
          </button>
        </nav>

        <h1 className="-mt-5 text-xs text-center text-black">Himalayas Trek</h1>

        {/* Main Image Section */}
        <section
          className="relative mt-5 max-sm:-mx-4 max-sm:my-2.5"
          aria-label="Trek images"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/18fa717c24207541f1245b992d861cdd5e5ff956"
            className="object-cover h-[280px] rounded-[15px_15px_0_0] w-[341px]"
            alt="Mountain landscape"
            role="img"
          />
          <div className="absolute bottom-5 left-2/4 -translate-x-2/4">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="3" r="3" fill="white"></circle><circle cx="11" cy="3" r="3" fill="white"></circle><circle cx="18" cy="3" r="2" fill="white"></circle><circle cx="24" cy="3" r="2" fill="white"></circle></svg>',
              }}
            />
          </div>
        </section>

        {/* Trek Details Section */}
        <section
          className="p-5 -mt-5 bg-white rounded-2xl max-sm:-mx-4 max-sm:my-0"
          aria-label="Trek details"
        >
          <div className="mb-5">
            <h2 className="mb-3 text-xl text-black">Himalayas Trek</h2>
            <div className="flex flex-col gap-3">
              <div
                className="flex gap-2 items-center text-xs text-black"
                role="group"
                aria-label="Date and time"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1.25V3.75M5 1.25V3.75M1.875 6.25H13.125M3.125 2.5H11.875C12.5654 2.5 13.125 3.05964 13.125 3.75V12.5C13.125 13.1904 12.5654 13.75 11.875 13.75H3.125C2.43464 13.75 1.875 13.1904 1.875 12.5V3.75C1.875 3.05964 2.43464 2.5 3.125 2.5Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
                  }}
                />
                <span>26 Jun 2025</span>
                <div
                  className="mx-1 my-0 w-1 h-1 rounded-full bg-zinc-800"
                  role="separator"
                />
                <span>8:00 AM</span>
              </div>

              <div
                className="flex gap-2 items-center text-xs text-black"
                role="group"
                aria-label="Location"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.5C8.825 16.5 8.675 16.45 8.55 16.35C8.425 16.25 8.33125 16.1187 8.26875 15.9562C8.03125 15.2562 7.73125 14.6 7.36875 13.9875C7.01875 13.375 6.525 12.6562 5.8875 11.8312C5.25 11.0062 4.73125 10.2188 4.33125 9.46875C3.94375 8.71875 3.75 7.8125 3.75 6.75C3.75 5.2875 4.25625 4.05 5.26875 3.0375C6.29375 2.0125 7.5375 1.5 9 1.5C10.4625 1.5 11.7 2.0125 12.7125 3.0375C13.7375 4.05 14.25 5.2875 14.25 6.75C14.25 7.8875 14.0312 8.8375 13.5938 9.6C13.1687 10.35 12.675 11.0938 12.1125 11.8312C11.4375 12.7312 10.925 13.4812 10.575 14.0812C10.2375 14.6687 9.95625 15.2937 9.73125 15.9562C9.66875 16.1312 9.56875 16.2688 9.43125 16.3688C9.30625 16.4563 9.1625 16.5 9 16.5ZM9 13.8187C9.2125 13.3937 9.45 12.975 9.7125 12.5625C9.9875 12.15 10.3875 11.6 10.9125 10.9125C11.45 10.2125 11.8875 9.56875 12.225 8.98125C12.575 8.38125 12.75 7.6375 12.75 6.75C12.75 5.7125 12.3813 4.83125 11.6438 4.10625C10.9188 3.36875 10.0375 3 9 3C7.9625 3 7.075 3.36875 6.3375 4.10625C5.6125 4.83125 5.25 5.7125 5.25 6.75C5.25 7.6375 5.41875 8.38125 5.75625 8.98125C6.10625 9.56875 6.55 10.2125 7.0875 10.9125C7.6125 11.6 8.00625 12.15 8.26875 12.5625C8.54375 12.975 8.7875 13.3937 9 13.8187ZM9 8.625C9.525 8.625 9.96875 8.44375 10.3312 8.08125C10.6937 7.71875 10.875 7.275 10.875 6.75C10.875 6.225 10.6937 5.78125 10.3312 5.41875C9.96875 5.05625 9.525 4.875 9 4.875C8.475 4.875 8.03125 5.05625 7.66875 5.41875C7.30625 5.78125 7.125 6.225 7.125 6.75C7.125 7.275 7.30625 7.71875 7.66875 8.08125C8.03125 8.44375 8.475 8.625 9 8.625Z" fill="#1D1B20"></path></svg>',
                  }}
                />
                <span>Praygraj, Uttarakhand</span>
              </div>

              <div
                className="flex gap-5 items-center text-xs text-black"
                role="group"
                aria-label="Availability"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_436_2152)"><path d="M7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 11.25C9.57107 11.25 11.25 9.57107 11.25 7.5C11.25 5.42893 9.57107 3.75 7.5 3.75C5.42893 3.75 3.75 5.42893 3.75 7.5C3.75 9.57107 5.42893 11.25 7.5 11.25Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 8.75C8.19036 8.75 8.75 8.19036 8.75 7.5C8.75 6.80964 8.19036 6.25 7.5 6.25C6.80964 6.25 6.25 6.80964 6.25 7.5C6.25 8.19036 6.80964 8.75 7.5 8.75Z" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>',
                  }}
                />
                <div className="flex gap-1">
                  <span>Total Slots</span>
                  <span>7</span>
                </div>
                <div className="flex gap-1 text-green-800">
                  <span>Slots Available</span>
                  <span>2</span>
                </div>
              </div>

              <div
                className="flex gap-2 items-center text-xs text-black"
                role="group"
                aria-label="Price"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/564b697172e49803c51cbbace728bafcf318f0a9"
                  alt="Price icon"
                />
                <span>Rs. 3000 per person</span>
              </div>
            </div>
          </div>

          {/* Organizer Section */}
          <div
            className="flex gap-3 items-center px-0 py-5 border-solid border-y-[0.5px] border-y-zinc-800"
            role="region"
            aria-label="Organizer information"
          >
            <div
              className="w-8 h-8 rounded-full bg-zinc-300"
              role="img"
              aria-label="Organizer profile picture"
            />
            <div className="flex-1">
              <div className="text-xs text-black">Jhone Doe</div>
              <div className="text-xs text-black">active since 2025</div>
            </div>
            <div className="px-3 py-2 text-white bg-green-800 rounded-xl h-[41px] w-[54px]">
              <div className="text-xs">Rating</div>
              <div className="flex gap-0.5 items-center text-xs">
                <span>4.2</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99992 0.833496L6.28742 3.44183L9.16659 3.86266L7.08325 5.89183L7.57492 8.7585L4.99992 7.40433L2.42492 8.7585L2.91659 5.89183L0.833252 3.86266L3.71242 3.44183L4.99992 0.833496Z" fill="#F38E1C"></path></svg>',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div
            className="mx-0 my-5 text-xs text-black"
            role="region"
            aria-label="Event description"
          >
            Description about the event, Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
            pellentesque eu, pretium quis.
          </div>

          <button
            className="text-xs text-black underline w-[49px]"
            aria-label="Read more about the event"
          >
            Read More
          </button>

          <button
            className="ml-auto text-xs text-amber-500 rounded-3xl border border-amber-500 border-solid h-[29px] w-[104px]"
            aria-label="Leave a review"
          >
            Leave review
          </button>
        </section>

        {/* Review Modal */}
        <div
          className="flex absolute top-0 left-0 justify-center items-center bg-zinc-800 bg-opacity-50 size-full"
          role="dialog"
          aria-label="Share experience"
        >
          <div className="p-5 bg-white rounded-xl w-[341px]">
            <div className="mb-8 text-xl text-center">
              <span>Share your</span>
              <span className="text-amber-500">experience</span>
            </div>
            <div>
              <div className="mb-5 text-xl text-center">
                Did the event happen?
              </div>
              <div className="flex gap-11 justify-center">
                <button className="text-sm text-amber-500 bg-white border border-amber-500 border-solid h-[33px] rounded-[100px] w-[89px]">
                  Yes
                </button>
                <button className="text-sm text-black bg-white border border-solid border-zinc-800 h-[33px] rounded-[100px] w-[89px]">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Attendees Section */}
        <section className="mt-5" role="region" aria-label="Event attendees">
          <div className="flex gap-2.5 items-center mb-5 text-base">
            <h2>Going</h2>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  '<svg width="329" height="104" viewBox="0 0 329 104" fill="none" xmlns="http://www.w3.org/2000/svg"><text fill="black" xml:space="preserve" style="white-space: pre" font-family="ABeeZee" font-size="16" letter-spacing="-0.24px"><tspan x="0" y="14.764">Going</tspan></text><rect y="31" width="329" height="40" fill="white"></rect><circle cx="311" cy="51" r="2" fill="#333333"></circle><circle cx="319" cy="51" r="2" fill="#333333"></circle><circle cx="327" cy="51" r="2" fill="#333333"></circle></svg>',
              }}
            />
          </div>

          <div className="bg-white">
            <div className="flex items-center px-0 py-4">
              <img
                src="https://placehold.co/41x40/e0e0e0/e0e0e0"
                className="mr-2.5 h-10 rounded-full w-[41px]"
                alt="Attendee"
              />
              <div className="flex-1">
                <div className="text-sm text-black">Aditi Wanderlust</div>
                <div className="text-xs text-zinc-800">
                  Joined on 12 May 2025
                </div>
              </div>
              <div className="flex gap-1">
                <div className="mx-1 my-0 w-1 h-1 rounded-full bg-zinc-800" />
                <div className="mx-1 my-0 w-1 h-1 rounded-full bg-zinc-800" />
                <div className="mx-1 my-0 w-1 h-1 rounded-full bg-zinc-800" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}

export default TrekEventDetails;