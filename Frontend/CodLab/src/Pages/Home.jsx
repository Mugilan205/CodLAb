import React from "react";
import Orb from "../Components/orb";
import GooeyNav from "../Components/GooeyNav";

const toggleTheme = () => {
  const current = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute(
    "data-theme",
    current === "dark" ? "light" : "dark"
  );
};
toggleTheme();

const items = [
  { label: "Home", href: "#" },
  { label: "Join Room", href: "#" },
  { label: "Contact", href: "#" },
];



const Home = () => {
  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      {/* Center everything */}
      <nav className="fixed w-full z-50 px-8 py-4 flex justify-center ">
        <div className="bbh-hegarty-regular" style={{ position: "relative" , color:"var(--text-primary)"}}>
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={500}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
      </nav>

      <div className="w-full h-full flex items-center justify-center">
        {/* Orb size wrapper */}
        <div className="w-screen h-screen">
          <Orb
            hoverIntensity={5}
            rotateOnHover
            hue={0}
            forceHoverState={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
