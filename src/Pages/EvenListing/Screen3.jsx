"use client";
import * as React from "react";

function WysExperience() {
  return (
    <div
      role="main"
      className="relative mx-auto my-0 w-full bg-white h-[844px] max-w-[390px] max-sm:w-full max-sm:h-screen"
    >
      <header
        className="flex relative justify-between items-center px-10 py-3.5 h-11"
        role="banner"
      >
        <div aria-hidden="true">
          <svg
            width="219"
            height="28"
            viewBox="0 0 219 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[85px] top-[-2px]"
          >
            <path
              d="M0 -2H219C216.894 -1.39731 215.418 0.495246 215.345 2.68446L215.317 3.5618C215.317 17.0587 204.375 28 190.878 28H28.1217C14.6249 28 3.68349 17.0587 3.68349 3.5618L3.65455 2.68447C3.58233 0.49525 2.10586 -1.39731 0 -2Z"
              fill="#020202"
            />
          </svg>
        </div>
        <div
          className="text-base italic tracking-tight text-black"
          role="timer"
          aria-label="Current time"
        >
          9:41
        </div>
        <div className="flex gap-0.5 items-center">
          <div aria-hidden="true">
            <svg
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4001_345)">
                <path
                  opacity="0.35"
                  d="M1.5 4.66666C1.5 3.47005 2.47005 2.5 3.66667 2.5H20.3333C21.53 2.5 22.5 3.47005 22.5 4.66667V10.6667C22.5 11.8633 21.53 12.8333 20.3333 12.8333H3.66667C2.47005 12.8333 1.5 11.8633 1.5 10.6667V4.66666Z"
                  stroke="#020202"
                />
                <path
                  opacity="0.4"
                  d="M24 5.66699V9.66699C24.8047 9.32822 25.328 8.54013 25.328 7.66699C25.328 6.79386 24.8047 6.00577 24 5.66699Z"
                  fill="#020202"
                />
                <path
                  d="M3 5.33333C3 4.59695 3.59695 4 4.33333 4H19.6667C20.403 4 21 4.59695 21 5.33333V10C21 10.7364 20.403 11.3333 19.6667 11.3333H4.33333C3.59695 11.3333 3 10.7364 3 10V5.33333Z"
                  fill="#020202"
                />
              </g>
              <defs>
                <clipPath id="clip0_4001_345">
                  <rect width="25" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </header>

      <div
        className="absolute text-3xl text-black left-[23px] top-[61px]"
        role="heading"
        aria-level="1"
      >
        WYS
      </div>

      <div className="absolute right-8 top-[52px]">
        <div
          className="relative w-9 h-9 rounded-full bg-zinc-300 flex items-center justify-center"
          role="status"
          aria-label="Notification count"
        >
          2
        </div>
      </div>

      <nav
        className="flex absolute left-12 items-center p-2 rounded-3xl bg-zinc-800 h-[49px] top-[121px] w-[295px] max-sm:w-4/5 max-sm:left-[10%]"
        role="navigation"
      >
        <div className="flex relative justify-around w-full">
          <button
            className="px-5 py-2.5 text-xs text-center text-white z-[1]"
            aria-current="page"
          >
            Upcoming
          </button>
          <button className="px-5 py-2.5 text-xs text-center text-white z-[1]">
            Your Events
          </button>
        </div>
      </nav>

      <main className="flex flex-col items-center pt-32">
        <h2 className="mb-10 text-3xl leading-8 text-center text-black">
          Create an experience
        </h2>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcc00708df472f668b8bbb9281b7ee7b120ec45a"
          className="mb-5 opacity-40 h-[246px] w-[220px]"
          alt="Experience placeholder"
          role="img"
        />
        <p className="mb-64 text-xs text-zinc-800">No active events by you</p>
        <button
          className="flex gap-2.5 items-center px-3.5 py-0 text-xs text-white rounded-xl cursor-pointer bg-zinc-800 h-[50px] w-[174px]"
          aria-label="Create your experience"
        >
          <i className="ti ti-edit text-lg" aria-hidden="true" />
          <span>Create your experience</span>
        </button>
      </main>

      <nav
        className="flex absolute justify-between px-8 py-6 rounded-2xl bg-zinc-800 bottom-[3px] h-[85px] left-[9px] w-[373px] max-sm:left-0 max-sm:w-full max-sm:rounded-[15px_15px_0_0]"
        role="navigation"
        aria-label="Main navigation"
      >
        <button aria-label="Home" className="opacity-40">
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9375 24.8828H24.0625M16.4858 4.68296L5.11083 12.3755C4.64919 12.6877 4.375 13.193 4.375 13.7317V28.1286C4.375 29.5073 5.55025 30.625 7 30.625H28C29.4497 30.625 30.625 29.5073 30.625 28.1286V13.7317C30.625 13.193 30.3508 12.6877 29.8892 12.3755L18.5142 4.68296C17.907 4.27235 17.093 4.27235 16.4858 4.68296Z"
              stroke="#F0F0F0"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button aria-label="Calendar" className="opacity-40">
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.3333 2.9165V8.74984M11.6667 2.9165V8.74984M4.375 14.5832H30.625M7.29167 5.83317H27.7083C29.3192 5.83317 30.625 7.13901 30.625 8.74984V29.1665C30.625 30.7773 29.3192 32.0832 27.7083 32.0832H7.29167C5.68084 32.0832 4.375 30.7773 4.375 29.1665V8.74984C4.375 7.13901 5.68084 5.83317 7.29167 5.83317Z"
              stroke="#F0F0F0"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button aria-label="Users" className="opacity-40">
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 31.5L3.50059 26.2494C3.50092 23.3501 5.85133 21 8.75059 21H19.2498M23.625 25.375L25.375 27.125L31.5 21M25.375 3.5C27.4987 4.6904 28.875 6.59878 28.875 8.75C28.875 10.9012 27.4987 12.8096 25.375 14M21 8.75C21 11.6495 18.6495 14 15.75 14C12.8505 14 10.5 11.6495 10.5 8.75C10.5 5.8505 12.8505 3.5 15.75 3.5C18.6495 3.5 21 5.8505 21 8.75Z"
              stroke="#F0F0F0"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button aria-label="Files" className="opacity-40">
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.8001 9.1V13.3C16.8001 14.0732 17.4269 14.7 18.2001 14.7H22.4001M25.2002 3.5H15.3998C13.8534 3.5 12.5998 4.75359 12.5998 6.29999V9.1M25.2002 3.5H25.9812C26.3754 3.5 26.7507 3.66606 27.0223 3.95182C27.4305 4.38127 28.0771 5.0425 28.7001 5.6C29.1885 6.03694 29.9557 6.82109 30.4151 7.29765C30.6636 7.55538 30.8001 7.89949 30.8001 8.25747L30.8001 9.1M25.2002 3.5V7.7C25.2002 8.4732 25.827 9.1 26.6002 9.1H30.8001M30.8001 9.1L30.7998 23.1001C30.7997 24.6464 29.5461 25.9 27.9998 25.9H22.3997M20.3001 11.2C19.6771 10.6425 19.0305 9.98128 18.6223 9.55183C18.3507 9.26606 17.9754 9.1 17.5811 9.1H6.99982C5.45343 9.1 4.19983 10.3536 4.19982 11.9L4.19971 28.6999C4.1997 30.2463 5.4533 31.4999 6.9997 31.4999L19.5998 31.5C21.1461 31.5 22.3997 30.2464 22.3998 28.7001L22.4001 13.8575C22.4001 13.4995 22.2636 13.1554 22.0151 12.8977C21.5557 12.4211 20.7885 11.6369 20.3001 11.2Z"
              stroke="#F38E1C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button aria-label="Chat" className="opacity-40">
          <svg
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.66675 32.0832V32.6867L3.09352 32.2599L8.85363 26.4998H29.1667C30.0357 26.4998 30.7857 26.1875 31.4034 25.5698C32.0211 24.9522 32.3334 24.2021 32.3334 23.3332V5.83317C32.3334 4.96426 32.0211 4.21419 31.4034 3.5965C30.7857 2.97881 30.0357 2.6665 29.1667 2.6665H5.83341C4.9645 2.6665 4.21443 2.97881 3.59674 3.5965C2.97905 4.21419 2.66675 4.96426 2.66675 5.83317V32.0832ZM7.5105 23.0832H7.40855L7.33567 23.1545L6.08341 24.3795V6.08317H28.9167V23.0832H7.5105Z"
              fill="#F0F0F0"
              stroke="#F0F0F0"
              strokeWidth="0.5"
            />
          </svg>
        </button>
      </nav>

      <link
        href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Bakbak+One&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}

export default WysExperience;