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
import Matching from "./Pages/Matching/Matching";
import Signin from "./Pages/AuthPages/Signin";

import PreOnboarding from "./Pages/Onboarding/PreOnboarding.jsx/PreOnboarding";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/pre/onboarding" element={<PreOnboarding />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/event/himalayas" element={<EventDetail />} />
        <Route path="/matching" element={<Matching />} />
      </Routes>
    </Router>
  );
};

export default App;
