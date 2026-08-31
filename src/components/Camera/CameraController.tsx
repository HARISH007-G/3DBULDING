import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useExperienceStore } from '../../store/useExperienceStore';
import { getCameraStateAtProgress } from './waypoints';

export function CameraController() {
  const { camera } = useThree();
  // Initialize target directly at Hero CEO Desk & Window view [-2.5, 25.0, -1.5]
  const currentTarget = useRef(new THREE.Vector3(-2.5, 25.0, -1.5));
  
  // Idle micro-drift tracking state
  const lastProgress = useRef(0);
  const idleTimer = useRef(0);
  const driftFactor = useRef(0);

  useFrame((state, delta) => {
    // Single Source of Truth: read latest scroll progress directly from store every frame
    const storeState = useExperienceStore.getState();
    const scrollProgress = storeState.scrollProgress;
    const reducedMotion = storeState.reducedMotion;
    const { position, target, fov } = getCameraStateAtProgress(scrollProgress);

    // Detect scroll activity vs idle state
    const scrollDelta = Math.abs(scrollProgress - lastProgress.current);
    if (scrollDelta > 0.0002) {
      idleTimer.current = 0;
      driftFactor.current = Math.max(0, driftFactor.current - delta * 6.0); // Instantly suppress on scroll
    } else {
      idleTimer.current += delta;
      if (idleTimer.current > 1.5 && !reducedMotion) {
        driftFactor.current = Math.min(1.0, driftFactor.current + delta * 0.8); // Smoothly ramp up breathing
      }
    }
    lastProgress.current = scrollProgress;

    // Subtle sinusoidal camera breathing micro-drift (~±0.015m max)
    const time = state.clock.getElapsedTime();
    const driftX = Math.sin(time * 0.7) * 0.015 * driftFactor.current;
    const driftY = Math.cos(time * 0.5) * 0.010 * driftFactor.current;

    // Real-time cursor parallax (subtle depth response to mouse position)
    const pointer = state.pointer;
    const parallaxX = reducedMotion ? 0 : pointer.x * 0.15;
    const parallaxY = reducedMotion ? 0 : pointer.y * 0.10;

    const desiredPosition = position.clone();
    desiredPosition.x += driftX + parallaxX;
    desiredPosition.y += driftY + parallaxY;

    // High-responsiveness lerp damping factor (immediate, crisp tracking)
    const damp = Math.min(1.0, delta * 24.0);
    camera.position.lerp(desiredPosition, damp);

    currentTarget.current.lerp(target, damp);
    camera.lookAt(currentTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, damp);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
