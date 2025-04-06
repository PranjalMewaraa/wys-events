import React from "react";
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
import InputDesign from "./Pages/EvenListing/Screen5";
import EventsView from "./Pages/EvenListing/Screen";
import EventListing7 from "./Pages/EvenListing/Screen7";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MatchingHome from "./Pages/Matching/MatchingHome";
import ChatOuter from "./components/Chat/ChatOuter";
import ChatBox from "./components/Chat/ChatBox";

const App = () => {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/events" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/pre/onboarding" element={<PreOnboarding />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/event/himalayas" element={<EventDetail />} />
        <Route path="/people" element={<MatchingHome />} />
        <Route path="/people/detail" element={<Matching />} />
        <Route path="/listing" element={<EventsView />} />
        <Route path="/listing/upcoming/detail" element={<EventListing7 />} />
        <Route path="/listing/input" element={<InputDesign />} />
        <Route path="/check" element={<EventListing7 />} />
        <Route path="/chat" element={<ChatOuter/>}/>
        <Route path="/chats/group/:eventId" element={<ChatBox />} />
        <Route path="/chats/user/:userId" element={<ChatBox />} />      
        </Routes>
    </Router>

    
  );
};

export default App;


