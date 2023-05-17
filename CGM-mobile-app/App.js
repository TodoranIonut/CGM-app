import styles from "./styles";
import React, { useState } from "react";
import { AuthContext, AuthProvider } from "./app/context/AuthContext";
import { AppNav } from "./app/navigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
