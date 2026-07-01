import { useMutation, useQuery } from "@tanstack/react-query";
import PageContainer from "../../../components/PageContainer";
import useAuthStore from "../../../store/authentication/authState";
import { useShallow } from "zustand/shallow";
import { UserService } from "../../../services/user.service";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  useAlertNotification,
  useConfirmContent,
} from "../../../store/notification/notification";
import type { AxiosError } from "axios";
import ChangePasswordForm from "./changePasswordForm";
import { usePasswordForm } from "../stores/passwordForm";

export default function UserProfile() {
  const isAuthentication = useAuthStore(
    useShallow((state) => state.isAuthentication),
  );
  const confirm = useConfirmContent(useShallow((state) => state.active));
  const alert = useAlertNotification(useShallow((state) => state.setText));
  const changePassword = usePasswordForm(state=>state.active);
  const PublicId = useAuthStore(useShallow((state) => state.publicId));
  const [userForm, setUserForm] = useState<{
    phone?: string;
    full_Name?: string;
    birth?: string;
    gender: number;
    address?: string;
  }>();
  const { data } = useQuery({
    enabled: isAuthentication && PublicId != null,
    queryKey: ["user_profile"],
    queryFn: async () => {
      try {
        const res = await UserService.GetUserInfo(
          "v1/user/GetUserInfoById",
          PublicId!,
        );
        // console.log(res);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    staleTime: 5 * 1000,
    retry: 1,
    throwOnError: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data && data.userInfo) {
      setUserForm(data.userInfo);
    }
  }, [data]);
  useEffect(() => {
    window.scrollTo({
      top:0,
      behavior: "smooth"
    })
  }, []);
  const convertDate = useCallback(
    (x: string) => {
      try {
        return x.substring(0, 10);
      } catch (error) {
        return "";
      }
    },
    [userForm?.birth],
  );
  const mutation = useMutation({
    mutationFn: async () => {
      if (userForm) {
        const wait = await confirm("Confirm to update your profile?");
        if (wait) {
          // console.log(userForm);
          return UserService.UpdateUserInfo("v1/user/UserInfo", {
            PublicId: PublicId,
            FullName: userForm.full_Name,
            Phone: userForm.phone,
            Adrress: userForm.address,
            Gender: Number(userForm.gender),
            Birth: userForm.birth,
          });
        }
      }
      return Promise.reject();
    },
    onSuccess: (config) => {
      if (config.message && config.status == 200) {
        alert(config.message);
      }
    },
    onError: (config) => {
      if (config as AxiosError) {
        console.log(config);
        alert("Error: " + config.message);
      } else {
        alert("Error: " + config.message);
      }
    },
  });
  const handleForm = (e: HTMLInputElement | HTMLSelectElement) => {
    if (userForm && Object.hasOwn(userForm, e.name)) {
      setUserForm((prev) => {
        if (prev) {
          return { ...prev, [e.name]: e.value };
        }
      });
    }
  };
  const handlePassword = async() => {
    const wait = await confirm("You want to change your password?")
    if(wait){
      changePassword();
    }
  }
  return (
    <>
      <PageContainer url="../BackgroundContent/bghomepage.png">
        {isAuthentication && (
          <>
            <div className="bg-white mx-auto p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 h-full w-full overflow-auto max-xl:scale-100 relative">
              <div className="flex justify-between items-center mb-6 sticky -top-7 left-0 bg-white border border-gray-50/70 p-2">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="bg-(--main-color) w-1 h-8 rounded-full"></span>
                  Profile
                </h1>
              </div>
              <div className="mb-6 p-4 bg-gray-50/70 rounded-xl border border-gray-200">
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    // handleUpdateProfile();
                    mutation.mutateAsync();
                  }}
                >
                  <legend>
                    <label
                      className="block text-sm font-medium text-gray-500 mb-1"
                      htmlFor="full_Name"
                    >
                      Full Name
                    </label>

                    <input
                      className="w-full border border-mist-200 bg-white rounded-lg p-1"
                      type="text"
                      placeholder="Nguyen Van A"
                      maxLength={256}
                      required
                      defaultValue={userForm?.full_Name}
                      name="full_Name"
                      id="full_Name"
                      onChange={(e) => {
                        handleForm(e.target);
                      }}
                    />
                  </legend>

                  <legend>
                    <label
                      className="block text-sm font-medium text-gray-500 mb-1"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>

                    <input
                      className="w-full border border-mist-200 bg-white rounded-lg p-1"
                      type="tel"
                      placeholder="0123456789.."
                      maxLength={20}
                      minLength={10}
                      required
                      defaultValue={userForm?.phone}
                      name="phone"
                      id="phone"
                      pattern="(0|84)(3[2-9]|5[6-9]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}"
                      title="Enter a Vietnamese mobile number (e.g. 0912345678 or 84912345678)"
                      onChange={(e) => {
                        handleForm(e.target);
                      }}
                    />
                  </legend>

                  <legend className="md:col-span-2">
                    <label
                      className="block text-sm font-medium text-gray-500 mb-1"
                      htmlFor="address"
                    >
                      Address
                    </label>

                    <input
                      className="w-full border border-mist-200 bg-white rounded-lg p-1"
                      type="text"
                      placeholder="1234 Street..."
                      maxLength={256}
                      required
                      defaultValue={userForm?.address}
                      name="address"
                      id="address"
                      onChange={(e) => {
                        handleForm(e.target);
                      }}
                    />
                  </legend>
                  <legend>
                    <label
                      className="block text-sm font-medium text-gray-500 mb-1"
                      htmlFor="birth"
                    >
                      Birth
                    </label>
                    <input
                      className="w-full border border-mist-200 bg-white rounded-lg p-1"
                      type="date"
                      required
                      defaultValue={convertDate(userForm?.birth!)}
                      name="birth"
                      id="birth"
                      onChange={(e) => {
                        if (e.target.value) {
                          // const iso = new Date(e.target.value).toISOString();
                          handleForm(e.target);
                        }
                      }}
                    />
                  </legend>
                  <legend>
                    <label
                      className="block text-sm font-medium text-gray-500 mb-1"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <select
                      className="w-full border border-mist-200 bg-white rounded-lg p-1"
                      name="gender"
                      id="gender"
                      value={userForm?.gender}
                      onChange={(e) => {
                        handleForm(e.target);
                      }}
                    >
                      <option value="0">Male</option>
                      <option value="1">Female</option>
                    </select>
                  </legend>
                  <div className="flex gap-2 w-full justify-end-safe md:col-span-2">
                    <button
                      type="button"
                      className="text-black navbar-link cursor-pointer hover:bg-(--main-color) hover:text-white"
                      onClick={handlePassword}
                    >
                      Change Password
                    </button>
                    <button
                      type="submit"
                      className="text-black navbar-link cursor-pointer hover:bg-(--main-color) hover:text-white"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <ChangePasswordForm></ChangePasswordForm>
          </>
        )}
      </PageContainer>
    </>
  );
}
