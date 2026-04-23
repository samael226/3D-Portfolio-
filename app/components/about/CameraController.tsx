'use client';

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetData } from './planetData';

interface CameraControllerProps {
  selectedPlanet: string | null;
  planetData: PlanetData[];
  onBack: () => void;
}

const CameraController: React.FC<CameraControllerProps> = ({
  selectedPlanet,
  planetData,
  onBack
}) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 5, 25));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, -20));
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (selectedPlanet) {
      const planet = planetData.find((p: PlanetData) => p.id === selectedPlanet);
      if (planet) {
        // Use fixed position for close-up view to avoid timing issues
        targetPosition.current = new THREE.Vector3(
          planet.orbitRadius + 3,
          2,
          5
        );
        targetLookAt.current = new THREE.Vector3(planet.orbitRadius, 0, 0);
        isTransitioning.current = true;
      }
    } else {
      // Back to system view
      targetPosition.current = new THREE.Vector3(0, 5, 25);
      targetLookAt.current = new THREE.Vector3(0, 0, -20);
      isTransitioning.current = true;
    }
  }, [selectedPlanet, planetData]);

  useFrame(() => {
    if (isTransitioning.current) {
      // Smooth camera transition
      camera.position.lerp(targetPosition.current, 0.05);
      
      // Simple look at target
      camera.lookAt(targetLookAt.current);
      
      // Check if transition is complete
      if (camera.position.distanceTo(targetPosition.current) < 0.1) {
        isTransitioning.current = false;
      }
    }
  });

  // Handle escape key to go back
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPlanet) {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPlanet, onBack]);

  return null;
};

export default CameraController;
