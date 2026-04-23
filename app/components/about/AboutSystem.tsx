'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Planet from './Planet';
import CameraController from './CameraController';
import ContentPanel from './ContentPanel';
import { planetData, PlanetData } from './planetData';

const AboutSystem = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  // Animate orbital motion
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Slow rotation of entire system
    }
  });

  // Handle planet selection
  const handlePlanetClick = (planetId: string) => {
    setSelectedPlanet(planetId);
  };

  const handleBackToSystem = () => {
    setSelectedPlanet(null);
  };

  const selectedPlanetData = planetData.find((p: PlanetData) => p.id === selectedPlanet);

  return (
    <>
      <group ref={groupRef} position={[0, 0, -20]}>
        {/* Central orb representing "you" */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#4a9eff" 
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbital planets */}
        {planetData.map((planet: PlanetData, index: number) => (
          <Planet
            key={planet.id}
            {...planet}
            index={index}
            isSelected={selectedPlanet === planet.id}
            isHovered={hoveredPlanet === planet.id}
            onClick={() => handlePlanetClick(planet.id)}
            onHover={(id: string) => setHoveredPlanet(id)}
            onUnhover={() => setHoveredPlanet(null)}
          />
        ))}

        {/* Orbital paths */}
        {planetData.map((planet: PlanetData) => (
          <mesh key={`orbit-${planet.id}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.orbitRadius - 0.1, planet.orbitRadius + 0.1, 64]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Particle effects between planets */}
        <points>
          <sphereGeometry args={[0.02, 8, 8]} />
          <pointsMaterial
            color="#ffffff"
            size={0.05}
            transparent
            opacity={0.6}
          />
        </points>
      </group>

      {/* Camera controller for smooth transitions */}
      <CameraController
        selectedPlanet={selectedPlanet}
        planetData={planetData}
        onBack={handleBackToSystem}
      />

      {/* Content panel for selected planet */}
      {selectedPlanetData && (
        <ContentPanel
          planet={selectedPlanetData}
          isVisible={true}
          onBack={handleBackToSystem}
        />
      )}

      {/* Subtle orbit controls when no planet is selected */}
      {!selectedPlanet && (
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={15}
          maxDistance={40}
          maxPolarAngle={Math.PI * 0.8}
          minPolarAngle={Math.PI * 0.2}
        />
      )}
    </>
  );
};

export default AboutSystem;
