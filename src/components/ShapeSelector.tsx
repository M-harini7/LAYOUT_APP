import React from 'react';

interface Props {
  onSelectShape: (shape: string) => void;
  lightTheme?: boolean;
}

const ShapeSelector: React.FC<Props> = ({ onSelectShape, lightTheme = true }) => {
  const gray = lightTheme ? '#4B5563' : '#D1D5DB'; // Adjust icon fill color based on theme

  const shapes = [
    {
      name: 'Rectangle',
      icon: <svg width="28" height="28" viewBox="0 0 100 100"><rect x="10" y="30" width="80" height="40" fill={gray} /></svg>,
    },
    {
      name: 'Square',
      icon: <svg width="28" height="28" viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" fill={gray} /></svg>,
    },
    {
      name: 'Circle',
      icon: <svg width="28" height="28" viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill={gray} /></svg>,
    },
    {
      name: 'Ellipse',
      icon: <svg width="28" height="28" viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="40" ry="25" fill={gray} /></svg>,
    },
    {
      name: 'Triangle',
      icon: <svg width="28" height="28" viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" fill={gray} /></svg>,
    },
    {
      name: 'Diamond',
      icon: <svg width="28" height="28" viewBox="0 0 100 100"><polygon points="50,10 90,50 50,90 10,50" fill={gray} /></svg>,
    },
    {
      name: 'Pentagon',
      icon: <svg width="28" height="28" viewBox="0 0 100 100"><polygon points="50,10 90,40 72,90 28,90 10,40" fill={gray} /></svg>,
    },
    {
      name: 'Hexagon',
      icon: <svg width="28" height="28" viewBox="0 0 100 100"><polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill={gray} /></svg>,
    },
  ];

  return (
    <div
      className={`grid grid-cols-4 gap-2 p-3 rounded-md border shadow-md w-max transition-all duration-200 ${
        lightTheme ? 'bg-white border-gray-200 text-gray-800' : 'bg-gray-800 border-gray-700 text-gray-100'
      }`}
    >
      {shapes.map((shape) => (
        <button
          key={shape.name}
          title={shape.name}
          onClick={() => onSelectShape(shape.name)}
          className={`flex flex-col items-center justify-center p-2 rounded-md border transition-all duration-150 transform hover:scale-105 cursor-pointer ${
            lightTheme
              ? 'hover:bg-gray-100 hover:border-gray-300'
              : 'hover:bg-gray-700 hover:border-gray-600'
          }`}
        >
          {shape.icon}
          <span className="text-xs mt-1">{shape.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ShapeSelector;
