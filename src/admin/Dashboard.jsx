import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayouts/AdminLayout";
import LayoutInnerAdmin from "../Layout/AdminLayouts/AdminInner";
import { FaSearch } from "react-icons/fa";
import { FiFlag } from "react-icons/fi";
import { FaLocationPin } from "react-icons/fa6";
import { Link, Links } from "react-router-dom";
import { apiGet } from "../utils/call";

const DashboardAdmin = () => {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: "67efceea034039f94227cea1",
      image:
        "https://imgs.search.brave.com/yI_NQsUIfbdG2mn4MZMvdO5omxXAQFxetSqG2TqerZk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Mi8xNi8yMy8xMC9z/bWlsZS0yMDcyOTA3/XzY0MC5qcGc",
      name: "John Doe",
      gender: "Male",
      location: "Dallas, TX",
    },
    {
      id: "67efceea034039f94227cea2",
      image:
        "https://imgs.search.brave.com/yI_NQsUIfbdG2mn4MZMvdO5omxXAQFxetSqG2TqerZk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Mi8xNi8yMy8xMC9z/bWlsZS0yMDcyOTA3/XzY0MC5qcGc",
      name: "Emily Smith",
      gender: "Female",
      location: "Austin, TX",
    },
    // ... rest of your users (with proper unique IDs)
  ];

  const [userslist, setUserlists] = useState([]);

  const getProfile = async () => {
    const res = await apiGet(`/admin/users`);
    console.log(res.data);
    setUserlists(res.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Filter users based on name/location/gender match
  const filteredUsers = userslist.filter((user) => {
    const value = search.toLowerCase();
    return (
      user?.name?.toLowerCase().includes(value) ||
      user?.location?.toLowerCase().includes(value) ||
      user?.gender?.toLowerCase().includes(value)
    );
  });

  const [flag, setFlag] = useState([]);
  const getFlag = async () => {
    const res = await apiGet(`/admin/flagged-users`);
    console.log(res.data);
    setFlag(res.data);
  };
  useEffect(() => {
    getFlag();
  }, []);
  return (
    <AdminLayout>
      <LayoutInnerAdmin>
        <div className="p-4 w-full flex pb-28 flex-col gap-4">
          {/* Search bar */}
          <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-slate-500">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, location or gender..."
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Flag */}
          <div className="p-3 flex flex-col gap-2">
            <p className="poppins-medium">Flags</p>
            <div className="w-full h-fit p-4 gap-2 flex bg-gray-100 rounded">
              <FiFlag color="orange" size={32} />
              <div className="flex-1 h-full flex-col gap-2 flex">
                <p className="text-xs">
                  Found {flag.length || 0} flagged Profiles
                </p>
                <Link
                  to={"/admin/flag"}
                  className="p-1 w-fit text-white px-3 text-xs font-light bg-black rounded-full"
                >
                  See more
                </Link>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div className="w-full p-4 flex flex-col gap-4">
            <p className="w-full text-2xl poppins-bold">User Management</p>
            <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((item) => (
                  <Link
                    key={item.id}
                    to={`/admin/user/profile/${item._id}`}
                    className="bg-white rounded-2xl shadow flex flex-col items-start "
                  >
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-full aspect-square rounded-xl object-cover"
                    />
                    <div className="px-2 py-2">
                      <h3 className="poppins-medium text-base text-gray-800">
                        {item.name}
                      </h3>
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        <p className="flex items-center gap-1">
                          <FaLocationPin className="text-gray-500" />
                          <span>{item.currentLocation}</span>
                        </p>
                        <p>{item.gender}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No users found.
                </p>
              )}
            </div>
          </div>
        </div>
      </LayoutInnerAdmin>
    </AdminLayout>
  );
};

export default DashboardAdmin;
