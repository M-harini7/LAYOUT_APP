import React, { useRef, useEffect, useState } from 'react';
import EditPanel from './EditPanel/EditPanel';
import VisualPanel from './components/VisualPanel';
import SizeDisplay from './components/SizeDisplay';
import ShapeSelector from './components/ShapeSelector';
import ShapeEdit from './components/ShapeEdit';
import { ShapeState, AppState } from './types';

const App: React.FC = () => {
  const [canvasWidth, setCanvasWidth] = useState<number>(1200);
  const [canvasHeight, setCanvasHeight] = useState<number>(600);
  const [showShapes, setShowShapes] = useState<boolean>(false);

  const [foreground, setForeground] = useState<string>('#000000');
  const [stroke, setStroke] = useState<string>('#cccccc');

  const [shapeStates, setShapeStates] = useState<ShapeState[]>([]);
  const [history, setHistory] = useState<AppState[]>([]);
  const [future, setFuture] = useState<AppState[]>([]);

  const shapeBoxRef = useRef<HTMLDivElement>(null);
  const [clipboard, setClipboard] = useState<ShapeState[] | null>(null);
  const [selectedShapeIds, setSelectedShapeIds] = useState<string[]>([]);
  const [editingShapeIndex, setEditingShapeIndex] = useState<number | null>(null);

  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [lightTheme, setLightTheme] = useState<boolean>(true);

  const [useGradient, setUseGradient] = useState(false);
  const [startColor, setStartColor] = useState('#ffffff');
  const [endColor, setEndColor] = useState('#ffffff');
  const [angle, setAngle] = useState(90);
  const [gradientType, setGradientType] = useState('linear-gradient(90deg, #ff7e5f, #feb47b)');
  const [solidColor, setSolidColor] = useState('#ffffff');

  // 👇 derived background string
  const computedBackground = useGradient
    ? gradientType === 'custom'
      ? `linear-gradient(${angle}deg, ${startColor}, ${endColor})`
      : gradientType
    : solidColor;

  const getCurrentState = (): AppState => ({
    shapeStates,
    canvasWidth,
    canvasHeight,
    foreground,
    background: computedBackground,
    stroke,
  });

  useEffect(() => {
    document.body.classList.toggle('light', lightTheme);
    document.body.classList.toggle('dark', !lightTheme);
  }, [lightTheme]);

  const applyState = (state: AppState) => {
    setShapeStates(state.shapeStates);
    setCanvasWidth(state.canvasWidth);
    setCanvasHeight(state.canvasHeight);
    setForeground(state.foreground);
    setStroke(state.stroke);
  };

  const pushToHistory = (newState: Partial<AppState>) => {
    const current = getCurrentState();
    const merged: AppState = { ...current, ...newState };

    if (JSON.stringify(current) === JSON.stringify(merged)) return;

    setHistory((prev) => [...prev, current]);
    setFuture([]);
    applyState(merged);
  };

  const toggleGrid = () => setShowGrid((prev) => !prev);
  const toggleTheme = () => setLightTheme((prev) => !prev);

  const handleInsertShape = (shape: string) => {
    const newShape: ShapeState = {
      id: crypto.randomUUID(),
      type: shape,
      width: 250,
      height: 250,
      x: 50 + shapeStates.length * 30,
      y: 50 + shapeStates.length * 30,
      title: `${shape} ${shapeStates.length + 1}`,
    };
    pushToHistory({ shapeStates: [...shapeStates, newShape] });
    setShowShapes(false);
  };

  const handleEditShape = (index: number) => setEditingShapeIndex(index);

  const handleDeleteShape = (index: number) => {
    const updated = [...shapeStates];
    updated.splice(index, 1);
    pushToHistory({ shapeStates: updated });
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setFuture((f) => [getCurrentState(), ...f]);
    applyState(prev);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setHistory((h) => [...h, getCurrentState()]);
    applyState(next);
  };

  const handleClearAll = () => {
    if (shapeStates.length > 0) {
      pushToHistory({ shapeStates: [] });
    }
  };

  const handleCopy = () => {
    if (selectedShapeIds.length === 0) return alert('❌ No shape selected to copy.');
    const selectedShapes = shapeStates.filter((s) => selectedShapeIds.includes(s.id));
    setClipboard(JSON.parse(JSON.stringify(selectedShapes)));
  };

  const handlePaste = () => {
    if (!clipboard || clipboard.length === 0) return alert('📋 Clipboard is empty.');
    const newShapes = clipboard.map((s) => ({
      ...s,
      id: crypto.randomUUID(),
      x: s.x + 20,
      y: s.y + 20,
    }));
    pushToHistory({ shapeStates: [...shapeStates, ...newShapes] });
    setSelectedShapeIds([]);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
  
        const validatedShapes: ShapeState[] = (imported.shapes ?? []).map((shape: any, index: number) => ({
          id: shape.id ?? crypto.randomUUID(),
          title: shape.title ?? `Shape ${index + 1}`,
          type: shape.type ?? 'rectangle',
          width: shape.width ?? 100,
          height: shape.height ?? 100,
          x: shape.x ?? 50 + index * 30,
          y: shape.y ?? 50 + index * 30,
          fill: shape.fill ?? '#ffffff',
          stroke: shape.stroke ?? '#000000',
          strokeWidth: shape.strokeWidth ?? 1,
          rotation: shape.rotation ?? 0,
          opacity: shape.opacity ?? 1,
          transition: shape.transition ?? '',
          borderRadius: shape.borderRadius ?? 0,
          boxShadow: shape.boxShadow ?? '',
          text: shape.text ?? '',
          fontSize: shape.fontSize ?? 16,
          fontWeight: shape.fontWeight ?? 'normal',
          fontFamily: shape.fontFamily ?? 'Arial',
          textShadow: shape.textShadow ?? '',
          fontColor: shape.fontColor ?? '#000000',
          zIndex: shape.zIndex ?? 1,
        }));
  
        const design = imported.design ?? {};
        setShowGrid(design.showGrid ?? false);
        setLightTheme(design.lightTheme ?? true);
        setUseGradient(design.useGradient ?? false);
        setStartColor(design.startColor ?? '#ffffff');
        setEndColor(design.endColor ?? '#ffffff');
        setAngle(design.angle ?? 90);
        setGradientType(design.gradientType ?? 'linear-gradient(90deg, #ff7e5f, #feb47b)');
        setSolidColor(design.solidColor ?? '#ffffff');
  
        const newState: Partial<AppState> = {
          shapeStates: validatedShapes,
          canvasWidth: imported.canvas?.width ?? 800,
          canvasHeight: imported.canvas?.height ?? 600,
          foreground: design.foreground ?? '#000000',
          stroke: design.stroke ?? '#cccccc',
        };
  
        pushToHistory(newState);
      } catch (error) {
        alert('❌ Invalid JSON file.');
      }
    };
  
    reader.readAsText(file);
  };
  

  const handleExport = () => {
    const data = {
      canvas: {
        width: canvasWidth,
        height: canvasHeight,
      },
      design: {
        foreground,
        background: computedBackground,
        stroke,
        showGrid,
        lightTheme,
        useGradient,
        startColor,
        endColor,
        angle,
        gradientType,
        solidColor,
      },
      shapes: shapeStates.map((shape) => ({
        id: shape.id,
        title: shape.title,
        type: shape.type,
        width: shape.width,
        height: shape.height,
        x: shape.x,
        y: shape.y,
        fill: shape.fill ?? '#ffffff',
        stroke: shape.stroke ?? '#000000',
        strokeWidth: shape.strokeWidth ?? 1,
        rotation: shape.rotation ?? 0,
        opacity: shape.opacity ?? 1,
        transition: shape.transition ?? '',
        borderRadius: shape.borderRadius ?? 0,
        boxShadow: shape.boxShadow ?? '',
        text: shape.title ?? '',
        fontSize: shape.fontSize ?? 16,
        fontWeight: shape.fontWeight ?? 'normal',
        fontFamily: shape.fontFamily ?? 'Arial',
        textShadow: shape.textShadow ?? '',
        fontColor: shape.fontColor ?? '#000000',
        zIndex: shape.zIndex ?? 1,
      })),
    };
  
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'layout.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shapeBoxRef.current && !shapeBoxRef.current.contains(event.target as Node)) {
        setShowShapes(false);
      }
    };
    if (showShapes) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShapes]);

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col">
        <EditPanel
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          setCanvasWidth={(w) => pushToHistory({ canvasWidth: w })}
          setCanvasHeight={(h) => pushToHistory({ canvasHeight: h })}
          onToggleShapeBox={() => setShowShapes(!showShapes)}
          foreground={foreground}
          background={computedBackground}
          stroke={stroke}
          setForeground={(f) => pushToHistory({ foreground: f })}
          setBackground={() => {}} // no longer used directly
          setStroke={(s) => pushToHistory({ stroke: s })}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClearAll={handleClearAll}
          hasUndo={history.length > 0}
          hasRedo={future.length > 0}
          shapes={shapeStates}
          setShapes={(s) =>
            typeof s === 'function'
              ? pushToHistory({ shapeStates: s(shapeStates) })
              : pushToHistory({ shapeStates: [...s] })
          }
          onImportShapes={handleImport}
          onExport={handleExport}
          onCopy={handleCopy}
          onPaste={handlePaste}
          showGrid={showGrid}
          toggleGrid={toggleGrid}
          lightTheme={lightTheme}
          toggleTheme={toggleTheme}
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
            selectedShapeIds={selectedShapeIds}
  clipboard={clipboard ?? []}
        />

        {showShapes && (
          <div ref={shapeBoxRef} className="absolute top-32 left-8 z-10">
            <ShapeSelector onSelectShape={handleInsertShape} />
          </div>
        )}

        <div className={`flex-1 overflow-auto p-4 ${lightTheme ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}>
          <VisualPanel
            width={canvasWidth}
            height={canvasHeight}
            shapeStates={shapeStates}
            setShapeStates={(s) =>
              typeof s === 'function'
                ? pushToHistory({ shapeStates: s(shapeStates) })
                : pushToHistory({ shapeStates: [...s] })
            }
            handleEditShape={handleEditShape}
            handleDeleteShape={handleDeleteShape}
            foregroundColor={foreground}
            backgroundColor={computedBackground}
            strokeColor={stroke}
            selectedShapeIds={selectedShapeIds}
            setSelectedShapeIds={setSelectedShapeIds}
            showGrid={showGrid}
            lightTheme={lightTheme}
          />
        </div>

        <SizeDisplay width={canvasWidth} height={canvasHeight} />
      </div>

      {editingShapeIndex !== null && shapeStates[editingShapeIndex] && (
        <ShapeEdit
        shape={shapeStates[editingShapeIndex]}
        onUpdate={(updatedFields) => {
          const updated = [...shapeStates];
          updated[editingShapeIndex] = {
            ...updated[editingShapeIndex],
            ...updatedFields,
          };
          pushToHistory({ shapeStates: updated }); // ✅ ensure history + update
        }}
        onClose={() => setEditingShapeIndex(null)}
        lightTheme={lightTheme}
      />         
      
      )}
    </div>
  );
};

export default App;
