import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    fullName: string | null;
    publicId: string | null;
    isAuthentication: boolean;
    setAuth: (publicId: string, fullName: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(persist((set) => ({
    fullName: null,
    publicId: null,
    isAuthentication: false,
    setAuth: (publicId, fullName) => {
        set({ fullName: fullName, publicId: publicId, isAuthentication: true });
    },
    logout: () => {
        set({ fullName: null, publicId: null, isAuthentication: false });
        localStorage.removeItem('auth-storage');
    }

}), { name: 'auth-storage' }));
type AuthStateOmit = Omit<AuthState, 'setAuth'>;
type AuthAdminState = AuthStateOmit & {
    role: string | null;
    setAuth: (publicId: string, fullName: string, role: 'admin' | 'staff') => void;
}

export const useAuthAdminStore = create<AuthAdminState>()(persist((set) => ({
    fullName: null,
    publicId: null,
    isAuthentication: false,
    role: null,
    setAuth: (publicId, fullName, role) => {
        set({ fullName: fullName, publicId: publicId, isAuthentication: true, role: role });
    },
    logout: () => {
        set({ fullName: null, publicId: null, isAuthentication: false });
        localStorage.removeItem('auth-admin-storage');
    }
}), { name: 'auth-admin-storage' }))

export default useAuthStore;