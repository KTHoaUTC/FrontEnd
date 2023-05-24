// import React, { useEffect, useMemo, useState } from "react";
// import { AuthContext } from ".//context";

// type AuthProviderProps = {
//   children?: React.ReactNode;
//   login: boolean;
// };

// const AuthProvider: React.FC<AuthProviderProps> = ({
//   children,
//   login: initLogin,
// }) => {
//   const [login, setLogin] = useState<AdminCore.AuthContext["login"]>(initLogin);

//   const [user, setUser] = useState<AdminCore.AuthContext["user"]>();

//   useEffect(() => {
//     let timeout: NodeJS.Timeout;

//     if (initLogin) {
//       setLogin(true);
//     } else {
//       setUser(user);
//     }

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [initLogin]);

//   const value = useMemo<AdminCore.AuthContext>(() => {
//     return {
//       login,
//       setLogin,
//       user,
//       setUser,
//     };
//   }, [login, user]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthProvider;
