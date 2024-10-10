import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupApi } from "../api/signupApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const signupFieldValidation = z.object({
  email: z.string().email(),
  firstname: z.string().min(1, { message: "enter valid firstname" }),
  lastname: z.string().min(1, { message: "enter valid lastname" }),
  password: z.string().min(8, { message: "minimum length is 8" }),
});

const SignUp = () => {
  const navigate = useNavigate();

  const isToken = JSON.parse(localStorage.getItem("jwttoken"));

  useEffect(() => {
    if (isToken) {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupFieldValidation),
  });

  async function actualSubmitData(formdata) {
    const { response, data } = await useSignupApi(formdata);
    navigate("/createsuccess");
  }

  return (
    <div className="shadow-lg rounded-lg border-2 border-gray-200 w-[400px]">
      <form
        onSubmit={handleSubmit(actualSubmitData)}
        className="flex flex-col items-center gap-10 p-5"
      >
        {" "}
        <div className="flex flex-col w-full gap-1.5 h-14">
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
        <div className="flex flex-col w-full gap-1.5 h-14">
          <label className="font-bold">Firstname</label>
          <input
            {...register("firstname")}
            type="text"
            placeholder="Enter first name"
            className="p-2 border-2 rounded-lg border-gray-200 w-full"
          />
          {errors.firstname && (
            <p className="text-red-600 ml-1 m-[-6px]">
              {errors.firstname.message}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1.5 h-14">
          <label className="font-bold">Lastname</label>
          <input
            {...register("lastname")}
            type="text"
            placeholder="Enter last name"
            className="p-2 border-2 rounded-lg border-gray-200 w-full"
          />
          {errors.lastname && (
            <p className="text-red-600 ml-1 m-[-6px]">
              {errors.lastname.message}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full gap-1.5 h-14">
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
        <button
          type="submit"
          className="w-full bg-black text-white p-3 m-2 rounded-md"
        >
          Sign Up
        </button>
        <div className="mt-[-20px]">
          Already have Account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 font-bold cursor-pointer underline"
          >
            LogIn
          </span>{" "}
          Here
        </div>
      </form>
    </div>
  );
};

export default SignUp;
