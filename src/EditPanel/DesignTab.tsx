import React from 'react';
import { FiDroplet, FiLayers } from 'react-icons/fi';

interface Props {
  foreground: string;
  setForeground: (color: string) => void;
  useGradient: boolean;
  setUseGradient: (value: boolean) => void;
  startColor: string;
  setStartColor: (color: string) => void;
  endColor: string;
  setEndColor: (color: string) => void;
  angle: number;
  setAngle: (angle: number) => void;
  gradientType: string;
  setGradientType: (value: string) => void;
  solidColor: string;
  setSolidColor: (value: string) => void;
  lightTheme?: boolean;
}

const predefinedGradients = [
  { label: 'Sunset', value: 'linear-gradient(90deg, #ff7e5f, #feb47b)' },
  { label: 'Ocean', value: 'linear-gradient(90deg, #00c6ff, #0072ff)' },
  { label: 'Purple', value: 'linear-gradient(90deg, #8e2de2, #4a00e0)' },
  { label: 'Green', value: 'linear-gradient(90deg, #56ab2f, #a8e063)' },
  { label: 'Custom', value: 'custom' },
];

const DesignTab: React.FC<Props> = ({
  foreground,
  setForeground,
  useGradient,
  setUseGradient,
  startColor,
  setStartColor,
  endColor,
  setEndColor,
  angle,
  setAngle,
  gradientType,
  setGradientType,
  solidColor,
  setSolidColor,
  lightTheme = true,
}) => {
  const isCustom = gradientType === 'custom';

  return (
    <div
      className={`w-full px-4 py-3 rounded-lg shadow-sm flex flex-wrap gap-6 text-sm transition-all duration-200 border
        ${lightTheme ? 'bg-white text-black border-gray-300' : 'bg-gray-800 text-white border-gray-700'}`}
    >
      {/* Foreground */}
      <div className="flex flex-col items-start gap-1">
        <div className={`flex items-center gap-2 ${lightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
          <FiDroplet size={16} />
          <span className="font-medium">Foreground</span>
        </div>
        <input
          type="color"
          value={foreground}
          onChange={(e) => setForeground(e.target.value)}
          className="w-8 h-8 rounded border shadow-sm cursor-pointer"
        />
      </div>

      {/* Background */}
      <div
        className={`flex flex-col items-start gap-2 border-l pl-4 min-w-[240px]
          ${lightTheme ? 'border-gray-300' : 'border-gray-600'}`}
      >
        <div className="flex items-center justify-between w-full">
          <div className={`flex items-center gap-2 ${lightTheme ? 'text-gray-700' : 'text-gray-300'}`}>
            <FiLayers size={16} />
            <span className="font-medium">Background</span>
          </div>
          <label className={`flex items-center gap-1 text-xs ${lightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
            <input
              type="checkbox"
              checked={useGradient}
              onChange={(e) => setUseGradient(e.target.checked)}
              className="cursor-pointer"
            />
            Use Gradient
          </label>
        </div>

        {useGradient ? (
          <>
            <div className="flex gap-2 flex-wrap max-w-[220px]">
              {predefinedGradients.map((preset, idx) => (
                <div
                  key={idx}
                  className={`w-5 h-5 rounded cursor-pointer border-2 transition-all duration-150 ${
                    gradientType === preset.value && !isCustom
                      ? 'border-blue-600'
                      : lightTheme
                        ? 'border-gray-200'
                        : 'border-gray-600'
                  }`}
                  style={{
                    background:
                      preset.value === 'custom'
                        ? `linear-gradient(${angle}deg, ${startColor}, ${endColor})`
                        : preset.value,
                  }}
                  title={preset.label}
                  onClick={() => setGradientType(preset.value)}
                />
              ))}
            </div>

            {isCustom && (
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={startColor}
                    onChange={(e) => setStartColor(e.target.value)}
                    className="w-6 h-6 rounded border cursor-pointer"
                    title="Start"
                  />
                  <input
                    type="color"
                    value={endColor}
                    onChange={(e) => setEndColor(e.target.value)}
                    className="w-6 h-6 rounded border cursor-pointer"
                    title="End"
                  />
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={angle}
                    onChange={(e) => setAngle(parseInt(e.target.value))}
                    className="w-28 h-2"
                    title="Angle"
                  />
                  <span className={`text-xs ${lightTheme ? 'text-gray-600' : 'text-gray-400'}`}>
                    {angle}°
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="mt-2">
            <input
              type="color"
              value={solidColor}
              onChange={(e) => setSolidColor(e.target.value)}
              className="w-8 h-8 rounded border shadow-sm cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignTab;
