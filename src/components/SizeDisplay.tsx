import React from 'react';

interface Props {
  width: number;
  height: number;
}

const SizeDisplay: React.FC<Props> = ({ width, height }) => {
  return (
    <div className="text-center py-2 bg-gray-900 text-white text-sm font-mono">
      Canvas Size: {width}px × {height}px
    </div>
  );
};

export default SizeDisplay;
