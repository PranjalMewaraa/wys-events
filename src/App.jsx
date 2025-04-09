import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UnifiedAuth from "./Pages/AuthPages/Signin";
import AuthWrapper from "../src/utils/AuthWrapper";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Home } from "./Pages/Events/Event";
import EventDetail from "./components/Events/EventDetail";
import Matching from "./Pages/Matching/Matching";
import MatchingHome from "./Pages/Matching/MatchingHome";
import OnBoarding from "./Pages/Onboarding/OnBoarding";
import PreOnboarding from "./Pages/Onboarding/PreOnboarding.jsx/PreOnboarding";
import EventsView from "./Pages/EvenListing/Screen";
import EventListing7 from "./Pages/EvenListing/Screen7";
import InputDesign from "./Pages/EvenListing/Screen5";
import ChatOuter from "./components/Chat/ChatOuter";
import ChatBox from "./components/Chat/ChatBox";
import Profile from "./Pages/Profile/Profile";
import Experience from "./Pages/Profile/Experience";
import AccountDetail from "./Pages/Profile/Accountdetail";
import Travelpreference from "./Pages/Profile/Travelpreference";
import CompanionMatching from "./Pages/Profile/Matching";
import Companions from "./Pages/Profile/Companions";
import Listing from "./Pages/Profile/Listing";
import DashboardAdmin from "./admin/Dashboard";
import DashboardAdminMatchmaking from "./admin/AdminMatchMaking";
import UserProfile from "./admin/UserProfile";
import MatchingDash from "./admin/MatchingDash";
import MatchingInner from "./admin/MatchingInner";
import EventAdmin from "./admin/EventAdmin";
import EventDetailAdmin from "./admin/EventDetailAdmin";
import EventDetailMY from "./components/Events/EventDetailMy";
import Request from "./Pages/Request/Request";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/signin" element={<UnifiedAuth />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <AuthWrapper>
              <Dashboard />
            </AuthWrapper>
          }
        />
        <Route
          path="/events"
          element={
            <AuthWrapper>
              <Home />
            </AuthWrapper>
          }
        />
        <Route
          path="/event/:eventId"
          element={
            <AuthWrapper>
              <EventDetail />
            </AuthWrapper>
          }
        />
        <Route
          path="/people"
          element={
            <AuthWrapper>
              <MatchingHome />
            </AuthWrapper>
          }
        />
        <Route
          path="/people/detail/:userId"
          element={
            <AuthWrapper>
              <Matching />
            </AuthWrapper>
          }
        />
        <Route
          path="/onboarding"
          element={
            <AuthWrapper>
              <OnBoarding />
            </AuthWrapper>
          }
        />
        <Route
          path="/pre/onboarding"
          element={
            <AuthWrapper>
              <PreOnboarding />
            </AuthWrapper>
          }
        />
        <Route
          path="/listing"
          element={
            <AuthWrapper>
              <EventsView />
            </AuthWrapper>
          }
        />
        <Route
          path="/listing/upcoming/detail/:id"
          element={
            <AuthWrapper>
              <EventListing7 />
            </AuthWrapper>
          }
        />
        <Route
          path="/listing/input"
          element={
            <AuthWrapper>
              <InputDesign />
            </AuthWrapper>
          }
        />
        <Route
          path="/check"
          element={
            <AuthWrapper>
              <EventListing7 />
            </AuthWrapper>
          }
        />
        <Route
          path="/chat"
          element={
            <AuthWrapper>
              <ChatOuter />
            </AuthWrapper>
          }
        />
        <Route
          path="/chats/group/:groupId/:eventId"
          element={
            <AuthWrapper>
              <ChatBox />
            </AuthWrapper>
          }
        />
        <Route
          path="/chats/user/:userId"
          element={
            <AuthWrapper>
              <ChatBox />
            </AuthWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthWrapper>
              <Profile />
            </AuthWrapper>
          }
        />
        <Route
          path="/profile/experience"
          element={
            <AuthWrapper>
              <Experience />
            </AuthWrapper>
          }
        />
        <Route
          path="/profile/detail"
          element={
            <AuthWrapper>
              <AccountDetail />
            </AuthWrapper>
          }
        />

        <Route
          path="/profile/detail/preference"
          element={
            <AuthWrapper>
              <Travelpreference />
            </AuthWrapper>
          }
        />
        <Route
          path="/profile/detail/matching"
          element={
            <AuthWrapper>
              <CompanionMatching />
            </AuthWrapper>
          }
        />
        <Route
          path="/profile/companions"
          element={
            <AuthWrapper>
              <Companions />
            </AuthWrapper>
          }
        />
        <Route
          path="/profile/listing"
          element={
            <AuthWrapper>
              <Listing />
            </AuthWrapper>
          }
        />
        <Route path="/listing/myevent/detail/:id" element={<EventDetailMY />} />
        <Route path="/request/:event/:id" element={<Request />} />

        <Route path="/admin" element={<DashboardAdmin />} />
        <Route path="/admin/people" element={<DashboardAdminMatchmaking />} />
        <Route path="/admin/user/profile/:id" element={<UserProfile />} />
        <Route path="/admin/people/match/:id" element={<MatchingDash />} />
        <Route path="/admin/match/:id1/:id2" element={<MatchingInner />} />
        <Route path="/admin/event" element={<EventAdmin />} />
        <Route path="/admin/event/:id" element={<EventDetailAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
