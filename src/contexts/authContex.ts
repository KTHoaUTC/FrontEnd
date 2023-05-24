import { Dispatch, SetStateAction, createContext } from "react";

type UserContextProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const AdminContext = createContext<UserContextProps>({
  email: "",
  setEmail: () => {},
});
export default AdminContext;
