'use client';

import { useEffect } from 'react';
import { Text } from '@react-three/drei';
import { PlanetData } from './planetData';

interface ContentPanelProps {
  planet: PlanetData;
  isVisible: boolean;
  onBack: () => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({
  planet,
  isVisible,
  onBack
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onBack, isVisible]);

  if (!isVisible) return null;

  return (
    <group position={[0, 0, 2]}>
      {/* Click outside area */}
      <mesh position={[0, 0, -1]} onClick={onBack}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Background panel */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial
          color="#0a0a0a"
          transparent
          opacity={0.8}
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>

      {/* Border glow */}
      <mesh position={[0, 0, -0.6]}>
        <planeGeometry args={[8.2, 6.2]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Content text */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.8}
        color={planet.color}
        anchorX="center"
        anchorY="middle"
      >
        {planet.content.title}
      </Text>

      <Text
        position={[0, 0.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={7}
      >
        {planet.content.description}
      </Text>

      {/* Details list */}
      {planet.content.details.map((detail, index) => (
        <Text
          key={index}
          position={[0, -0.2 - (index * 0.5), 0]}
          fontSize={0.3}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
          maxWidth={7}
        >
          {detail}
        </Text>
      ))}

      {/* Back button hint */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.3}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        Press ESC or click outside to go back
      </Text>
    </group>
  );
};

export default ContentPanel;
