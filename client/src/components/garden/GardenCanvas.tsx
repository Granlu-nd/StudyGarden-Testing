import { useEffect, useMemo, useRef, useState } from "react";

type Plant = {
  id: string;
  baseX: number; // normalized (0-1) position across the canvas width
  baseY: number; // normalized (0-1) position across the canvas height
  height: number;
  width?: number;
  color?: string;
  swaySpeed?: number;
  swayAmplitude?: number;
};

type GardenCanvasProps = {
  plants: Plant[];
  skyColor?: string;
  groundColor?: string;
};

const GardenCanvas: React.FC<GardenCanvasProps> = ({
  plants,
  skyColor = "#87ceeb",
  groundColor = "#3d9140",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [plantState, setPlantState] = useState<Plant[]>(plants);

  useEffect(() => {
    setPlantState(plants);
  }, [plants]);

  const maxHeight = useMemo(
    () => Math.max(...plantState.map((plant) => plant.height), 1),
    [plantState],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      const height = parent?.clientHeight ?? window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    let animationFrame = 0;

    const drawGround = (width: number, height: number) => {
      const groundHeight = height * 0.2;
      context.fillStyle = groundColor;
      context.fillRect(0, height - groundHeight, width, groundHeight);
    };

    const drawPlant = (plant: Plant, index: number, width: number, height: number, time: number) => {
      const plantWidth = plant.width ?? 12;
      const x = plant.baseX * width;
      const y = plant.baseY * height;
      const swayAmount = plant.swayAmplitude ?? 0.18;
      const swaySpeed = plant.swaySpeed ?? 0.0015;
      const sway = Math.sin(time * swaySpeed + index) * swayAmount;
      const scale = height / (maxHeight * 2.25);
      const effectiveHeight = plant.height * scale;

      context.save();
      context.translate(x, y);
      context.rotate(sway);

      context.fillStyle = plant.color ?? "#228b22";
      context.fillRect(-plantWidth / 2, -effectiveHeight, plantWidth, effectiveHeight);

      context.beginPath();
      context.arc(0, -effectiveHeight, plantWidth, 0, Math.PI * 2);
      context.fillStyle = "#2e8b57";
      context.fill();

      context.restore();
    };

    const render = (timestamp: number) => {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      context.fillStyle = skyColor;
      context.fillRect(0, 0, width, height);

      drawGround(width, height);
      plantState.forEach((plant, index) => drawPlant(plant, index, width, height, timestamp));

      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [groundColor, skyColor, plantState, maxHeight]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default GardenCanvas;
