import React, { useState } from "react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "Alex Johnson",
    userName: "alexjohnson",
    email: "alex.johnson@example.com",
    address: "456 Tech Lane, Silicon Valley, CA 94000",
  });

  const [formData, setFormData] = useState({
    fullName: userDetails.fullName,
    userName: userDetails.userName,
    address: userDetails.address,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setUserDetails((prev) => ({
      ...prev,
      ...formData,
    }));
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-gray-600">
                {userDetails.fullName.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {userDetails.fullName}
              </h2>
              <p className="text-gray-500 text-sm">@{userDetails.userName}</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {isEditing ? (
            // Edit Mode
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
          ) : (
            // View Mode
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-gray-600 text-sm block mb-1">
                  Full Name
                </span>
                <p className="text-gray-800">{userDetails.fullName}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-gray-600 text-sm block mb-1">
                  Username
                </span>
                <p className="text-gray-800">@{userDetails.userName}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-gray-600 text-sm block mb-1">Email</span>
                <p className="text-gray-800">{userDetails.email}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <span className="text-gray-600 text-sm block mb-1">
                  Address
                </span>
                <p className="text-gray-800">{userDetails.address}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6">
            {isEditing ? (
              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
