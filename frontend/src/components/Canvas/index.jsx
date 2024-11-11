// frontend/src/components/Canvas.js

import { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000'); // Connects to backend server

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    socket.on('drawing', (data) => {
      const { x0, y0, x1, y1, color } = data;
      drawLine(ctx, x0, y0, x1, y1, color, false);
    });

    return () => {
      socket.off('drawing');
    };
  }, []);

  const drawLine = (ctx, x0, y0, x1, y1, color, emit) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    if (!emit) return;

    socket.emit('drawing', { x0, y0, x1, y1, color });
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    canvasRef.current.lastX = offsetX;
    canvasRef.current.lastY = offsetY;
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    const color = 'black';

    drawLine(ctx, canvasRef.current.lastX, canvasRef.current.lastY, offsetX, offsetY, color, true);
    canvasRef.current.lastX = offsetX;
    canvasRef.current.lastY = offsetY;
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ border: '1px solid #000' }}
    />
  );
};

export default Canvas;
