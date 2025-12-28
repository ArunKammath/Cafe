import { createContext, useState, useContext } from "react";
import axios from "axios";
const loginContext = createContext(undefined);

export const LoginProvider = ({ children }) => {
    const [loginData, setLoginData] = useState({isLoggedIn: false, username: "", password: "", userId: ""});
    return (<loginContext.Provider value={{loginData, setLoginData}}>
        {children}
    </loginContext.Provider>)
}
export const useLogin = () =>  useContext(loginContext);

export const fetchLoginData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/getLoginData', {
        withCredentials: true
      });
      return res.data;
    } catch (error) {
      console.error('Error in fetching login data:', error);
      return undefined;
    }
  }