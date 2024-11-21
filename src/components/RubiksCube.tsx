import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Cubie } from './Cubie';
import { useStore } from '../store';

export function RubiksCube() {
  const ref = useRef<Group>(null);
  const cubies = useStore((state) => state.cubies);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {cubies.map((cubie, index) => (
        <Cubie 
          key={index}
          position={cubie.position}
          colors={cubie.colors}
        />
      ))}
    </group>
  );
}