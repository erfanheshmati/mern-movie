import React from "react";
import Signin from "./components/auth/Signin";
import Navbar from "./components/user/Navbar";
import Signup from "./components/auth/Signup";

export default function App() {
  return (
    <>
      <Navbar />
      {/* <Signin /> */}
      <Signup />
    </>
  );
}
