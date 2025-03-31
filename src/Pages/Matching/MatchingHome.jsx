import React from "react";
import { FaInstagram, FaLinkedin, FaStar } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";
import { Link } from "react-router-dom";

const MatchingHome = () => {
  return (
    <Layout>
      <LayoutInnerMain>
        <div className="w-full h-full mb-24 bg-white mx-auto p-4 overflow-y-scroll">
          {/* Header */}
          <div className="w-full p-4 poppins-light-italic flex justify-center flex-col items-center text-xl">
            <p>Find Seekers</p>
            <p>Find Experiences</p>
          </div>

          <Card />
          <Card />

          {/* Say Hello Button */}
          <button className="mt-6 w-full bg-gray-900 text-white text-lg py-3 rounded-lg flex items-center justify-center font-medium">
            👋 Say Hello
          </button>
        </div>
      </LayoutInnerMain>
    </Layout>
  );
};

const Card = () => {
  return (
    <Link
      to={"/people/detail"}
      className="flex flex-col mt-4 max-w-sm w-full max-h-96 gap-4 items-center"
    >
      <div className="w-full h-full aspect-square object-fill overflow-hidden rounded-xl">
        <img
          src="https://imgs.search.brave.com/VHUvL7y6Eh8PrBgb1vDIOWhqQwsV7dxyDXNlLWHtT0k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1i/ZWF1dGlmdWwtZ2ly/bC1ibGFjay10c2hp/cnRfNDI3NzcxLTM3/MC5qcGc_c2VtdD1h/aXNfaHlicmlk"
          className="h-full origin-top object-top object-cover w-full"
          alt=""
        />
      </div>
      <div className="flex gap-2 justify-between px-2 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Aditi WanderLust</h2>
          <div className="flex flex-wrap items-center text-sm">
            <p className=" text-gray-500">Female</p>
            <p className="flex items-center  text-gray-500">
              <GrLocationPin /> Mumbai, India
            </p>
          </div>
          <div className="flex gap-2 py-2">
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-fit flex gap-2 items-center">
            <div className="flex justify-center h-full items-center bg-green-700 p-2 text-white poppins-semibold rounded-lg">
              80%
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchingHome;
