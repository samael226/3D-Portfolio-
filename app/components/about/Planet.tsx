'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from './planetData';

interface PlanetProps extends PlanetData {
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (id: string) => void;
  onUnhover: () => void;
}

const Planet: React.FC<PlanetProps> = ({
  id,
  name,
  orbitRadius,
  planetRadius,
  color,
  emissiveColor,
  orbitSpeed,
  isSelected,
  isHovered,
  onClick,
  onHover,
  onUnhover
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [angle, setAngle] = useState(Math.random() * Math.PI * 2);

  // Orbital motion
  useFrame(() => {
    if (groupRef.current) {
      setAngle(prev => prev + orbitSpeed);
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      groupRef.current.position.set(x, 0, z);
    }

    // Hover/selection effects
    if (meshRef.current) {
      const scale = isHovered ? 1.2 : isSelected ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      
      // Rotation when hovered
      if (isHovered) {
        meshRef.current.rotation.y += 0.02;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => onHover(id)}
        onPointerOut={onUnhover}
      >
        <sphereGeometry args={[planetRadius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={isHovered ? 0.5 : isSelected ? 0.4 : 0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Planet label */}
      <Text
        position={[0, planetRadius + 1, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>

      {/* Glow effect when selected */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[planetRadius + 0.3, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Particle trail when orbiting */}
      {isHovered && (
        <points position={[0, 0, 0]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <pointsMaterial
            color={color}
            size={0.1}
            transparent
            opacity={0.6}
          />
        </points>
      )}
    </group>
  );
};

export default Planet;
