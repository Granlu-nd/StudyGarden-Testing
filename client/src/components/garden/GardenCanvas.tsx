import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const GardenCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create PixiJS app
    const app = new PIXI.Application({
      resizeTo: window, // auto-resizes to browser window
      backgroundColor: 0x87ceeb, // sky blue background
      antialias: true,
    });

    if (canvasRef.current) {
      canvasRef.current.appendChild(app.view as HTMLCanvasElement);
    }

    // Example: add a simple "plant" graphic
    const plant = new PIXI.Graphics();
    plant.beginFill(0x228b22);
    plant.drawRect(-25, -50, 50, 100);
    plant.endFill();
    plant.x = app.renderer.width / 2;
    plant.y = app.renderer.height / 2;
    app.stage.addChild(plant);

    // Animate the plant gently swaying
    app.ticker.add((_delta) => {
      plant.rotation = Math.sin(Date.now() / 1000) * 0.05;
    });

    // Cleanup on unmount
    return () => {
      app.destroy(true, { children: true });
    };
  }, []);

  return <div ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
};

export default GardenCanvas;
