import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import OnBoarding from "./Pages/Onboarding/OnBoarding";
import Wall from "./Layout/Wall";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Wall />
    </>
  );
}

export default App;
