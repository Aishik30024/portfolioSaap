"use client";
import { useEffect, useRef } from "react";

const AnimatedErrorPage = () => {
  const canvasRef = useRef(null);
  const charactersDivRef = useRef(null);
  const circles = useRef([]);
  const timerRef = useRef(0);
  const requestIDRef = useRef(null);

  class Circulo {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
  }

  const initCircles = (canvas) => {
    circles.current.length = 0;
    const { width, height } = canvas;
    for (let i = 0; i < 300; i++) {
      let randomX = Math.floor(Math.random() * ((width * 3) - (width * 1.2) + 1)) + width * 1.2;
      let randomY = Math.floor(Math.random() * (height - height * -0.2 + 1)) + height * -0.2;
      let size = width / 1000;
      circles.current.push(new Circulo(randomX, randomY, size));
    }
  };

  const draw = (canvas, context) => {
    timerRef.current++;
    context.setTransform(1, 0, 0, 1, 0, 0);
    const distanceX = canvas.width / 80;
    const growthRate = canvas.width / 1000;

    context.clearRect(0, 0, canvas.width, canvas.height);

    circles.current.forEach((circulo) => {
      context.beginPath();
      if (timerRef.current < 65) {
        circulo.x = circulo.x - distanceX;
        circulo.size = circulo.size + growthRate;
      }
      if (timerRef.current > 65 && timerRef.current < 500) {
        circulo.x = circulo.x - (distanceX * 0.02);
        circulo.size = circulo.size + (growthRate * 0.2);
      }
      context.arc(circulo.x, circulo.y, circulo.size, 0, 2 * Math.PI);
      context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--circle-color').trim();
      context.fill();
    });

    if (timerRef.current < 500) {
      requestIDRef.current = requestAnimationFrame(() => draw(canvas, context));
    }
  };

  const charactersAnimate = () => {
    if (charactersDivRef.current) {
      charactersDivRef.current.innerHTML = "";
    }

    for (let index = 0; index < 6; index++) {
      const stick = new Image();
      stick.classList.add("characters");
      let speedX;
      let speedRotation;

      switch (index) {
        case 0:
          stick.style.top = "0%";
          stick.src = "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg";
          stick.style.transform = "rotateZ(-90deg)";
          speedX = 2000;
          break;
        case 1:
          stick.style.top = "10%";
          stick.src = "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick1.svg";
          speedX = 3500;
          speedRotation = 2000;
          break;
        case 2:
          stick.style.top = "20%";
          stick.src = "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick2.svg";
          speedX = 6000;
          speedRotation = 1000;
          break;
        case 3:
          stick.style.top = "25%";
          stick.src = "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg";
          speedX = 2500;
          speedRotation = 1500;
          break;
        case 4:
          stick.style.top = "35%";
          stick.src = "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg";
          speedX = 2500;
          speedRotation = 300;
          break;
        case 5:
          stick.style.bottom = "5%";
          stick.src = "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick3.svg";
          break;
        default:
          break;
      }

      if (charactersDivRef.current) charactersDivRef.current.appendChild(stick);

      if (index === 5) continue;

      stick.animate(
        [{ left: "100%" }, { left: "-20%" }],
        { duration: speedX, easing: "linear", fill: "forwards" }
      );

      if (index !== 0) {
        stick.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(-360deg)" }],
          { duration: speedRotation, iterations: Infinity, easing: "linear" }
        );
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    timerRef.current = 0;
    if (requestIDRef.current) cancelAnimationFrame(requestIDRef.current);
    initCircles(canvas);
    draw(canvas, context);
    charactersAnimate();

    const handleResize = () => {
      setCanvasSize();
      timerRef.current = 0;
      if (requestIDRef.current) cancelAnimationFrame(requestIDRef.current);
      initCircles(canvas);
      draw(canvas, context);
      charactersAnimate();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestIDRef.current) cancelAnimationFrame(requestIDRef.current);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100..900;1,100..900&display=swap');

        :root {
          --circle-color: #101010; /* matches primary.light from Tailwind config */
        }
        .dark {
          --circle-color: #1266f1; /* matches primary.dark from Tailwind config */
        }
        body, html, #root {
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: 'Roboto', sans-serif;
          font-optical-sizing: auto;
        }
        .container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #message {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 90%;
          height: 90%;
          text-align: center;
          z-index: 3;
          mix-blend-mode: lighten;
        }
        #m1 {
          font-size: 35px;
          font-weight: 600;
          margin: 1%;
          z-index: 3;
          mix-blend-mode: lighen;
        }
        #m2 {
          font-size: 80px;
          font-weight: 700;
          margin: 1%;
          z-index: 3;
          mix-blend-mode: lighen;
        }
        #m3, #m4 {
          font-size: 15px;
          width: 50%;
          min-width: 40%;
          margin: 1%;
          z-index: 3;
          mix-blend-mode: lighten;
        }
        #charactersDiv {
          position: absolute;
          width: 99%;
          height: 95%;
          z-index: 2;
        }
        .characters {
          width: 18%;
          height: 18%;
          position: absolute;
          z-index: 2;
        }
        canvas {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
      `}</style>

      <div className="container bg-background-light dark:bg-background-dark">
        <div id="message" className="text-text-dark dark:text-text-dark">
          <div id="m1">Devs are working</div>
          <div id="m2">#9163842484</div>
          <div id="m3">
            Our devs are a bit lazy, so just call him maybe ?
            aint picking up our calls.
          </div>
          <div id="m4">
            Our "experts" are trying to fix the problem ( our dev ), please stand by.
          </div>
        </div>
        <div id="charactersDiv" ref={charactersDivRef}></div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
};

export default AnimatedErrorPage;