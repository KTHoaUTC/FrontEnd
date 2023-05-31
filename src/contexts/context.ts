import { Dispatch, SetStateAction, createContext } from "react";

type UserContextProps = {
  id: string | null;
  email: string;
  setId: Dispatch<SetStateAction<string>>;

  setEmail: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<AdminCore.User | null>>;
};

const UserContext = createContext<UserContextProps>({
  id: null,
  email: "",
  setEmail: () => {},
  setId: () => {},

  setUser: () => {},
});

export const UserProvider = UserContext.Provider;

export default UserContext;
