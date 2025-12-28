import { createContext, useState, useContext } from "react";

const loginContext = createContext(undefined);

export const LoginProvider = ({ children }) => {
    const [loginData, setLoginData] = useState({isLoggedIn: false, username: "", password: "", userId: "", token: ""});

    return (<loginContext.Provider value={{loginData, setLoginData}}>
        {children}
    </loginContext.Provider>)
}
export const useLogin = () =>  useContext(loginContext);
