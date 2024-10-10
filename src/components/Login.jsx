import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLoginApi } from "../api/loginApi";
import { useEffect, useState } from "react";

const loginFieldValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Please Enter Valid Password" }),
});

const Login = () => {
  const navigate = useNavigate();
  const isToken = JSON.parse(localStorage.getItem("jwttoken"));

  useEffect(() => {
    if (isToken) {
      navigate("/");
    }
  }, []);

  const [isLoginSuccess, setisLoginSuccess] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFieldValidation),
  });

  async function actualSubmitData(formData) {
    const { response, data } = await useLoginApi(formData);
    if (!response.ok) {
      setisLoginSuccess(false);
    }
    if (response.ok) {
      navigate("/");
    }
  }

  return (
    <div className="shadow-lg rounded-lg border-2 border-gray-200 w-[400px] h-[400px]">
      <form
        onSubmit={handleSubmit(actualSubmitData)}
        className="flex flex-col items-center gap-10 p-5"
      >
        <div className="flex flex-col w-full gap-1.5 h-16">
          <label className="font-bold">Email</label>
          <input
            {...register("email")}
            type="text"
            placeholder="Enter Your email"
            className="p-2 border-2 rounded-lg border-gray-200 w-full"
          />
          {errors.email && (
            <p className="text-red-600 ml-1 m-[-6px]">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col w-full gap-1.5 h-12">
          <label className="font-bold">Password</label>
          <input
            {...register("password")}
            type="text"
            placeholder="Enter password"
            className="p-2 border-2 rounded-lg border-gray-200 w-full"
          />
          {errors.password && (
            <p className="text-red-600 ml-1 m-[-6px]">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="h-2 mt-2">
          {isLoginSuccess ? null : (
            <p className="text-red-600 font-bold"> Invalid Credentials</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-md"
        >
          Login{" "}
        </button>

        <div className="mt-[-20px]">
          Doesn't have Account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 font-bold cursor-pointer underline"
          >
            Signup
          </span>{" "}
          Here
        </div>
      </form>
    </div>
  );
};

export default Login;
