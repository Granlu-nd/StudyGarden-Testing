import React, { useMemo } from "react";
import GardenCanvas from "../components/garden/GardenCanvas.tsx";

const GardenPage: React.FC = () => {
  const plants = useMemo(
    () => [
      { id: "sunflower", baseX: 0.25, baseY: 0.9, height: 180, width: 16, swayAmplitude: 0.14 },
      { id: "tulip", baseX: 0.45, baseY: 0.92, height: 120, width: 12, color: "#2e8b57", swayAmplitude: 0.1, swaySpeed: 0.001 },
      { id: "lily", baseX: 0.6, baseY: 0.88, height: 150, width: 14, color: "#3cb371", swayAmplitude: 0.2 },
      { id: "fern", baseX: 0.78, baseY: 0.9, height: 90, width: 10, color: "#228b22", swaySpeed: 0.002 },
    ],
    [],
  );

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <GardenCanvas plants={plants} />
    </div>
  );
};

export default GardenPage;
