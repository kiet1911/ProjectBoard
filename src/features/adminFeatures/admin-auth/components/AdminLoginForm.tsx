import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AdminAuthenticationService } from "../../../../services/adminServices/adminAuthentication";
import { useAuthAdminStore } from "../../../../store/authentication/authState";
import { useShallow } from "zustand/shallow";
import { useToastNotification } from "../../../../store/notification/notification";
import { AxiosError } from "axios";

export default function AdminLoginForm() {
  const [credentials, setCredentials] = useState<{
    loginName: string | null;
    password: string | null;
  }>({
    loginName: null,
    password: null,
  });

  const authenticationAdmin = useAuthAdminStore(
    useShallow((state) => state.setAuth),
  );
  const useToast = useToastNotification(useShallow((state) => state.add));
  const mutation = useMutation({
    mutationFn: async () => {
      if (credentials.loginName && credentials.password) {
        try {
          const res = await AdminAuthenticationService.Login({
            Email: credentials.loginName,
            Password: credentials.password,
          });
          return res;
        } catch (error) {
          return Promise.reject(error);
        }
      }
      // useToast({text:"Credential not full fill.",type:"error"});
      return Promise.reject("Credential not full fill.");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error);
        useToast({ text: error.response?.data.message, type: "error" });
      }
    },
    onSuccess: (data) => {
      // console.log(data);
      authenticationAdmin(data.id, data.fullname, data.role);
      // if (data) {
      // }
      useToast({text:"Login success!",type:"success"});
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="w-1/2 border-4 border-mist-200 bg-white rounded-2xl p-5 py-8 flex flex-col justify-center items-center gap-2 backdrop-blur-xs">
        <div className="flex flex-col justify-center items-center gap-2 mb-5">
          <div className=" aspect-square w-20 border-2 border-(--main-color) rounded-2xl p-0 bg-mist-50 shadow-2xl/50 shadow-mist-500">
            <img
              src="../../../../../public/logoBrand.png"
              className=""
              alt="Logo"
            />
          </div>
          <h1 className="font-black text-shadow-2xs/90 text-shadow-black text-3xl max-md:text-xl text-(--main-color)">
            Welcome back
          </h1>
          <p className="font-medium text-shadow-2xs text-mist-500 max-md:text-sm text-center">
            Enter your credentials to access your account
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            mutation.mutate();
          }}
          className="w-full space-y-3"
        >
          <legend className="flex flex-col justify-start gap-1">
            <label
              htmlFor="loginName"
              className="font-bold text-mist-800/50 uppercase text-sm max-md:text-xs"
            >
              Login Name
            </label>
            <input
              type="text"
              placeholder="name@company.com"
              required
              maxLength={256}
              minLength={10}
              name="loginName"
              id="loginName"
              value={credentials.loginName ?? ""}
              className="border-2 border-mist-800/10 rounded focus:border-(--main-color) outline-0 py-1 pl-1 peer"
              onChange={handleChange}
            />
          </legend>
          <legend className="flex flex-col justify-start gap-1">
            <label
              htmlFor="password"
              className="font-bold text-mist-800/50 uppercase text-sm max-md:text-xs"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="123456..."
              required
              maxLength={256}
              minLength={10}
              name="password"
              id="password"
              value={credentials.password ?? ""}
              className="border-2 border-mist-800/10 rounded focus:border-(--main-color) outline-0 py-1 pl-1"
              onChange={handleChange}
            />
          </legend>
          <button
            type="submit"
            className="navbar-link w-full flex justify-center hover:bg-(--main-color) hover:text-white duration-500 cursor-pointer font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
