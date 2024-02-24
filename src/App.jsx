import "./App.css";
import AllWorks from "./components/AllWorks";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  return (
    <div className={darkMode ? "app dark pt-3" : "app pt-3"}>
      <div
        className="container text-center"
        id="sec"
        data-bs-smooth-scroll="true"
        data-bs-spy="scroll"
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <AllWorks />
        <Footer />
      </div>
    </div>
  );
}

export default App;
