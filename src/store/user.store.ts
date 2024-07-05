import { create } from "zustand";
export enum USER_TYPES {
  ADMIN = "admin",
  USER = "user",
  STORE_MANAGER = "store_manager",
  BRAND_MANAGER = "brand_manager",
}
export type userStoreType = (
  | {
      isLoggedIn: false;
      name: null;
      email: null;
      type: null;
    }
  | {
      isLoggedIn: true;
      name: string;
      email: string;
      type: USER_TYPES;
    }
) & {
  setUser: (user: { name: string; email: string; type: USER_TYPES }) => void;
};

export const useUserStore = create<userStoreType>((set) => ({
  isLoggedIn: false,
  name: null,
  email: null,
  type: null,
  setUser: (user) => {
    set({ isLoggedIn: true, ...user });
  },
}));
