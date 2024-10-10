import { useNavigate } from "react-router-dom";

const AccountCreationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[850px] h-[400px] border-2 border-gray-100 shadow-lg flex flex-col items-center gap-3 justify-center">
      <div className="font-bold text-5xl">Account Created Successfully</div>
      <div className="text-xl font-light">
        Please{" "}
        <span
          onClick={() => navigate("/login")}
          className="font-bold text-blue-500 cursor-pointer text-xl underline"
        >
          LogIn
        </span>{" "}
        to Continue
      </div>
    </div>
  );
};

export default AccountCreationSuccess;
