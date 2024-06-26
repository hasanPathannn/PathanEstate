import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserFailure,
  updateUserSuccess,
  userDeleteFailure,
  userDeleteSuccess,
} from "../redux/user/userSlice";

function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [updatSuccess, setUpdateSucces] = useState(false);
  const { currUser, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handleFileupload(file);
    }
  }, [file]);

  console.log(formData);
  console.log(file);
  console.log(filePerc);

  const handleFileupload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (err) => {
        setFileUploadErr(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${currUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSucces(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(userDeleteFailure(data.message));
        return;
      }
      dispatch(userDeleteSuccess());
    } catch (err) {
      dispatch(userDeleteFailure(err.message));
    }
    console.log("handleDelete");
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/sign-out");
      const data = res.json();
      if (data.success === false) {
        dispatch(userDeleteFailure(data.message));
        return;
      }
      dispatch(userDeleteSuccess(data));
    } catch (err) {
      dispatch(userDeleteFailure(err.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-bold text-2xl text-center my-8">PROFILE</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4 items-center "
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
        />
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={formData.avatar || currUser.avatar}
          alt="Photo"
          onClick={() => fileRef.current.click()}
        />
        <p>
          {fileUploadErr ? (
            <span className="text-red-700">
              Upload Failed! Image should not exceed 2MB
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span>{`Uploading: ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Upload Successfully</span>
          ) : (
            ""
          )}
        </p>

        <input
          className="w-full p-3 rounded-lg"
          type="text"
          id="username"
          onChange={(e) => handleInput(e)}
          defaultValue={currUser.username}
          placeholder="USERNAME"
        />
        <input
          className="w-full p-3 rounded-lg"
          type="email"
          id="email"
          onChange={(e) => handleInput(e)}
          defaultValue={currUser.email}
          placeholder="EMAIL"
        />
        <input
          className="w-full p-3 rounded-lg"
          type="password"
          id="password"
          onChange={(e) => handleInput(e)}
          placeholder="PASSWORD"
        />
        <button
          type="submit"
          className="border text-lg w-full p-3 rounded-lg text-white bg-blue-950 hover:bg-lime-600 active:bg-red-950"
        >
          {" "}
          UPDATE
        </button>
      </form>

      <button
        type="button"
        onClick={handleDelete}
        className="border text-lg w-full p-3 rounded-lg text-white bg-red-900 hover:bg-lime-600 active:bg-red-950"
      >
        {" "}
        DELETE ACCOUNT
      </button>

      <button
        onClick={handleSignOut}
        type="button"
        className="border text-lg w-full p-3 rounded-lg text-white bg-neutral-600 hover:bg-lime-600 active:bg-red-950"
      >
        {" "}
        SIGN OUT
      </button>
      <p className="text-red-700">{error ? error : " "}</p>
      <p className="text-center text-lime-700">
        {updatSuccess ? "Update Successfully Done" : " "}
      </p>
    </div>
  );
}

export default Profile;
