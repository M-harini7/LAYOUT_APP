import React from 'react';
import { FiGrid, FiSun } from 'react-icons/fi';

interface Props {
  showGrid: boolean;
  toggleGrid: () => void;
  lightTheme: boolean;
  toggleTheme: () => void;
}

const SettingsTab: React.FC<Props> = ({
  showGrid,
  toggleGrid,
  lightTheme,
  toggleTheme,
}) => {
  return (
    <div
      className={`p-4 text-sm rounded-lg w-max border shadow-sm transition-all duration-200
        ${lightTheme ? 'bg-white text-gray-800 border-gray-300' : 'bg-gray-800 text-white border-gray-700'}`}
    >
      <div className="flex items-center gap-6">
        {/* Grid Toggle */}
        <div className="flex items-center gap-2">
          <FiGrid size={16} className={lightTheme ? 'text-gray-600' : 'text-gray-300'} />
          <span className="text-sm">Grid</span>
          <div
            onClick={toggleGrid}
            className={`w-11 h-5 flex items-center rounded-full px-0.5 cursor-pointer transition 
              ${showGrid ? 'bg-green-400' : lightTheme ? 'bg-gray-300' : 'bg-gray-600'}`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transform transition 
                ${showGrid ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <FiSun size={16} className={lightTheme ? 'text-gray-600' : 'text-gray-300'} />
          <span className="text-sm">Theme</span>
          <div
            onClick={toggleTheme}
            className={`w-11 h-5 flex items-center rounded-full px-0.5 cursor-pointer transition 
              ${lightTheme ? 'bg-yellow-400' : 'bg-gray-500'}`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transform transition 
                ${lightTheme ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
