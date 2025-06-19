import React, { useState } from 'react';
import HomeTab from './HomeTab';
import DesignTab from './DesignTab';
import SettingsTab from '../components/SettingsTab';
import { ShapeState } from '../types';

interface Props {
  canvasWidth: number;
  canvasHeight: number;
  setCanvasWidth: (width: number) => void;
  setCanvasHeight: (height: number) => void;
  onToggleShapeBox: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClearAll: () => void;
  hasUndo: boolean;
  hasRedo: boolean;
  shapes: ShapeState[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeState[]>>;
  onImportShapes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  foreground: string;
  background: string;
  stroke: string;
  setForeground: (color: string) => void;
  setBackground: (color: string) => void;
  setStroke: (color: string) => void;
  onCopy: () => void;
  onExport: () => void;
  onPaste: () => void;

  // New
  showGrid: boolean;
  toggleGrid: () => void;
  lightTheme: boolean;
  toggleTheme: () => void;
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
  setSolidColor: (color: string) => void;
}

const EditPanel: React.FC<Props> = ({
  canvasWidth,
  canvasHeight,
  setCanvasWidth,
  setCanvasHeight,
  onToggleShapeBox,
  onUndo,
  onRedo,
  onClearAll,
  hasUndo,
  hasRedo,
  shapes,
  onImportShapes,
  foreground,
  background,
  stroke,
  setForeground,
  onCopy,
  onPaste,
  onExport,
  showGrid,
  toggleGrid,
  lightTheme,
  toggleTheme,
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
}) => {
  const [activeTab, setActiveTab] = useState<'Home' | 'Design' | 'Settings'>('Home');

  return (
    <div className={`p-2 ${lightTheme ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      <div className="w-full bg-white shadow rounded-md overflow-hidden">
        {/* Tab Header */}
        <div className="flex border-b border-gray-300 bg-gray-100">
          {['Home', 'Design', 'Settings'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-500 bg-white'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
              onClick={() => setActiveTab(tab as 'Home' | 'Design' | 'Settings')}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="px-4 py-6 bg-gray-50">
          {activeTab === 'Home' && (
            <HomeTab
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              setCanvasWidth={setCanvasWidth}
              setCanvasHeight={setCanvasHeight}
              onToggleShapeBox={onToggleShapeBox}
              onUndo={onUndo}
              onRedo={onRedo}
              onClearAll={onClearAll}
              hasUndo={hasUndo}
              hasRedo={hasRedo}
              shapes={shapes}
              onImportShapes={onImportShapes}
              foreground={foreground}
              background={background}
              stroke={stroke}
              onCopy={onCopy}
              onPaste={onPaste}
              onExport={onExport}
            />
          )}

          {activeTab === 'Design' && (
            <DesignTab
              foreground={foreground}
              setForeground={setForeground}
              useGradient={useGradient}
              setUseGradient={setUseGradient}
              startColor={startColor}
              setStartColor={setStartColor}
              endColor={endColor}
              setEndColor={setEndColor}
              angle={angle}
              setAngle={setAngle}
              gradientType={gradientType}
              setGradientType={setGradientType}
              solidColor={solidColor}
              setSolidColor={setSolidColor}
            />
          )}

          {activeTab === 'Settings' && (
            <SettingsTab
              showGrid={showGrid}
              toggleGrid={toggleGrid}
              lightTheme={lightTheme}
              toggleTheme={toggleTheme}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
