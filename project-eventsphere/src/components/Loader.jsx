import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";

const Loader = ({ onFinish }) => {
  const [phase, setPhase] = useState("pulse"); 
  // pulse → exit

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("exit");

      setTimeout(() => {
        onFinish();
      }, 800); // exit animation duration

    }, 2000); // pulse duration

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-700 ${
        phase === "exit"
          ? "opacity-0 scale-110"
          : "opacity-100 scale-100"
      }`}
    >
      <img
        src={logo}
        alt="Loading"
        className={`w-100 h-100 ${
          phase === "pulse"
            ? "animate-[pulse_2s_ease-in-out_infinite]"
            : ""
        }`}
      />
    </div>
  );
};

export default Loader;