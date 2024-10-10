import { useEffect, useState } from "react";
import { useGetCurrentUserApi } from "../api/getCurrentUserApi";
import { userIcon } from "../assets";
import { dollar } from "../assets";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../store/userSlice";

const Home = () => {
  const [isLoggedInUser, setisLoggedInUser] = useState(false);
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      const response = await useGetCurrentUserApi();
      if (response) {
        dispatch(storeCurrentUser(response));
        setUserData(response);
        setisLoggedInUser(true);
      }
    }
    getUser();
  }, []);

  function logoutHandler() {
    localStorage.removeItem("jwttoken");
    setisLoggedInUser(false);
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen gap-24">
      <div className="w-full max-h-[90px] flex flex-row justify-between p-4 border-2 border-gray-200 shadow-lg">
        <div className="flex flex-row gap-2 items-center justify-center">
          <img
            src={dollar}
            className=" w-7 h-7 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div
            className="font-bold text-3xl text-orange-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            PayTm
          </div>
        </div>
        {isLoggedInUser ? (
          <div className=" flex flex-row justify-center items-center gap-3">
            <img src={userIcon} className="w-8 h-8" />
            <div>
              Hello, <span className="font-bold">{userData?.firstname}</span>{" "}
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 bg-blue-600 text-white rounded-3xl"
            >
              Dashboard
            </button>

            <button
              onClick={() => logoutHandler()}
              className="p-2 bg-red-700 text-white rounded-xl"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className=" flex gap-3">
            <Button btnName={"Signup"} onclick={() => navigate("/signup")} />
            <Button btnName={"Login"} onclick={() => navigate("/login")} />
          </div>
        )}
      </div>

      <div className="w-[850px] h-[400px] border-2 border-gray-100 shadow-lg flex flex-col items-center gap-3 justify-center">
        <div className="font-bold text-5xl">
          Welcome,{" "}
          <span>
            {isLoggedInUser ? (
              <span className="font-bold">{userData.firstname}</span>
            ) : null}
          </span>{" "}
          to <span className="text-orange-600">PayTm</span>
        </div>

        <div className="text-xl font-light">Where you can Deposit Money </div>
        <div className="text-xl font-light">Send Money to Your friends</div>
        {isLoggedInUser ? (
          <div className="  text-xl">
            Go to{" "}
            <span
              onClick={() => navigate("/dashboard")}
              className=" cursor-pointer font-bold text-blue-500 text-2xl underline"
            >
              Dashboard
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
