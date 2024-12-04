import { createContext, useState, useCallback, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // For register
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });  

  // For login
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // Load user from local storage

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));//parses a JSON string, constructing the JavaScript value or object
  },[])

  // Register

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError(null);

    const response = await postRequest(
      `${baseUrl}/users/register`,
      JSON.stringify(registerInfo)
    );
    setIsRegisterLoading(false);

    if (response.error) {
      return setRegisterError(response);
    }
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);

  // Login

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  },[]);

  const loginUser = useCallback(async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);

    const response = await postRequest(
      `${baseUrl}/users/login`,
      JSON.stringify(loginInfo)
    );
    setIsLoginLoading(false);

    if (response.error) {
      return setLoginError(response);
    }
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, [loginInfo]);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  },[]);

  // Return the context provider

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        loginInfo,
        updateLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
