import React, { useRef, useEffect } from 'react';

function LivingNHDots({ stats }) {
  const canvasRef = useRef(null);

  function getGreenRedColor(value) {
    const red = Math.floor(255 * value / 100);
    const green = 255 - red;
    return `rgb(${red}, ${green}, 0)`;
  }



  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    var dots = [];
      
    // Initialize dots with random positions and colors
    const newDots = [];
    for (let i = 0; i < stats.stats.total_people; i++) {
      newDots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color: getGreenRedColor(Math.random() * 100),
      });
    }
    dots= newDots;

    // Function to draw a dot
    const drawDot = (dot) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = dot.color;
      ctx.fill();
    };

    // Function to update dot positions ane make dots walk in a straight line until they hit an edge and then reverse
    const updateDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const newDots = dots.map((dot) => {
        const newX = dot.x + Math.random() * 2 - 1;
        const newY = dot.y + Math.random() * 2 - 1;
        return { ...dot, x: newX, y: newY };
      });
      dots = newDots;
      newDots.forEach(drawDot);
    };

    const intervalId = setInterval(updateDots, 50);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="livingNHDotsContainer" id="livingNHDotsContainerId">
        <canvas ref={canvasRef} width={1000} height={300} />
    </div>
  );
}

export default LivingNHDots;
