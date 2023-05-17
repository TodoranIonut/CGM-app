import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL, LOGIN_PATH } from "../config/config";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = (email, password) => {
    console.log("abc something tockent custom something");
    setUserToken("abc");
    // axios
    //   .post(`${BASE_URL}${LOGIN_PATH}`, {
    //     email: email,
    //     password: password,
    //   })
    //   .then((res) => {
    //     // console.log(res.data["token"]);
    //     // setUserToken(res.data["token"]);
    //   })
    //   .catch((e) => {
    //     console.log(`Login error ${e}`);
    //   });
    // AsyncStorage.setItem("userToken", "ioiohlka");
  };

  const logout = () => {
    setUserToken(null);
    // AsyncStorage.removeItem("userToken");
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    // isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
