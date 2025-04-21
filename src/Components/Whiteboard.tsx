import React, { useRef, useState } from "react";
import "./Whiteboard.css";
import { IoIosArrowBack } from "react-icons/io";
import { Save } from "lucide-react";

interface BlackboardProps {
  onBack: () => void;
}

export default function Blackboard({ onBack }: BlackboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState<"draw" | "eraser" | "text">("draw");
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [zoom, setZoom] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [text, setText] = useState("");
  const [drawHistory, setDrawHistory] = useState<string[]>([]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo((e.clientX - rect.left) / zoom, (e.clientY - rect.top) / zoom);
    setDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo((e.clientX - rect.left) / zoom, (e.clientY - rect.top) / zoom);

    if (tool === "eraser") {
      ctx.strokeStyle = "#ffffff"; // Eraser color (white background)
    } else {
      ctx.strokeStyle = color;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round"; // Default to round brush
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setDrawing(false);
    // Save canvas state for undo functionality
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      setDrawHistory((prevHistory) => [...prevHistory, dataUrl]);
    }
  };

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prevZoom) =>
      direction === "in" ? prevZoom * 1.2 : prevZoom / 1.2
    );
  };

  const handleResizeCanvas = (width: number, height: number) => {
    setCanvasSize({ width, height });
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleUndo = () => {
    setDrawHistory((prevHistory) => {
      if (prevHistory.length > 1) {
        prevHistory.pop();
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const lastState = prevHistory[prevHistory.length - 1];
            const img = new Image();
            img.src = lastState;
            img.onload = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
            };
          }
        }
      }
      return [...prevHistory];
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAddText = () => {
    if (text && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = color;
        ctx.fillText(text, 50, 50); // Example text placement
      }
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "whiteboard-drawing.png";
      link.click();
    }
  };

  return (
    <div className="blackboard-container">
      <div className="header-container d-flex align-items-center justify-content-between p-3">
        <IoIosArrowBack
          size={30}
          onClick={onBack}
          style={{ cursor: "pointer" }}
        />
        <h2 className="text-center flex-grow-1 m-0">Whiteboard</h2>
        <Save size={30} style={{ cursor: "pointer" }} onClick={handleSave} />
      </div>

      <div className="toolbar">
        <button onClick={() => setTool("draw")}>✏️ Draw</button>
        <button onClick={() => setTool("eraser")}>🩹 Eraser</button>
        <button onClick={() => setTool("text")}>🔤 Text</button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          title="Choose Color"
        />
        <label>
          Line Width:
          <input
            type="number"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            style={{ width: "60px" }}
            title="Line Width"
          />
        </label>
        <button onClick={() => handleZoom("in")}>🔍 Zoom In</button>
        <button onClick={() => handleZoom("out")}>🔍 Zoom Out</button>
        <button onClick={handleClearCanvas}>🧹 Clear</button>
        <button onClick={handleUndo}>↩️ Undo</button>
        {tool === "text" && (
          <>
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Enter text"
            />
            <button onClick={handleAddText}>Add Text</button>
          </>
        )}
        <label>
          Width:
          <input
            type="number"
            value={canvasSize.width}
            onChange={(e) =>
              handleResizeCanvas(Number(e.target.value), canvasSize.height)
            }
            style={{ width: "60px" }}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={canvasSize.height}
            onChange={(e) =>
              handleResizeCanvas(canvasSize.width, Number(e.target.value))
            }
            style={{ width: "60px" }}
          />
        </label>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "0 0",
            backgroundColor: "#ffffff",
            cursor:
              tool === "draw" || tool === "eraser" ? "crosshair" : "default",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
  );
}
