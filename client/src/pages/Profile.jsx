import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-bold text-2xl text-center my-8">PROFILE</h1>
      <form className="flex flex-col gap-4 items-center ">
        <img
          className="w-25 h-25 rounded-3xl"
          src={currUser.avatar}
          alt="Photo"
        />
        <input
          className="w-full p-3 rounded-lg"
          type="text"
          placeholder="USERNAME"
        />
        <input
          className="w-full p-3 rounded-lg"
          type="text"
          placeholder="EMAIL"
        />
        <input
          className="w-full p-3 rounded-lg"
          type="text"
          placeholder="PASSWORD"
        />
        <button
          type="button"
          className="border text-lg w-full p-3 rounded-lg text-white bg-blue-950 hover:bg-lime-600 active:bg-red-950"
        >
          {" "}
          UPDATE
        </button>
      </form>

      <button
        type="button"
        className="border text-lg w-full p-3 rounded-lg text-white bg-red-900 hover:bg-lime-600 active:bg-red-950"
      >
        {" "}
        DELETE ACCOUNT
      </button>

      <button
        type="button"
        className="border text-lg w-full p-3 rounded-lg text-white bg-neutral-600 hover:bg-lime-600 active:bg-red-950"
      >
        {" "}
        SIGN OUT
      </button>
    </div>
  );
}

export default Profile;
