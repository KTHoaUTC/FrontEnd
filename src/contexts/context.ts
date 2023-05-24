// import { createContext, useState } from "react";

// export const AuthContext = createContext({
//   email: "",
//   updateEmail: (newEmail: string) => {},
// });

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [email, setEmail] = useState("");

//   const updateEmail = (newEmail: string) => {
//     setEmail(newEmail);
//   };

//   return (
//     <AuthContext.Provider value={{ email, updateEmail }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React from "react";

// export const AuthContext = React.createContext<AdminCore.AuthContext>({
//   login: false,
//   setLogin: () => {},
//   user: {} as AdminCore.User,
//   setUser: () => {},
// });

// export const useAuthContext = () => React.useContext(AuthContext);
import { Dispatch, SetStateAction, createContext } from "react";


type UserContextProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const UserContext = createContext<UserContextProps>({
  email: "",
  setEmail: () => {},
});
export default UserContext;

