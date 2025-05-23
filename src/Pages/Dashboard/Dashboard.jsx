import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";
import DashLayout from "../../Layout/DashLayout";
import { Link } from "react-router-dom";
import { apiGet } from "../../utils/call";

const Dashboard = () => {
  const userId = localStorage.getItem("userID");
  const [profile, setProfile] = useState({});
  const getMyProfile = async () => {
    const res = await apiGet(`/users/${userId}`);
    console.log(res.data);
    setProfile(res.data);
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <Layout>
      <DashLayout>
        <div className="flex-1 w-full h-ful flex gap-8 py-8 items-center flex-col bg-contain bg-center ">
          {profile?.role === "admin" && (
            <Link
              to={"/admin"}
              className="w-4/5  h-24 flex bg-no-repeat bg-cover bg-center justify-center items-center border border-black rounded-2xl"
              style={{
                backgroundImage: "url('/d1.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            >
              <p className="poppins-bold mt-8 text-lg">Admin Panel</p>
            </Link>
          )}

          <Link
            to={"/people"}
            className="w-4/5  h-24 flex bg-no-repeat bg-cover bg-center justify-center items-center border border-black rounded-2xl"
            style={{
              backgroundImage: "url('/d1.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          >
            <p className="poppins-bold mt-8 text-lg">Find a companion</p>
          </Link>
          <Link
            to={"/events"}
            className="w-4/5  h-24 flex bg-no-repeat bg-cover bg-center justify-center items-center border border-black rounded-2xl"
            style={{
              backgroundImage: "url('/d2.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          >
            <p className="poppins-bold mt-8 text-lg">Events for you</p>
          </Link>
          <Link
            to={"/listing/input"}
            className="w-4/5  h-24 flex bg-no-repeat bg-cover bg-center justify-center items-center border border-black rounded-2xl"
            style={{
              backgroundImage: "url('/d3.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
            }}
          >
            <p className="poppins-bold mt-8 text-lg">Create an experience</p>
          </Link>
        </div>
      </DashLayout>
    </Layout>
  );
};

export default Dashboard;
