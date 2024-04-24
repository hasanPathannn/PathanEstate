import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserListing = () => {
  const { currUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);

  useEffect(() => {
    handleShowListings();
  }, [userListings]);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listing/${currUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (err) {
      setShowListingsError(true);
    }
  };

  const handleDeleteListings = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-row gap-2 justify-around">
          {userListings.map((listing) => (
            <Link
              key={listing._id}
              className="text-slate-700 font-semibold flex-1"
              to={`/listing/${listing._id}`}
            >
              <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-black dark:shadow-gray-700/25">
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-56 w-full object-cover"
                />

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {listing.name}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                    {listing.description}
                  </p>

                  <div className="flex justify-between mt-5 text-white text-lg">
                    <Link to="/user-listing/">
                      <button
                        onClick={() => handleDeleteListings(listing._id)}
                        className="p-2 px-4 border-solid bg-red-600 rounded-lg hover:opacity-80 active:text-gray-900"
                      >
                        Delete
                      </button>
                    </Link>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className="p-2 px-4 border-solid bg-green-800 rounded-lg hover:opacity-80 active:text-gray-900">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default UserListing;
