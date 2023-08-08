import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Home,
  About,
  Login,
  AdminLogin,
  AddCourse,
  Course,
  Appbar,
  Signup,
  AdminSignup,
  BrowseCourses,
  Footer,
} from "./pages";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "auto",
        backgroundColor: "#eeeeee",
      }}
    >
      <BrowserRouter>
        <Appbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/home" element={<Home />} />
          <Route path="/browsecourses" element={<BrowseCourses />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
