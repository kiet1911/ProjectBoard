import { create } from "zustand";
import {
  Check,
  CircleAlert,
  CircleCheck,
  CircleX,
  TriangleAlert,
} from "lucide-react";
interface AlertContent {
  content: string | null;
  reset: () => void;
  setText: (x: string) => void;
}

export const useAlertNotification = create<AlertContent>()((set, get) => ({
  content: null,
  reset: () => {
    set({ content: null });
  },
  setText: (x: string) => {
    set({ content: x });
  },
}));

interface ToastContent {
  content: { id: string; text: string; type: ToastType }[];
  add: (x: { text: string; type: ToastType }) => void;
  remove: (x: { id: string }) => void;
}
export type ToastType = "success" | "warning" | "error" | "information";

export const ToastIcon = {
  success: {
    color: "green",
    icon: CircleCheck,
    bgStyles: "bg-green-100",
    bgProgress: "bg-green-700",
  },
  warning: {
    color: "yellow",
    icon: TriangleAlert,
    bgStyles: "bg-yellow-100",
    bgProgress: "bg-yellow-700",
  },
  error: {
    color: "red",
    icon: CircleX,
    bgStyles: "bg-red-100",
    bgProgress: "bg-red-700",
  },
  information: {
    color: "sky",
    icon: CircleAlert,
    bgStyles: "bg-sky-100",
    bgProgress: "bg-red-700",
  },
};

export const useToastNotification = create<ToastContent>()((set, get) => ({
  content: [],
  add: (x: { text: string; type: ToastType }) => {
    const data = { id: window.crypto.randomUUID(), text: x.text, type: x.type };
    set((state) => ({ content: [...state.content, data] }));
  },
  remove: (x: { id: string }) => {
    set((state) => ({
      content: state.content.filter((v, i) => {
        if (v.id !== x.id) return true;
      }),
    }));
  },
}));
