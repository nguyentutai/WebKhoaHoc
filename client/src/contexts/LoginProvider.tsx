import { ReactNode, createContext, useReducer } from "react";

interface Login {
  children: ReactNode;
}

const reducerLog = (state: any, action: any) => {
  switch (action.type) {
    case "login":
      return JSON.parse(sessionStorage.getItem("user") as string);
    case "logout":
      return sessionStorage.removeItem("user");
    default:
      return state;
  }
};
export const LoginContext = createContext(
  {} as {
    username: any;
    dispathLogin: any;
  }
);

export const LoginProvider = (prop: Login) => {
  const [username, dispathLogin] = useReducer(
    reducerLog,
    JSON.parse(sessionStorage.getItem("user") as string)
  );
  return (
    <LoginContext.Provider
      value={{
        username,
        dispathLogin,
      }}
    >
      {prop.children}
    </LoginContext.Provider>
  );
};
