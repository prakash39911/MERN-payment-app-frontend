import { useState, useEffect } from "react";
import { dollar } from "../assets";
import { useGetCurrentUserApi } from "../api/getCurrentUserApi";
import { useNavigate } from "react-router-dom";
import { userIcon } from "../assets";
import Button from "./Button";
import { useGetAccountBalance } from "../api/getAccountBalance";
import { useGetAllUsersListApi } from "../api/getAllUsersList";
import IndividualUser from "./IndividualUser";

const Dashboard = () => {
  const [loggedInUserData, setloggedInUserData] = useState({});
  const [userBalanceData, setUserBalanceData] = useState({});
  const [allUsersData, setallUsersData] = useState({});

  const [filterName, setfilterName] = useState("");

  useEffect(() => {
    async function fetchAllUsers() {
      const usersList = await useGetAllUsersListApi({ filterName });
      if (JSON.stringify(usersList) !== JSON.stringify(allUsersData)) {
        setallUsersData(usersList);
      }

      setallUsersData(usersList?.document);
    }
    fetchAllUsers();
  }, [filterName]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const balance = await useGetAccountBalance();
      if (balance !== userBalanceData) {
        setUserBalanceData(balance);
      }
    }, 500); // Poll every 0.5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [userBalanceData]);

  useEffect(() => {
    async function fetchCall() {
      const data = await useGetCurrentUserApi();
      console.log(data);

      setloggedInUserData(data);
    }
    fetchCall();
  }, []);

  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("jwttoken");
    navigate("/");
  }

  return (
    <>
      <div className="flex flex-col items-center">
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
          {loggedInUserData ? (
            <div className=" flex flex-row justify-center items-center gap-3">
              <img src={userIcon} className="w-8 h-8" />
              <div>
                Hello,{" "}
                <span className="font-bold">{loggedInUserData?.firstname}</span>{" "}
              </div>
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

        <div className="flex flex-col gap-3 m-10 p-8 shadow-2xl shadow-gray-300 border-2 border-cyan-600 rounded-md bg-gray-50 w-[1200px] h-[500px]">
          <div className="text-4xl flex justify-center mt-[-15px]">
            <span className="text-orange-500">D</span>ashBoard
          </div>
          <div className="font-bold text-3xl">
            Balance-
            {typeof userBalanceData === "number"
              ? `${userBalanceData.toFixed(2)} Rupees`
              : null}
          </div>
          <div className="font-bold text-3xl mb-[-12px]">Users</div>
          <input
            value={filterName}
            onChange={(e) => setfilterName(e.target.value)}
            type="text"
            className="flex w-full p-2 rounded-md border-2 border-gray-200"
            placeholder="Search Users"
          />

          <div className="flex flex-col overflow-y-scroll gap-1">
            {allUsersData?.length > 0
              ? allUsersData.map((eachUserObj) =>
                  eachUserObj._id !== loggedInUserData?._id ? (
                    <IndividualUser
                      key={eachUserObj._id}
                      eachUserData={eachUserObj}
                    />
                  ) : null
                )
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
