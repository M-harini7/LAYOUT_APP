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
    <div className="p-4 text-sm text-gray-800 bg-white rounded-lg border shadow-sm w-max">
      <div className="flex items-center gap-6">
        {/* Grid Toggle */}
        <div className="flex items-center gap-2">
          <FiGrid size={16} className="text-gray-600" />
          <span className="text-sm">Grid</span>
          <div
            onClick={toggleGrid}
            className={`w-11 h-5 flex items-center rounded-full px-0.5 cursor-pointer transition ${
              showGrid ? 'bg-green-400' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                showGrid ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <FiSun size={16} className="text-gray-600" />
          <span className="text-sm">Theme</span>
          <div
            onClick={toggleTheme}
            className={`w-11 h-5 flex items-center rounded-full px-0.5 cursor-pointer transition ${
              lightTheme ? 'bg-yellow-400' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                lightTheme ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
