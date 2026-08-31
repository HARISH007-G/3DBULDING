import * as THREE from 'three';

/**
 * Procedural HTML5 Canvas Texture Generators for Photorealistic PBR Materials.
 * Zero external asset dependencies — generated dynamically in memory!
 */

// 1. Black & Gold Marble Texture for Floor 6 Executive Suite
export function createBlackGoldMarbleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Dark marble base
  ctx.fillStyle = '#121418';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle dark grey veining
  ctx.strokeStyle = '#282C34';
  ctx.lineWidth = 4;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 1024, Math.random() * 1024);
    ctx.bezierCurveTo(
      Math.random() * 1024, Math.random() * 1024,
      Math.random() * 1024, Math.random() * 1024,
      Math.random() * 1024, Math.random() * 1024
    );
    ctx.stroke();
  }

  // Polished Gold Metallic Veins
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 1024, 0);
    ctx.bezierCurveTo(
      Math.random() * 1024, 300,
      Math.random() * 1024, 700,
      Math.random() * 1024, 1024
    );
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 2. White Calacatta Marble Texture for Ground Floor Lobby
export function createCalacattaMarbleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Pure white marble base
  ctx.fillStyle = '#F8F9FA';
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft grey veining
  ctx.strokeStyle = '#D0D5DD';
  ctx.lineWidth = 6;
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 1024, Math.random() * 1024);
    ctx.bezierCurveTo(
      Math.random() * 1024, Math.random() * 1024,
      Math.random() * 1024, Math.random() * 1024,
      Math.random() * 1024, Math.random() * 1024
    );
    ctx.stroke();
  }

  // Subtle gold streak
  ctx.strokeStyle = '#C5A059';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.bezierCurveTo(300, 400, 700, 600, 900, 1024);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// 3. Carbon Fiber Weave Texture for Floor 5 Technology
export function createCarbonFiberTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#15181C';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#22272E';
  const size = 16;
  for (let i = 0; i < 256; i += size) {
    for (let j = 0; j < 256; j += size) {
      if ((i / size + j / size) % 2 === 0) {
        ctx.fillRect(i, j, size, size);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
}

// 4. Developer Scrolling Code Screen Texture for Floor 5
export function createCodeScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#050B14';
  ctx.fillRect(0, 0, 512, 512);

  ctx.font = '14px monospace';
  const lines = [
    'const neuralNetwork = new AI.Core({ layers: 128 });',
    'await neuralNetwork.train(dataset, { epochs: 500 });',
    'function optimizeRenderLoop(fps, delta) {',
    '  if (fps < 60) scaleDPR(0.85);',
    '  camera.lerp(targetWaypoint, delta * 12.0);',
    '}',
    '// NEXUS HQ SYSTEM ARCHITECTURE V2.4',
    'const status = await serverCluster.ping("10.0.0.1");',
    'console.log("System Status: OPERATIONAL", status);'
  ];

  ctx.fillStyle = '#00F0FF';
  lines.forEach((line, idx) => {
    ctx.fillText(line, 20, 40 + idx * 45);
  });

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 5. Interactive Presentation Chart Texture for Floor 3 Boardroom
export function createChartScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0A1224';
  ctx.fillRect(0, 0, 512, 512);

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('NEXUS GLOBAL PERFORMANCE Q3', 30, 50);

  // Bar Chart Graphics
  const heights = [120, 220, 180, 310, 280, 390];
  const colors = ['#0F52BA', '#00F0FF', '#8A2BE2', '#00C853', '#FFBF00', '#FF5500'];

  heights.forEach((h, idx) => {
    ctx.fillStyle = colors[idx];
    ctx.fillRect(40 + idx * 70, 440 - h, 45, h);
  });

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// 6. Acoustic Carpet Tile Texture for Floor 3 & 2
export function createCarpetTexture(baseColorHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = baseColorHex;
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 256; i += 32) {
    ctx.strokeRect(i, 0, 32, 256);
    ctx.strokeRect(0, i, 256, 32);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}
