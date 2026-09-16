import * as THREE from "three";

export const BOOK_SIZE = { width: 2.65, height: 3.7 };

export function roundedBoard(width: number, height: number, depth: number) {
  const r = 0.075;
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 5,
    steps: 1,
    curveSegments: 24,
  });
  geometry.translate(0, 0, -depth / 2);
  const uv = geometry.attributes.uv;
  const p = geometry.attributes.position;
  for (let i = 0; i < uv.count; i++)
    uv.setXY(
      i,
      (p.getX(i) + width / 2) / width,
      (p.getY(i) + height / 2) / height
    );
  return geometry;
}

export function curvedLeaf(side: -1 | 1, layer = 0) {
  const columns = 96;
  const rows = 32;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const width = BOOK_SIZE.width - 0.075 - layer * 0.001;
  const height = BOOK_SIZE.height - 0.08 - layer * 0.0015;
  for (let row = 0; row <= rows; row++) {
    const v = row / rows;
    const y = (v - 0.5) * height;
    const rounded = Math.max(0, (Math.abs(y) - (height / 2 - 0.07)) / 0.07);
    for (let col = 0; col <= columns; col++) {
      const t = col / columns;
      const distance = 0.018 + t * (width - rounded * rounded * 0.025);
      const arch =
        Math.sin(Math.PI * Math.pow(t, 0.52)) * 0.46 * Math.exp(-t * 0.65);
      const gutter = Math.exp(-t * 23) * 0.095;
      const z =
        0.13 +
        arch -
        gutter -
        layer * 0.011 +
        Math.sin(v * Math.PI) * Math.sin(t * Math.PI) * 0.026;
      const boundY =
        y * (1 - Math.exp(-t * 12) * 0.065 + Math.sin(t * Math.PI) * 0.02);
      positions.push(side * distance, boundY, z);
      uvs.push(side === 1 ? t : 1 - t, v);
    }
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const a = row * (columns + 1) + col;
      const b = a + 1;
      const c = a + columns + 1;
      const d = c + 1;
      if (side === 1) indices.push(a, b, c, b, d, c);
      else indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.userData.restPositions = new Float32Array(positions);
  geometry.userData.layer = layer;
  return geometry;
}

export function contactShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.filter = "blur(25px)";
  ctx.fillStyle = "#000";
  ctx.fillRect(70, 65, 372, 382);
  return new THREE.CanvasTexture(canvas);
}

export function grainTexture(kind: "leather" | "paper") {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const data = ctx.createImageData(size, size);
  let seed = 1289;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const noise = Array.from({ length: 128 * 128 }, random);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const broad = noise[Math.floor(y / 4) * 128 + Math.floor(x / 4)];
      const value =
        kind === "leather"
          ? 100 + broad * 80 + random() * 50
          : 145 + random() * 60;
      const i = (y * size + x) * 4;
      data.data[i] = data.data[i + 1] = data.data[i + 2] = value;
      data.data[i + 3] = 255;
    }
  }
  ctx.putImageData(data, 0, 0);
  if (kind === "leather") {
    ctx.strokeStyle = "#555555";
    ctx.lineWidth = 0.6;
    for (let i = 0; i < 2800; i++) {
      const x = random() * size;
      const y = random() * size;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + 2, y - 3, x + 5, y + 1);
      ctx.stroke();
    }
  }
  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(kind === "leather" ? 3 : 2, kind === "leather" ? 4 : 3);
  return map;
}
