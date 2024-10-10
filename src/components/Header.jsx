import { useNavigate } from "react-router-dom";
import { dollar } from "../assets";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  return (
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

      <div className=" flex gap-3">
        <Button btnName={"Signup"} onclick={() => navigate("/signup")} />
        <Button btnName={"Login"} onclick={() => navigate("/login")} />
      </div>
    </div>
  );
};

export default Header;
