import { Mail, ShieldAlert, User } from "lucide-react";
import { useUserRegisterStore } from "../../../store/authentication/registerForm";
import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function RegisterForm({
  toggleForm,
}: {
  toggleForm: () => void;
}) {
  let navigate = useNavigate();
  const { userName, email, password, rePassword, errorRePassword , errorAction , errorEmail } =
    useUserRegisterStore((state) => state);
  const action = useUserRegisterStore((state) => state.action);

  useLayoutEffect(() => {
    action.clear();
    errorAction.setErrorReset();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nameAction = `set${name.charAt(0).toUpperCase()}${name.slice(1)}`;

    const actions = useUserRegisterStore.getState().action;

    if (nameAction in actions) {
      const key = nameAction as keyof typeof actions;
      const actionFn = actions[key] as any;
      if (typeof actionFn === "function") {
        actionFn(value);
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await action.log();
    if (status === "200") {
      alert("create successful");
      navigate("/");
    }
  };

  return (
    <>
      <form
        action=""
        className="w-full p-2 flex flex-col gap-5 max-lg:overflow-y-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className=" flex flex-col gap-2">
          <label className="text-sm text-mist-600/90" htmlFor="userName">
            User Name
          </label>
          <div className=" flex flex-row justify-start items-center outline-1 outline-mist-300/80 focus-within:outline-black/30 px-2 overflow-hidden">
            <User
              className=" text-(--main-color) stroke-(--main-color) "
              size={15}
            />
            <input
              className=" text-sm outline-0 pl-4 py-2 rounded md:w-full"
              id="userName"
              name="userName"
              minLength={10}
              maxLength={265}
              type="text"
              value={userName}
              placeholder="User Name"
              title="Username must be at least 10 characters long"
              required
              aria-required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <label className="text-sm text-mist-600/90" htmlFor="Email">
            Email
          </label>
          <div className={`flex flex-row justify-start items-center outline-1 outline-mist-300/80 focus-within:outline-black/30 px-2 overflow-hidden ${errorEmail!=""&&"outline-red-500"}`}>
            <Mail
              className=" text-(--main-color) stroke-(--main-color) "
              size={15}
            />
            <input
              className=" text-sm outline-0 pl-4 py-2 rounded md:w-full"
              id="Email"
              name="Email"
              maxLength={265}
              type="email"
              value={email}
              placeholder="Email"
              pattern=".+@gmail\.com"
              title="Gmail only allows letters (a-z), numbers (0-9) and full stops (.)"
              required
              aria-required
              onChange={handleChange}
            />
          </div>
           {errorEmail != "" && (
            <span className="text-[10px] text-red-500 font-medium ml-1 animate-in fade-in slide-in-from-top-1">
              {errorEmail}
            </span>
          )}
        </div>
        <div className=" flex flex-col gap-2">
          <label className="text-sm text-mist-600/90" htmlFor="password">
            Password
          </label>
          <div className=" flex flex-row justify-start items-center outline-1 outline-mist-300/80 focus-within:outline-black/30 px-2 overflow-hidden">
            <ShieldAlert
              className=" text-(--main-color) stroke-(--main-color) "
              size={15}
            />
            <input
              className=" text-sm outline-0 pl-4 py-2 rounded md:w-full"
              id="Password"
              name="Password"
              maxLength={256}
              type="Password"
              value={password}
              placeholder="Password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="A password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers and special characters"
              required
              aria-required
              onChange={handleChange}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <label className="text-sm text-mist-600/90" htmlFor="RePassword">
            RePassword
          </label>
          <div
            className={`flex flex-row justify-start items-center outline-1 outline-mist-300/80 focus-within:outline-black/30 px-2 overflow-hidden ${errorRePassword != "" && "outline-red-500"}`}
          >
            <ShieldAlert
              className=" text-(--main-color) stroke-(--main-color) "
              size={15}
            />
            <input
              className=" text-sm outline-0 pl-4 py-2 rounded md:w-full"
              id="RePassword"
              name="RePassword"
              maxLength={256}
              type="Password"
              value={rePassword}
              placeholder="Password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="A password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers and special characters"
              required
              aria-required
              onChange={handleChange}
            />
          </div>
          {errorRePassword != "" && (
            <span className="text-[10px] text-red-500 font-medium ml-1 animate-in fade-in slide-in-from-top-1">
              {errorRePassword}
            </span>
          )}
        </div>
        <div className=" text-right text-sm text-(--main-color) underline underline-offset-1 cursor-pointer">
          <p>Forgot password</p>
        </div>
        <button className=" cursor-pointer">
          <p className=" text-center text-sm text-white bg-(--main-color) py-2 rounded-md">
            Register
          </p>
        </button>
        <div className=" text-center text-sm text-mist-500">
          <p>Or login with</p>
        </div>
        <button className=" cursor-pointer">
          <p className=" text-center text-sm text-white bg-[#E73B2F] py-2 rounded-md">
            Google
          </p>
        </button>
        <div className=" text-center text-sm text-mist-600/90">
          <span>Already have an account? </span>
          <span
            onClick={() => {
              toggleForm();
            }}
            className="text-(--main-color) underline underline-offset-1 cursor-pointer"
          >
            Sign in now
          </span>
        </div>
        <hr />
        <div className=" text-center text-sm text-mist-600/90">
          <p className=" text-black">
            Are you having trouble creating an account?
          </p>
          <span>Please call</span>
          <span className="text-(--main-color) cursor-pointer">
            {" "}
            (+84) 965 838 016
          </span>
          <span> (during office hours).</span>
        </div>
        <div className=" text-center text-sm text-(--main-color)">
          <p>© {new Date().getFullYear()} projectK. All rights reserved.</p>
        </div>
      </form>
    </>
  );
}
