import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold "> SIGN-UP</h1>
      <form className="flex flex-col gap-4 rounded-lg p-4 ">
        <input
          className="border p-2 rounded-lg "
          type="text"
          placeholder="USERNAME"
          id="username"
        />
        <input
          className="border p-2 rounded-lg "
          type="email"
          placeholder="EMAIL"
          id="email"
        />
        <input
          className="border p-2 rounded-lg "
          type="password"
          placeholder="PASSWORD"
          id="password"
        />
        <button className="border text-lg p-3 rounded-lg text-white bg-lime-700 hover:bg-lime-600 active:bg-red-950">
          {" "}
          SIGN-UP
        </button>
      </form>

      <div className="flex gap-2 px-6">
        <p>Already have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-600">Sign-in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
