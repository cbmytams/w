"use client";

import { useEffect, useRef } from "react";

const STAR_COLOR = "#fff";
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;

type Star = {
  x: number;
  y: number;
  z: number;
};

type Velocity = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  z: number;
};

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let scale = 1;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frameId = 0;

    let pointerX: number | null = null;
    let pointerY: number | null = null;

    const velocity: Velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
    let touchInput = false;

    const starCount = Math.floor((window.innerWidth + window.innerHeight) / 8);

    function generate() {
      for (let i = 0; i < starCount; i += 1) {
        stars.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    }

    function placeStar(star: Star) {
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    }

    function recycleStar(star: Star) {
      if (!context) return;
      let direction: "z" | "l" | "r" | "t" | "b" = "z";

      const vx = Math.abs(velocity.x);
      const vy = Math.abs(velocity.y);

      if (vx > 1 || vy > 1) {
        let axis: "h" | "v";

        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? "h" : "v";
        } else {
          axis = Math.random() < vy / (vx + vy) ? "v" : "h";
        }

        if (axis === "h") {
          direction = velocity.x > 0 ? "l" : "r";
        } else {
          direction = velocity.y > 0 ? "t" : "b";
        }
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

      if (direction === "z") {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      } else if (direction === "l") {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "r") {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "t") {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
      }
    }

    function resize() {
      scale = window.devicePixelRatio || 1;

      width = window.innerWidth * scale;
      height = window.innerHeight * scale;

      if (!canvas) return;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      if (!canvas) return;
      canvas.style.height = `${window.innerHeight}px`;

      stars.forEach(placeStar);
    }

    function update() {
      if (!context) return;
      velocity.tx *= 0.96;
      velocity.ty *= 0.96;

      velocity.x += (velocity.tx - velocity.x) * 0.8;
      velocity.y += (velocity.ty - velocity.y) * 0.8;

      stars.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    }

    function render() {
      if (!context) return;
      if (!context) return;
      stars.forEach((star) => {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;

        context.beginPath();
        context.moveTo(star.x, star.y);

        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;

        if (Math.abs(tailX) < 0.1) {
          tailX = 0.5;
        }
        if (Math.abs(tailY) < 0.1) {
          tailY = 0.5;
        }

        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      });
    }

    function step() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      update();
      render();
      frameId = window.requestAnimationFrame(step);
    }

    function movePointer(x: number, y: number) {
      if (typeof pointerX === "number" && typeof pointerY === "number") {
        const ox = x - pointerX;
        const oy = y - pointerY;

        velocity.tx += (ox / (8 * scale)) * (touchInput ? 1 : -1);
        velocity.ty += (oy / (8 * scale)) * (touchInput ? 1 : -1);
      }

      pointerX = x;
      pointerY = y;
    }

    function onMouseMove(event: MouseEvent) {
      touchInput = false;
      movePointer(event.clientX, event.clientY);
    }

    function onTouchMove(event: TouchEvent) {
      touchInput = true;

      if (event.touches.length > 0) {
        movePointer(event.touches[0].clientX, event.touches[0].clientY);
      }

      event.preventDefault();
    }

    function onMouseLeave() {
      pointerX = null;
      pointerY = null;
    }

    generate();
    resize();
    step();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onMouseLeave);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseLeave);
      document.removeEventListener("mouseleave", onMouseLeave);
      stars = [];
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#050510]">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
    </div>
  );
}
