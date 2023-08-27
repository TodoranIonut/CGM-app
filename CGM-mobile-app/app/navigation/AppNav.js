import styles from "../../styles";
import React, { useState, useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//screens
import LoginScreen from "../screen/LoginScreen";
import GlucoseMonitorScreen from "../screen/GlucoseMonitorScreen";
import ProfileScreen from "../screen/ProfileScreen";
import PatientsScreen from "../screen/PatientsScreen";
import colors from "../config/colors";
import AddPatientScreen from "../screen/AddPatientScreen";

//screen names
const glucoseMonitorName = "Monitor";
const patientsName = "Patients";
const addPatientsName = "AddPatients";
const profileName = "Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PatientsStack = createNativeStackNavigator();
var role = "";

const PatientsStackNavigator = () => (
  <PatientsStack.Navigator initialRouteName={patientsName}>
    <PatientsStack.Screen
      options={{ headerShown: false }}
      name={patientsName}
      component={PatientsScreen}
    ></PatientsStack.Screen>
    <PatientsStack.Screen
      options={{ headerShown: false }}
      name={addPatientsName}
      component={AddPatientScreen}
    ></PatientsStack.Screen>
  </PatientsStack.Navigator>
);

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName={profileName}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === glucoseMonitorName) {
          iconName = focused ? "analytics" : "analytics-outline";
        } else if (rn === patientsName) {
          iconName = focused ? "people" : "people-outline";
        } else if (rn === profileName) {
          iconName = focused ? "person-circle" : "person-circle-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.mintGreenDark,
      tabBarInactiveTintColor: "grey",
      tabBarLabelStyle: { paddingBottom: 10, fontSize: 13 },
      tabBarIconStyle: { paddingTop: -5, height: 25 },
      tabBarStyle: { height: 75 },
      headerShown: false,
    })}
  >
    {role === "ROLE_DOCTOR" ? (
      <Tab.Screen name={patientsName} component={PatientsStackNavigator} />
    ) : (
      <Tab.Screen name={glucoseMonitorName} component={GlucoseMonitorScreen} />
    )}
    <Tab.Screen name={profileName} component={ProfileScreen} />
  </Tab.Navigator>
);

export function AppNav() {
  useEffect(() => {
    role = userRole;
  }, []);

  const { login, logout, isLoading, userToken, userName, userRole } =
    useContext(AuthContext);
  if (isLoading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken !== null ? (
          <Stack.Screen
            initialRouteName="BottomTabNavigator"
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
