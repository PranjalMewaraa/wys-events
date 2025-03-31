import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import OnBoarding from "./Pages/Onboarding/OnBoarding";
import Wall from "./Layout/Wall";
import Layout from "./Layout/Layout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { Home } from "./Pages/Events/Event";
import EventDetail from "./components/Events/EventDetail";
import Profile from "./Pages/Profile/Profilehome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/himalayas" element={<EventDetail />} />
        <Route path="/profile" element={<Profile/>} />

      </Routes>
    </Router>
  );
};

export default App;
