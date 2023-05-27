import { Dispatch, SetStateAction, createContext } from "react";

type UserContextProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<AdminCore.User | null>>;
};

const UserContext = createContext<UserContextProps>({
  email: "",
  setEmail: () => {},
  setUser: () => {},
});

export const UserProvider = UserContext.Provider;

export default UserContext;
