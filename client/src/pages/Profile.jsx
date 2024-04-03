import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const { currUser } = useSelector((state) => state.user);

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
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-bold text-2xl text-center my-8">PROFILE</h1>
      <form className="flex flex-col gap-4 items-center ">
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
          type="submit"
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
