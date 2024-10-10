import { useEffect, useState } from "react";
import { useGetCurrentUserApi } from "../api/getCurrentUserApi";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedInUser, setisLoggedInUser] = useState(false);

  useEffect(() => {
    async function getUser() {
      const data = await useGetCurrentUserApi();
      if (data) setisLoggedInUser(true);
    }
    getUser();
  }, []);

  return (
    <>
      {isLoggedInUser ? (
        <div>{children}</div>
      ) : (
        <div className=" flex flex-col gap-5  w-full min-h-screen justify-center items-center">
          <div className="text-4xl font-bold">
            <span>You are not&nbsp;</span>
            <span className="text-orange-500">A</span>uthorised
          </div>

          <div className="text-xl">
            Go to{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-500 font-bold cursor-pointer"
            >
              Home
            </span>{" "}
            Page or{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 font-bold cursor-pointer"
            >
              Login
            </span>{" "}
            to Continue
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
