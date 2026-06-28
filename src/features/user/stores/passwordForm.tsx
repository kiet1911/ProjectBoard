import { create } from "zustand";

type PasswordFormType = {
  config: {
    status: boolean;
  };
  active: () => void;
  clear: () => void;
};

export const usePasswordForm = create<PasswordFormType>()((set) => ({
  config: {
    status: false,
  },
  active: () => {
    set({ config: { status: true } });
  },
  clear: () => {
    set({ config: { status: false } });
  },
}));
