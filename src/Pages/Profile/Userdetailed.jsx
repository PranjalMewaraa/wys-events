import Layout from "../../Layout/Layout";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

import { useNavigate, Link } from "react-router-dom";
import { MdCheckCircle, MdErrorOutline } from "react-icons/md";
import SelectGroup from "../../components/SelectGroup";
import InputBox from "../../components/InputBox";

const Userdetailed = () => {


    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userID");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `https://wysbackend.onrender.com/api/users/${userId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <Layout>
            <div className="w-full h-full min-h-screen flex flex-col items-center  p-4">
                <div className="max-w-sm w-full flex flex-col items-center">
                    {/* Header */}
                    <div className="flex justify-between items-center w-full m-4">
                        <FaLongArrowAltLeft
                            className="text-xl cursor-pointer"
                            onClick={() => navigate(-1)}
                        />
                        <p className="text-sm font-medium">About you</p>
                        <HiDotsHorizontal className="text-xl" />
                    </div>


                </div>
                <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-xl object-cover m-2"
                />
                <p className="text-xl font-semibold mt-2">{user.name}</p>
                <p className="text-gray-500">{user.currentLocation}</p>
                <div className="py-3 my-2 w-full md:w-2xl ">
                    <div className="flex flex-col">
                        <div className="flex flex-col poppins-light my-2">
                            <span>Hey Traveller</span>
                            <span>What should we call you?</span>

                        </div>

                        <div
                            className="focus:outline-none border-b border-black"
                        >               {user.name}
                        </div>
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="flex flex-col poppins-light my-2">
                            <span>Where are you now?</span>

                        </div>

                        <div
                            className="focus:outline-none border-b border-black"
                        >               {user.currentLocation}
                        </div>
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="flex flex-col poppins-light my-2">
                            <span>How to get in touch?</span>

                        </div>

                        <div
                            className="focus:outline-none border-b border-black"
                        >               {user.mobileNo}
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col mt-6">
                        <div className="flex flex-col poppins-light mt-4">
                            <span>When's your birthday?</span>

                        </div>

                        <div
                            className="focus:outline-none border-b border-black"
                        >   

                                    {format(new Date(user.dateOfBirth), "dd MMM yyyy")}
                        </div>
                    </div>


                    <div
                        className={"flex flex-row gap-2 my-2 w-full  flex-wrap"}>
                            <div className="flex flex-col poppins-light mt-4">
                            <span>Gender</span>

                        </div>
                        <label className={`select-group-item text-sm w-fit poppins-light  `}>
                            <span className="text-xs">{user.gender}</span>

                        </label>


                    </div>
                    
                </div>
            </div>
        </Layout>
    );
};

export default Userdetailed;