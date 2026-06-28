import { useShallow } from "zustand/shallow";
import { usePasswordForm } from "../stores/passwordForm";
import { useEffect, useState, type ChangeEvent } from "react";
import { KeyRound, X } from "lucide-react";
import { useToastNotification } from "../../../store/notification/notification";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../../store/authentication/authState";
import { UserService } from "../../../services/user.service";
import type { AxiosError, AxiosResponse } from "axios";

export default function ChangePasswordForm() {
  const publicId = useAuthStore(useShallow((state) => state.publicId));
  const isOpen = usePasswordForm(useShallow((state) => state.config.status));
  const clear = usePasswordForm(useShallow((state) => state.clear));
  const toast = useToastNotification((state) => state.add);
  const [popup, setPopup] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (formData.newPassword !== formData.confirmPassword) {
        toast({
          text: "New password and Confirm password do not match.",
          type: "error",
        });
        return Promise.reject();
      } else {
        return await UserService.UpdatePassword("v1/user/UpdatePassword", {
          PublicId: publicId,
          OldPassword: formData.oldPassword,
          NewPassword: formData.newPassword,
        });
      }
    },
    onSuccess: (config) => {
      if (config.message && config.status == 200) {
        toast({
          text: config.message ?? "Success",
          type: "success",
        });
      }
      clear();
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{
        message: string;
      }>;
      toast({
        text: axiosError.response?.data?.message ?? "Something went wrong",
        type: "error",
      });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isOpen) {
        setPopup(true);
        console.log("change");
      }
    }, 200);
    if (!isOpen) {
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setPopup(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <>
          <div className="fixed w-full h-full top-0 bg-transparent z-5 flex justify-center-safe items-center-safe backdrop-blur-xs">
            <div
              className={`min-w-1/3 max-w-1/2 min-h-20 border-2 border-mist-800/20 px-2 pt-1 pb-3 rounded-2xl bg-white flex flex-col justify-center items-center gap-3 transition-all duration-500 ${popup ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}
            >
              <div className=" flex justify-end-safe self-end-safe">
                <X
                  size={20}
                  className=" text-mist-400 hover:bg-mist-400 hover:text-white rounded-full p-1 duration-500 transition-all"
                  onClick={() => {
                    clear();
                  }}
                ></X>
              </div>

              <div className=" flex justify-center">
                <KeyRound size={30} className=" text-blue-400"></KeyRound>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  mutation.mutateAsync();
                }}
                className="max-w-md mx-auto space-y-5 rounded-lg bg-white p-6 shadow"
              >
                <h2 className="text-2xl font-semibold">Change Password</h2>

                <div>
                  <label className="mb-1 block">Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    maxLength={256}
                    minLength={10}
                    required
                    value={formData.oldPassword}
                    onChange={handleChange}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="A password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers and special characters"
                    className="w-full rounded border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    maxLength={256}
                    minLength={10}
                    required
                    value={formData.newPassword}
                    onChange={handleChange}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="A password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers and special characters"
                    className="w-full rounded border px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    maxLength={256}
                    minLength={10}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="A password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers and special characters"
                    className="w-full rounded border px-3 py-2"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 navbar-link text-center"
                >
                  Update Password
                </button>
              </form>

              <div className="text-sm font-bold text-mist-500 text-center wrap-break-word"></div>

              {/* <div
                // onClick={accept}
                className="text-sm font-bold text-mist-500 text-center wrap-break-word navbar-link hover:bg-(--main-color) hover:text-white"
              >
                <button>Accept</button>
              </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
