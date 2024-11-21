import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RubiksCube } from './components/RubiksCube';
import { Controls } from './components/Controls';

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        className="w-full h-full"
        shadows
      >
        <color attach="background" args={['#1a1a1a']} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <RubiksCube />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
      <Controls />
    </div>
  );
}

export default App;