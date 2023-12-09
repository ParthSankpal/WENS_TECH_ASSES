import { useSelector } from "react-redux";
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
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const fileRef = useRef(null);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);

  const [filePercentage, setFilePercentage] = useState(0);

  const [fileUploadError, setFileUploadError] = useState(false);

  const [formData, setFormData] = useState({});
  console.log(formData);
  // console.log(filePercentage);
  // console.log(fileUploadError);

  // console.log(file);

  const dispatch = useDispatch();

  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpoad(file);
    }
  }, [file]);

  const handleFileUpoad = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
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
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

   const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };


  const handleSignOut =async ()=>{
    dispatch(signOutUserStart());
    try {
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  return (
    <div className="font-Higuen p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center ">Profile</h1>

      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile_image"
          className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-4"
        />

        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-green-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          className=" border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="text"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className=" border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="password"
          className=" border p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "update"}
        </button>
      </form>

      <div className=" flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className=" text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className=" text-red-700 cursor-pointer">Sign out</span>
      </div>

      <p className=" text-red-700 mt-5">{error ? error : ""}</p>
      <p className=" text-green-700 mt-5">
        {updateSuccess ? "User Updated" : ""}
      </p>
    </div>
  );
};

export default Profile;
