import React from "react";
import GardenCanvas from "../components/garden/GardenCanvas.tsx";

const GardenPage: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <GardenCanvas />
    </div>
  );
};

export default GardenPage;
