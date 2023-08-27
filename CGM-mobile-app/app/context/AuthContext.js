import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  BASE_URL,
  LOGIN_PATH,
  GET_DOCTOR_BY_EMAIL,
  GET_PATIENT_BY_EMAIL,
} from "../config/config";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const storeData = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  // const getStoreData = async () => {
  //   try {
  //     const someUsername = await AsyncStorage.getItem("username");
  //     const someToken = await AsyncStorage.getItem("userToken");
  //     console.log("saved username:", JSON.parse(someUsername));
  //     console.log("saved userToken:", JSON.parse(someToken));
  //   } catch (error) {}
  // };

  const login = async (email, password) => {
    //fake login
    // email = "crisanmihai@gmail.com";
    email = "mirunapop@gmail.com";
    password = "123";

    await axios
      .post(`${BASE_URL}${LOGIN_PATH}`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const responseToken = res.data["token"];
        setUserToken(responseToken);

        var jwtDecode = require("jwt-decode");
        var decoded = jwtDecode(responseToken);

        var sub = decoded["sub"];
        var rol = decoded["authorities"][0]["authority"];
        setUserName(sub);
        setUserRole(rol);
      })
      .catch((e) => {
        console.log(`Login error ${e}`);
      });
  };

  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem("username");
    AsyncStorage.removeItem("userToken");
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
    <AuthContext.Provider
      value={{ login, logout, isLoggedIn, userToken, userName, userRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
