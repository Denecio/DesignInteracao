import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000'); // Connects to backend server

const Canvas = forwardRef((props, ref) => {
  const canvasRef = useRef();
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useImperativeHandle(ref, () => ({
    getCanvasImage: () => {
      const canvas = canvasRef.current;
      return canvas.toDataURL('image/png'); // Get canvas image as base64
    },
    clearCanvas: () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // não sei se esta bem
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Resize canvas to match its container
    const resizeCanvas = () => {
      const container = containerRef.current;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }, []);

  const drawLine = (ctx, x0, y0, x1, y1, color) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
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

    drawLine(ctx, canvasRef.current.lastX, canvasRef.current.lastY, offsetX, offsetY, color);
    canvasRef.current.lastX = offsetX;
    canvasRef.current.lastY = offsetY;
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getTouchPos(e);
    canvasRef.current.lastX = x;
    canvasRef.current.lastY = y;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;

    const { x, y } = getTouchPos(e);
    const ctx = canvasRef.current.getContext('2d');
    const color = 'black';

    drawLine(ctx, canvasRef.current.lastX, canvasRef.current.lastY, x, y, color);
    canvasRef.current.lastX = x;
    canvasRef.current.lastY = y;
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  const getTouchPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
});

export default Canvas;
