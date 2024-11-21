import { create } from 'zustand';
import { Matrix4, Quaternion, Vector3 } from 'three';

interface CubieState {
  position: [number, number, number];
  rotation: [number, number, number];
  colors: string[];
}

interface CubeState {
  cubies: CubieState[];
  isAnimating: boolean;
  rotateSlice: (axis: 'x' | 'y' | 'z', layer: number, clockwise: boolean) => void;
}

const COLORS = {
  front: '#ff0000',  // Red
  back: '#ff8c00',   // Orange
  top: '#ffffff',    // White
  bottom: '#ffff00', // Yellow
  right: '#00ff00',  // Green
  left: '#0000ff',   // Blue
  inner: '#1a1a1a',  // Dark gray
};

const getInitialColors = (x: number, y: number, z: number): string[] => [
  x === 1 ? COLORS.right : x === -1 ? COLORS.left : COLORS.inner,
  y === 1 ? COLORS.top : y === -1 ? COLORS.bottom : COLORS.inner,
  z === 1 ? COLORS.front : z === -1 ? COLORS.back : COLORS.inner,
];

const rotatePosition = (position: [number, number, number], axis: 'x' | 'y' | 'z', clockwise: boolean): [number, number, number] => {
  const matrix = new Matrix4();
  const quaternion = new Quaternion();
  const angle = (Math.PI / 2) * (clockwise ? 1 : -1);
  
  switch (axis) {
    case 'x': quaternion.setFromAxisAngle(new Vector3(1, 0, 0), angle); break;
    case 'y': quaternion.setFromAxisAngle(new Vector3(0, 1, 0), angle); break;
    case 'z': quaternion.setFromAxisAngle(new Vector3(0, 0, 1), angle); break;
  }
  
  matrix.makeRotationFromQuaternion(quaternion);
  const vector = new Vector3(...position);
  vector.applyMatrix4(matrix);
  
  return [
    Math.round(vector.x),
    Math.round(vector.y),
    Math.round(vector.z)
  ];
};

const rotateColors = (colors: string[], axis: 'x' | 'y' | 'z', clockwise: boolean): string[] => {
  const newColors = [...colors];
  const rotationMap = {
    x: [1, 2, 4, 5],  // left/right rotation
    y: [0, 2, 3, 5],  // top/bottom rotation
    z: [0, 1, 3, 4],  // front/back rotation
  };
  
  const indices = rotationMap[axis];
  if (clockwise) {
    const temp = newColors[indices[0]];
    newColors[indices[0]] = newColors[indices[3]];
    newColors[indices[3]] = newColors[indices[2]];
    newColors[indices[2]] = newColors[indices[1]];
    newColors[indices[1]] = temp;
  } else {
    const temp = newColors[indices[0]];
    newColors[indices[0]] = newColors[indices[1]];
    newColors[indices[1]] = newColors[indices[2]];
    newColors[indices[2]] = newColors[indices[3]];
    newColors[indices[3]] = temp;
  }
  
  return newColors;
};

// Initialize cubies
const initialCubies: CubieState[] = [];
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      initialCubies.push({
        position: [x, y, z],
        rotation: [0, 0, 0],
        colors: getInitialColors(x, y, z),
      });
    }
  }
}

export const useStore = create<CubeState>((set) => ({
  cubies: initialCubies,
  isAnimating: false,
  rotateSlice: (axis, layer, clockwise) => {
    set((state) => {
      const newCubies = state.cubies.map((cubie) => {
        const [x, y, z] = cubie.position;
        const layerCoord = axis === 'x' ? x : axis === 'y' ? y : z;
        
        if (layerCoord === layer) {
          const newPosition = rotatePosition(cubie.position, axis, clockwise);
          const newColors = rotateColors(cubie.colors, axis, clockwise);
          
          return {
            ...cubie,
            position: newPosition,
            colors: newColors,
          };
        }
        return cubie;
      });
      
      return { cubies: newCubies };
    });
  },
}));