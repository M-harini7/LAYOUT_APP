import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

interface Panel {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export default function LayoutDesigner() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [roundedCorners, setRoundedCorners] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [selectedPanel, setSelectedPanel] = useState<number | null>(null);
  const [editingPanel, setEditingPanel] = useState<number | null>(null);
  const [newWidth, setNewWidth] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [moveMode, setMoveMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control') setIsCtrlPressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') setIsCtrlPressed(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const addPanel = () => {
    const id = Date.now();
    const panel: Panel = {
      id,
      x: 50,
      y: 50,
      width: 120,
      height: 120,
      zIndex: panels.length + 1
    };
    setPanels([...panels, panel]);
  };

  const removePanel = (id: number) => {
    setPanels(panels.filter(p => p.id !== id));
    if (selectedPanel === id) setSelectedPanel(null);
  };

  const handleDragStop = (id: number, _e: any, data: any) => {
    setPanels(panels.map(p => (p.id === id ? { ...p, x: data.x, y: data.y } : p)));
  };

  const toggleMoveMode = () => setMoveMode(!moveMode);

  const handleDimensionClick = (panel: Panel) => {
    setEditingPanel(panel.id);
    setNewWidth(String(panel.width));
    setNewHeight(String(panel.height));
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      const updated = panels.map(p =>
        p.id === id
          ? { ...p, width: parseInt(newWidth), height: parseInt(newHeight) }
          : p
      );
      setPanels(updated);
      setEditingPanel(null);
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <button onClick={addPanel} className="px-3 py-1 rounded bg-green-600 text-white">Add Panel</button>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-3 py-1 rounded bg-indigo-600 text-white">Toggle Theme</button>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={roundedCorners} onChange={() => setRoundedCorners(!roundedCorners)} />
            Rounded Corners
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showGrid} onChange={() => setShowGrid(!showGrid)} />
            Show Grid
          </label>
        </div>

        <div className="relative border-2 border-dashed border-gray-400 min-h-[500px] bg-gray-100 dark:bg-gray-800">
          {showGrid && (
            <div className="absolute inset-0 bg-[radial-gradient(circle,_1px,_transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
          )}
          {panels.map(panel => (
            <Draggable
              key={panel.id}
              position={{ x: panel.x, y: panel.y }}
              onStop={(e, data) => handleDragStop(panel.id, e, data)}
              bounds="parent"
              disabled={!isCtrlPressed && !moveMode}
            >
              <div
                className="absolute"
                style={{ zIndex: panel.zIndex }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPanel(panel.id);
                }}
              >
                <div
                  className={`group relative p-1 ${roundedCorners ? 'rounded-lg' : ''} ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} shadow-md`}
                  style={{ width: panel.width, height: panel.height }}
                >
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => removePanel(panel.id)} className="text-red-600 hover:text-red-800">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-1 left-1 text-xs opacity-0 group-hover:opacity-100">
                    {editingPanel === panel.id ? (
                      <div className="flex gap-1 items-center">
                        <input
                          type="number"
                          value={newWidth}
                          onChange={(e) => setNewWidth(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, panel.id)}
                          className="w-12 px-1 text-xs border rounded"
                        />
                        ×
                        <input
                          type="number"
                          value={newHeight}
                          onChange={(e) => setNewHeight(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, panel.id)}
                          className="w-12 px-1 text-xs border rounded"
                        />
                      </div>
                    ) : (
                      <span onClick={() => handleDimensionClick(panel)}>
                        {panel.width}×{panel.height}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
}
