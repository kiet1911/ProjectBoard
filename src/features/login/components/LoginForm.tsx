import { Mail, ShieldAlert } from "lucide-react";
import { useUserLoginStore } from "../../../store/authentication/loginForm";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginForm({ toggleForm }: { toggleForm: () => void }) {
  let navigate = useNavigate();
  const { email, password } = useUserLoginStore((state) => state);
  const setEmail = useUserLoginStore((state) => state.setEmail);
  const setPassword = useUserLoginStore((state) => state.setPassword);
  const clear = useUserLoginStore((state) => state.clear);
  const log = useUserLoginStore((state) => state.log);
  useLayoutEffect(() => {
    clear();
  }, []);
  //handler
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await log();
    if (status === "200") {
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
          <label className="text-sm text-mist-600/90" htmlFor="Email">
            Email
          </label>
          <div className=" flex flex-row justify-start items-center outline-1 outline-mist-300/80 focus-within:outline-black/30 px-2 overflow-hidden">
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
              required
              aria-required
              onChange={emailHandler}
            />
          </div>
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
              required
              aria-required
              onChange={passwordHandler}
            />
          </div>
        </div>
        <div className=" text-right text-sm text-(--main-color) underline underline-offset-1 cursor-pointer">
          <p>Forgot password</p>
        </div>
        <button className=" cursor-pointer">
          <p className=" text-center text-sm text-white bg-(--main-color) py-2 rounded-md">
            Login
          </p>
        </button>
        <div className=" text-center text-sm text-mist-600/90">
          <p>Or login with</p>
        </div>
        <button className=" cursor-pointer">
          <p className=" text-center text-sm text-white bg-[#E73B2F] py-2 rounded-md">
            Google
          </p>
        </button>
        <div className=" text-center text-sm text-mist-600/90">
          <span>Don’t have an account yet? </span>
          <span
            onClick={() => {
              toggleForm();
            }}
            className="text-(--main-color) underline underline-offset-1 cursor-pointer"
          >
            Sign up now
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
