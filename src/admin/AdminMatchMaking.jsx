import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayouts/AdminLayout";
import LayoutInnerAdmin from "../Layout/AdminLayouts/AdminInner";
import { FaSearch } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { apiGet } from "../utils/call";
import { Link } from "react-router-dom";

const DashboardAdminMatchmaking = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getUsers = async () => {
    const res = await apiGet("/admin/users");
    console.log(res.data);
    setUserData(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = userData.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.currentLocation?.toLowerCase().includes(query) ||
      user.gender?.toLowerCase().includes(query)
    );
  });

  return (
    <AdminLayout>
      <LayoutInnerAdmin>
        <div className="p-4 w-full flex pb-28 flex-col gap-4">
          {/* Searchbar */}
          <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-slate-500">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* User Management */}
          <div className="w-full p-4 flex-col gap-4">
            <p className="w-full text-2xl poppins-bold mb-4">
              Manual Matchmaking
            </p>
            <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((item) => (
                  <Link
                    to={`/admin/people/match/${item._id}`}
                    key={item._id}
                    className="bg-white rounded-2xl shadow flex flex-col items-start"
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
                <p className="text-gray-500 col-span-full text-center">
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

export default DashboardAdminMatchmaking;
