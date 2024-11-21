import { Rotate3D, RotateCcw, ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { useStore } from '../store';

interface SliceControlProps {
  axis: 'x' | 'y' | 'z';
  layer: number;
  label: string;
}

function SliceControl({ axis, layer, label }: SliceControlProps) {
  const rotateSlice = useStore((state) => state.rotateSlice);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex gap-2">
        <button
          onClick={() => rotateSlice(axis, layer, false)}
          className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 transition-colors"
          title={`Rotate ${label} counter-clockwise`}
        >
          <ArrowLeftCircle className="w-5 h-5 text-indigo-600" />
        </button>
        <button
          onClick={() => rotateSlice(axis, layer, true)}
          className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 transition-colors"
          title={`Rotate ${label} clockwise`}
        >
          <ArrowRightCircle className="w-5 h-5 text-indigo-600" />
        </button>
      </div>
    </div>
  );
}

export function Controls() {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-3 gap-6">
        <SliceControl axis="x" layer={-1} label="Left Face" />
        <SliceControl axis="x" layer={0} label="Middle X" />
        <SliceControl axis="x" layer={1} label="Right Face" />
        
        <SliceControl axis="y" layer={-1} label="Bottom Face" />
        <SliceControl axis="y" layer={0} label="Middle Y" />
        <SliceControl axis="y" layer={1} label="Top Face" />
        
        <SliceControl axis="z" layer={-1} label="Back Face" />
        <SliceControl axis="z" layer={0} label="Middle Z" />
        <SliceControl axis="z" layer={1} label="Front Face" />
      </div>
    </div>
  );
}