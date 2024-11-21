import { useRef } from 'react';
import { Mesh } from 'three';

interface CubieProps {
  position: [number, number, number];
  colors: string[];
}

export function Cubie({ position, colors }: CubieProps) {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh 
      ref={meshRef} 
      position={position}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      {colors.map((color, index) => (
        <meshStandardMaterial 
          key={index} 
          attach={`material-${index}`} 
          color={color}
          roughness={0.3}
          metalness={0.3}
        />
      ))}
    </mesh>
  );
}