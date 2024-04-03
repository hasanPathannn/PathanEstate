import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [signUpData, setsignUpData] = useState({});
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setsignUpData({ ...signUpData, [e.target.id]: e.target.value });
    console.log(signUpData);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setErr(data.message);
        return;
      }
      setErr(null);
      navigate("/sign-in");
    } catch (err) {
      setErr(err.message);
    }

    console.log("Sumit button is clicked");
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold "> SIGN-UP</h1>
      <form
        onSubmit={(e) => handleOnSubmit(e)}
        className="flex flex-col gap-4 rounded-lg p-4 "
      >
        <input
          className="border p-2 rounded-lg "
          type="text"
          placeholder="USERNAME"
          id="username"
          onChange={handleInput}
        />
        <input
          className="border p-2 rounded-lg "
          type="email"
          placeholder="EMAIL"
          id="email"
          onChange={handleInput}
        />
        <input
          className="border p-2 rounded-lg "
          type="password"
          placeholder="PASSWORD"
          id="password"
          onChange={handleInput}
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
      <OAuth />
      <div className="text-red-700 px-6 my-2">{err && <p>{err}</p>}</div>
    </div>
  );
}

export default SignUp;
