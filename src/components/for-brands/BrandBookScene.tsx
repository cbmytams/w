"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {
  roundedBoard,
  curvedLeaf,
  grainTexture,
  contactShadowTexture,
} from "./brand-book-model";
import { BOOK_CHAPTERS, chapterAt } from "./brand-book-content";
import styles from "./BrandBook.module.css";

const PAGE_W = 2.65;
const PAGE_H = 3.7;
const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;
const smooth = (value: number) => {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
};

// The page grain is deterministic: render it once, then stamp it onto
// every page. Drawing 75k specks per texture blocked first paint for ~1s.
let grainPattern: HTMLCanvasElement | null = null;

function grainCanvas() {
  if (grainPattern) return grainPattern;
  const pattern = document.createElement("canvas");
  pattern.width = 1000;
  pattern.height = 1400;
  const pctx = pattern.getContext("2d")!;
  let seed = 81;
  for (let n = 0; n < 75000; n++) {
    seed = (seed * 16807) % 2147483647;
    const x = seed % 1000;
    seed = (seed * 16807) % 2147483647;
    const y = seed % 1400;
    pctx.fillStyle = n % 2 ? "#ffffff09" : "#00000018";
    pctx.fillRect(x, y, 1, 2);
  }
  grainPattern = pattern;
  return pattern;
}

function surface(base = "#1d1d1d") {
  const canvas = document.createElement("canvas");
  const density = window.innerWidth <= 768 ? 1.5 : 2;
  canvas.width = 1000 * density;
  canvas.height = 1400 * density;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(density, density);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 1000, 1400);
  // A deterministic fine grain keeps the cover tactile at every resolution.
  ctx.drawImage(grainCanvas(), 0, 0, 1000, 1400);
  return { canvas, ctx };
}

function texture(canvas: HTMLCanvasElement, maxAnisotropy = 4) {
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = maxAnisotropy;
  return map;
}

function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight: number
) {
  let line = "";
  for (const word of text.split(" ")) {
    if (ctx.measureText(`${line}${word}`).width > width && line) {
      ctx.fillText(line.trim(), x, y);
      line = "";
      y += lineHeight;
    }
    line += `${word} `;
  }
  ctx.fillText(line.trim(), x, y);
}

function coverTexture(
  font: string,
  logo: HTMLImageElement,
  maxAnisotropy: number
) {
  const { canvas, ctx } = surface();
  ctx.fillStyle = "#131814";
  ctx.fillRect(24, 0, 6, 1400);
  ctx.fillStyle = "#f4f2e8";
  ctx.font = `500 28px ${font}`;
  ctx.fillText("INFLUENCE / CRÉATION", 90, 120);
  ctx.fillText("PRODUCTION / ADS", 90, 162);
  ctx.save();
  ctx.filter = "invert(1)";
  ctx.globalAlpha = 0.2;
  ctx.drawImage(logo, 265, 653, 470, 153);
  ctx.restore();
  ctx.fillStyle = "#f45a32";
  ctx.fillRect(95, 1040, 92, 4);
  ctx.fillStyle = "#f4f2e8";
  ctx.font = `400 32px ${font}`;
  ctx.fillText("Votre prochain chapitre.", 95, 1170);
  ctx.fillStyle = "#afb6aa";
  ctx.font = `400 23px ${font}`;
  ctx.fillText("DES IDÉES À LEUR DIFFUSION.", 95, 1230);
  return texture(canvas, maxAnisotropy);
}

function leftTexture(index: number, font: string, maxAnisotropy: number) {
  const { canvas, ctx } = surface();
  const shading = ctx.createLinearGradient(0, 0, 1000, 0);
  shading.addColorStop(0, "#00000035");
  shading.addColorStop(0.7, "#ffffff09");
  shading.addColorStop(0.9, "#00000018");
  shading.addColorStop(1, "#000000b0");
  ctx.fillStyle = shading;
  ctx.fillRect(0, 0, 1000, 1400);
  const item = BOOK_CHAPTERS[index];
  ctx.fillStyle = "#f4f2e8";
  ctx.font = `400 80px ${font}`;
  ctx.fillText(`0${index + 1}`, 88, 155);
  ctx.fillStyle = "#667064";
  ctx.fillRect(88, 190, 790, 2);
  ctx.fillStyle = "#d0d5ca";
  ctx.font = `500 25px ${font}`;
  ctx.fillText(item.service.toUpperCase(), 90, 243);
  ctx.fillStyle = "#f4f2e8";
  ctx.font = `600 112px ${font}`;
  const maxWidth = Math.max(
    ...item.headline.map((line) => ctx.measureText(line).width)
  );
  if (maxWidth > 815)
    ctx.font = `600 ${Math.floor((112 * 815) / maxWidth)}px ${font}`;
  item.headline.forEach((line, n) => ctx.fillText(line, 82, 420 + n * 119));
  ctx.fillStyle = "#c9cec3";
  ctx.font = `400 31px ${font}`;
  wrap(ctx, item.caption, 90, 1100, 740, 44);
  ctx.fillStyle = "#f45a32";
  ctx.fillRect(90, 1270, 70, 4);
  return texture(canvas, maxAnisotropy);
}

function chapterSeal(ctx: CanvasRenderingContext2D, index: number) {
  ctx.save();
  ctx.translate(500, 620);
  ctx.strokeStyle = "#202724";
  ctx.fillStyle = "#202724";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, 270, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 240, 0, Math.PI * 2);
  ctx.stroke();
  if (index === 0) {
    for (let n = 0; n < 3; n++) {
      const angle = (n * Math.PI * 2) / 3 - Math.PI / 2;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * 135, Math.sin(angle) * 135, 32, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 45, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 135, 0, Math.PI * 2);
    ctx.stroke();
  } else if (index === 1) {
    ctx.beginPath();
    for (let n = 0; n < 8; n++) {
      const angle = (n * Math.PI) / 4 - Math.PI / 2;
      const radius = n % 2 ? 50 : 185;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (!n) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#e9e7df";
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.fill();
  } else if (index === 2) {
    ctx.strokeRect(-154, -122, 308, 244);
    ctx.strokeRect(-128, -96, 256, 192);
    ctx.beginPath();
    ctx.moveTo(-38, -64);
    ctx.lineTo(86, 0);
    ctx.lineTo(-38, 64);
    ctx.closePath();
    ctx.fill();
    for (let n = -2; n <= 2; n++) {
      ctx.fillRect(-150 + n * 60 + 120, 154, 28, 7);
    }
  } else {
    ctx.lineWidth = 17;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let n = 0; n < 3; n++) {
      ctx.beginPath();
      ctx.arc(-92, 91, 65 + n * 52, -Math.PI / 2, 0);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(-150, 136);
    ctx.lineTo(112, -126);
    ctx.lineTo(112, -34);
    ctx.moveTo(112, -126);
    ctx.lineTo(20, -126);
    ctx.stroke();
  }
  ctx.fillStyle = "#f45a32";
  ctx.beginPath();
  ctx.arc(0, -270, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function rightTexture(
  index: number,
  font: string,
  logo: HTMLImageElement,
  maxAnisotropy: number
) {
  const { canvas, ctx } = surface("#e9e7df");
  const shading = ctx.createLinearGradient(0, 0, 1000, 0);
  shading.addColorStop(0, "#00000055");
  shading.addColorStop(0.16, "#ffffff18");
  shading.addColorStop(0.75, "#00000000");
  shading.addColorStop(1, "#00000018");
  ctx.fillStyle = shading;
  ctx.fillRect(0, 0, 1000, 1400);
  ctx.fillStyle = "#202724";
  ctx.drawImage(logo, 88, 92, 138, 45);
  ctx.font = `500 26px ${font}`;
  ctx.fillText(`/ 0${index + 1}`, 244, 130);
  ctx.fillStyle = "#f45a32";
  ctx.fillRect(88, 176, 90, 5);
  chapterSeal(ctx, index);
  ctx.fillStyle = "#202724";
  ctx.font = `600 68px ${font}`;
  ctx.textAlign = "center";
  ctx.fillText(BOOK_CHAPTERS[index].service.toUpperCase(), 500, 1010);
  ctx.textAlign = "left";
  ctx.strokeStyle = "#8f978d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(88, 1070);
  ctx.lineTo(910, 1070);
  ctx.stroke();
  ctx.fillStyle = "#202724";
  ctx.font = `500 27px ${font}`;
  wrap(ctx, BOOK_CHAPTERS[index].footer, 88, 1178, 780, 40);
  ctx.fillStyle = "#59635a";
  ctx.font = `400 19px ${font}`;
  ctx.drawImage(logo, 88, 1288, 105, 34);
  ctx.fillText("/ ÉTUDE CRÉATIVE", 215, 1320);
  ctx.fillText(`0${index + 1}`, 865, 1320);
  return texture(canvas, maxAnisotropy);
}

export default function BrandBookScene({
  progress,
  reducedMotion,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let disposed = false;
    let cleanup = () => {};
    document.fonts.ready.then(async () => {
      if (disposed) return;
      const logo = new window.Image();
      logo.src = "/wafia.svg";
      try {
        await logo.decode();
      } catch (error) {
        if (error instanceof Error)
          console.error("Wafia logo could not load", error);
        return;
      }
      if (disposed) return;
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch {
        return;
      }
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, window.innerWidth <= 768 ? 2 : 2.5)
      );
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-6, 6, 4, -4, 0.1, 100);
      camera.position.set(0, 0, 15);
      const environmentGenerator = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = environmentGenerator.fromScene(room, 0.06);
      scene.environment = environment.texture;
      scene.environmentIntensity = 0.38;
      room.dispose();
      environmentGenerator.dispose();
      scene.add(new THREE.AmbientLight(0xffffff, 0.25));
      const key = new THREE.DirectionalLight(0xfff9f0, 3);
      key.position.set(-3, 5, 9);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      Object.assign(key.shadow.camera, {
        left: -8,
        right: 8,
        top: 8,
        bottom: -8,
        near: 0.5,
        far: 30,
      });
      key.shadow.bias = -0.001;
      key.shadow.normalBias = 0.014;
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xf1f5ff, 1.3);
      rim.position.set(3, -1, 3);
      scene.add(rim);
      const book = new THREE.Group();
      scene.add(book);
      const font =
        getComputedStyle(container).getPropertyValue("--font-outfit").trim() ||
        "sans-serif";
      const maxAnisotropy = Math.min(
        renderer.capabilities.getMaxAnisotropy(),
        16
      );
      const cover = coverTexture(font, logo, maxAnisotropy);
      // The closed book only shows the cover and chapter-0 pages. Later
      // chapters generate after first paint so opening the page never waits.
      const leftMaps: Array<THREE.Texture | null> = [null, null, null, null];
      const rightMaps: Array<THREE.Texture | null> = [null, null, null, null];
      const leftZero = leftTexture(0, font, maxAnisotropy);
      const rightZero = rightTexture(0, font, logo, maxAnisotropy);
      leftMaps[0] = leftZero;
      rightMaps[0] = rightZero;
      const pendingChapters = [1, 2, 3];
      const fillNextChapter = () => {
        if (disposed) return;
        const index = pendingChapters.shift();
        if (index === undefined) return;
        leftMaps[index] = leftTexture(index, font, maxAnisotropy);
        rightMaps[index] = rightTexture(index, font, logo, maxAnisotropy);
        if (pendingChapters.length > 0) scheduleIdle(fillNextChapter);
        else requestRender();
      };
      const scheduleIdle = (fn: () => void) => {
        if ("requestIdleCallback" in window) window.requestIdleCallback(fn);
        else setTimeout(fn, 0);
      };
      const leatherGrain = grainTexture("leather");
      const paperGrain = grainTexture("paper");
      const edge = new THREE.MeshPhysicalMaterial({
        color: "#101112",
        roughness: 0.92,
        bumpMap: leatherGrain,
        bumpScale: 0.003,
        sheen: 0.05,
        sheenRoughness: 0.9,
      });
      const coverMat = new THREE.MeshPhysicalMaterial({
        map: cover,
        roughness: 0.88,
        bumpMap: leatherGrain,
        bumpScale: 0.003,
        sheen: 0.05,
        sheenRoughness: 0.9,
      });
      const leftMat = new THREE.MeshStandardMaterial({
        map: leftZero,
        roughness: 0.96,
        bumpMap: paperGrain,
        bumpScale: 0.001,
      });
      const rightMat = new THREE.MeshStandardMaterial({
        map: rightZero,
        roughness: 0.96,
        bumpMap: paperGrain,
        bumpScale: 0.001,
      });
      const back = new THREE.Mesh(
        roundedBoard(PAGE_W + 0.09, PAGE_H + 0.1, 0.1),
        edge
      );
      back.position.set(PAGE_W / 2, 0, -0.2);
      book.add(back);
      const paperMat = new THREE.MeshStandardMaterial({
        color: "#343434",
        roughness: 0.98,
        side: THREE.DoubleSide,
      });
      const paperAlt = new THREE.MeshStandardMaterial({
        color: "#262626",
        roughness: 0.98,
        side: THREE.DoubleSide,
      });
      const leftLeaves = new THREE.Group();
      book.add(leftLeaves);
      for (let i = 22; i > 0; i--) {
        const material = i % 3 === 0 ? paperMat : paperAlt;
        book.add(new THREE.Mesh(curvedLeaf(1, i), material));
        leftLeaves.add(new THREE.Mesh(curvedLeaf(-1, i), material));
      }
      const page = new THREE.Mesh(curvedLeaf(1), rightMat);
      book.add(page);
      const leftPage = new THREE.Mesh(curvedLeaf(-1), leftMat);
      leftLeaves.add(leftPage);
      const turningGeometry = curvedLeaf(1);
      const undersideGeometry = turningGeometry.clone();
      const undersideUvs = undersideGeometry.attributes.uv;
      for (let i = 0; i < undersideUvs.count; i++)
        undersideUvs.setX(i, 1 - undersideUvs.getX(i));
      const turningFrontMat = new THREE.MeshStandardMaterial({
        map: rightZero,
        roughness: 0.96,
        bumpMap: paperGrain,
        bumpScale: 0.001,
        side: THREE.FrontSide,
      });
      const turningBackMat = new THREE.MeshStandardMaterial({
        roughness: 0.96,
        bumpMap: paperGrain,
        bumpScale: 0.001,
        side: THREE.BackSide,
      });
      const turningPage = new THREE.Group();
      const turningFront = new THREE.Mesh(turningGeometry, turningFrontMat);
      const turningBack = new THREE.Mesh(undersideGeometry, turningBackMat);
      turningFront.castShadow = turningBack.castShadow = true;
      turningPage.add(turningFront, turningBack);
      turningPage.visible = false;
      book.add(turningPage);
      const hinge = new THREE.Group();
      book.add(hinge);
      const front = new THREE.Mesh(
        roundedBoard(PAGE_W + 0.08, PAGE_H + 0.1, 0.075),
        [coverMat, edge]
      );
      front.position.x = PAGE_W / 2;
      hinge.add(front);
      const spine = new THREE.Mesh(
        new THREE.CylinderGeometry(0.115, 0.115, PAGE_H + 0.07, 32),
        edge
      );
      spine.scale.z = 2;
      spine.position.set(-0.015, 0, 0.055);
      book.add(spine);

      const elasticMat = new THREE.MeshStandardMaterial({
        color: "#111112",
        roughness: 0.96,
        bumpMap: leatherGrain,
        bumpScale: 0.002,
      });
      const elastic = new THREE.Mesh(
        roundedBoard(0.095, PAGE_H + 0.12, 0.024),
        elasticMat
      );
      elastic.position.set(PAGE_W - 0.26, 0, 0.067);
      hinge.add(elastic);
      const joint = new THREE.Mesh(
        roundedBoard(0.025, PAGE_H + 0.04, 0.02),
        edge
      );
      joint.position.set(0.105, 0, 0.045);
      hinge.add(joint);
      book.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
      const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.07 });
      const shadow = new THREE.Mesh(
        new THREE.PlaneGeometry(30, 20),
        shadowMaterial
      );
      shadow.position.z = -0.34;
      shadow.receiveShadow = true;
      scene.add(shadow);
      const contactMap = contactShadowTexture();
      const contactMaterial = new THREE.MeshBasicMaterial({
        map: contactMap,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
      });
      const contact = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        contactMaterial
      );
      contact.position.z = -0.36;
      scene.add(contact);
      const leaves = [...book.children, ...leftLeaves.children].filter(
        (object): object is THREE.Mesh<THREE.BufferGeometry> =>
          object instanceof THREE.Mesh &&
          object.geometry.userData.restPositions !== undefined
      );

      let active = 0;
      let current = progress.get();
      let width = 1;
      let height = 1;
      let frame = 0;
      let lastTime = 0;
      let lastOpen = -1;
      function render(time = 0) {
        frame = 0;
        if (disposed || !isVisible()) return;
        const target = progress.get();
        const delta = Math.min((time - lastTime) / 1000 || 0.016, 0.06);
        lastTime = time;
        current = reducedMotion
          ? target
          : lerp(current, target, 1 - Math.exp(-12 * delta));
        const open = reducedMotion
          ? Number(current > 0.2)
          : smooth((current - 0.06) / 0.25);
        const mobile = width <= 768;
        const viewWidth = (8 * width) / height;
        const scale = mobile
          ? lerp(
              Math.min((viewWidth * 0.37) / PAGE_W, 0.65),
              Math.min((viewWidth * 0.9) / (PAGE_W * 2), 0.61),
              open
            )
          : Math.min(1.18, (viewWidth * 0.56) / (PAGE_W * 2));
        book.scale.setScalar(scale);
        const centerX = mobile
          ? 0
          : lerp(viewWidth * 0.237, -viewWidth * 0.145, open);
        book.position.x = centerX - ((PAGE_W * scale) / 2) * (1 - open);
        book.position.y = mobile ? lerp(-1.55, 1.32, open) : -0.1;
        book.rotation.set(
          lerp(0.22, -0.18, open),
          lerp(-0.35, 0.04, open),
          lerp(-0.065, 0.018, open)
        );
        hinge.rotation.y = -open * Math.PI;
        hinge.position.z = lerp(0.32, -0.2, open);
        leftLeaves.rotation.y = Math.PI * (1 - open);
        leftLeaves.position.z = 0.2 * (1 - open);
        spine.scale.z = lerp(2, 0.85, open);
        spine.position.z = lerp(0.055, -0.25, open);
        contact.position.x = centerX + 0.07;
        contact.position.y = book.position.y - 0.12;
        contact.scale.set(
          (PAGE_W * (1 + open) + 1.1) * scale,
          (PAGE_H + 1.05) * scale,
          1
        );
        contact.rotation.z = book.rotation.z;
        contactMaterial.opacity = lerp(0.23, 0.46, open);
        if (Math.abs(open - lastOpen) > 0.00001) {
          for (const leaf of leaves) {
            const geometry = leaf.geometry;
            const rest = geometry.userData.restPositions as Float32Array;
            const layer = geometry.userData.layer as number;
            const p = geometry.attributes.position;
            for (let i = 0; i < p.count; i++)
              p.setZ(i, lerp(0.09 - layer * 0.008, rest[i * 3 + 2], open));
            p.needsUpdate = true;
            geometry.computeVertexNormals();
          }
          lastOpen = open;
        }
        const next = chapterAt(current);
        let turning = -1;
        let turn = 0;
        if (!reducedMotion && open > 0.98) {
          for (let i = 0; i < BOOK_CHAPTERS.length - 1; i++) {
            const boundary = 0.32 + (i + 1) * 0.205;
            if (current >= boundary - 0.045 && current <= boundary + 0.045) {
              // Turning needs both faces generated; until then the open
              // spread simply stays put for a few frames.
              if (!rightMaps[i] || !leftMaps[i + 1]) break;
              turning = i;
              turn = smooth((current - boundary + 0.045) / 0.09);
              break;
            }
          }
        }
        const leftIndex = turning >= 0 && turn < 0.5 ? turning : next;
        const rightIndex = turning >= 0 ? turning + 1 : next;
        const leftReady = leftMaps[leftIndex];
        const rightReady = rightMaps[rightIndex];
        if (leftReady && leftMat.map !== leftReady) {
          leftMat.map = leftReady;
          leftMat.needsUpdate = true;
        }
        if (rightReady && rightMat.map !== rightReady) {
          rightMat.map = rightReady;
          rightMat.needsUpdate = true;
        }
        active = next;
        turningPage.visible = turning >= 0;
        if (turning >= 0) {
          const turnFront = rightMaps[turning];
          const turnBack = leftMaps[turning + 1];
          if (turnFront && turningFrontMat.map !== turnFront) {
            turningFrontMat.map = turnFront;
            turningFrontMat.needsUpdate = true;
          }
          if (turnBack && turningBackMat.map !== turnBack) {
            turningBackMat.map = turnBack;
            turningBackMat.needsUpdate = true;
          }
          turningPage.rotation.y = -Math.PI * turn;
          turningPage.rotation.x = -0.025 * Math.sin(Math.PI * turn);
          turningPage.position.z = 0.025 + 0.16 * Math.sin(Math.PI * turn);
          const rest = turningGeometry.userData.restPositions as Float32Array;
          for (const geometry of [turningGeometry, undersideGeometry]) {
            const positions = geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
              const x = rest[i * 3];
              positions.setZ(
                i,
                rest[i * 3 + 2] +
                  Math.sin((x / PAGE_W) * Math.PI) *
                    0.2 *
                    Math.sin(Math.PI * turn)
              );
            }
            positions.needsUpdate = true;
            geometry.computeVertexNormals();
          }
        }
        renderer.render(scene, camera);
        renderer.domElement.dataset.bookProgress = current.toFixed(3);
        renderer.domElement.dataset.bookChapter = String(active);
        renderer.domElement.dataset.bookTurning =
          turning < 0 ? "0" : turn.toFixed(3);
        if (Math.abs(current - target) > 0.0001) requestRender();
      }
      function isVisible() {
        const bounds = renderer.domElement.getBoundingClientRect();
        return bounds.bottom > 0 && bounds.top < window.innerHeight;
      }
      function requestRender() {
        if (!frame && !disposed && isVisible())
          frame = requestAnimationFrame(render);
      }
      const resize = new ResizeObserver(() => {
        width = container.clientWidth;
        height = container.clientHeight;
        renderer.setSize(width, height);
        camera.left = (-4 * width) / height;
        camera.right = (4 * width) / height;
        camera.updateProjectionMatrix();
        requestRender();
      });
      resize.observe(container);
      const visibility = new IntersectionObserver(requestRender);
      visibility.observe(container);
      const unsubscribe = progress.on("change", requestRender);
      const lost = (event: Event) => {
        event.preventDefault();
        setReady(false);
      };
      const restored = () => {
        setReady(true);
        requestRender();
      };
      renderer.domElement.addEventListener("webglcontextlost", lost);
      renderer.domElement.addEventListener("webglcontextrestored", restored);
      setReady(true);
      requestRender();
      scheduleIdle(fillNextChapter);
      cleanup = () => {
        cancelAnimationFrame(frame);
        unsubscribe();
        resize.disconnect();
        visibility.disconnect();
        renderer.domElement.removeEventListener("webglcontextlost", lost);
        renderer.domElement.removeEventListener(
          "webglcontextrestored",
          restored
        );
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) object.geometry.dispose();
        });
        [
          edge,
          coverMat,
          leftMat,
          rightMat,
          turningFrontMat,
          turningBackMat,
          paperMat,
          paperAlt,
          elasticMat,
          shadowMaterial,
          contactMaterial,
        ].forEach((material) => material.dispose());
        [
          cover,
          leatherGrain,
          paperGrain,
          contactMap,
          ...leftMaps,
          ...rightMaps,
        ].forEach((map) => map?.dispose());
        environment.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [progress, reducedMotion]);

  return (
    <div ref={host} style={{ width: "100%", height: "100%" }}>
      {!ready && (
        <div className={styles.fallback}>
          <span>
            INFLUENCE / CRÉATION
            <br />
            PRODUCTION / ADS
          </span>
          <Image src="/wafia.svg" width={172} height={56} alt="" />
          <span>Votre prochain chapitre.</span>
        </div>
      )}
    </div>
  );
}
