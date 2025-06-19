import React, { useEffect, useRef, useState } from 'react';
import { FiPlusCircle, FiUpload, FiDownload } from 'react-icons/fi';
import { Undo2, Redo2, Trash2, ImageDown, Copy, ClipboardPaste } from 'lucide-react';
import { ShapeState } from '../types';
import html2canvas from 'html2canvas';

interface Props {
  canvasWidth: number;
  canvasHeight: number;
  setCanvasWidth: (width: number) => void;
  setCanvasHeight: (height: number) => void;
  onToggleShapeBox: () => void;
  shapes: ShapeState[];
  onUndo: () => void;
  onRedo: () => void;
  onClearAll: () => void;
  hasUndo: boolean;
  hasRedo: boolean;
  foreground: string;
  background: string;
  stroke: string;
  onCopy: () => void;
  onPaste: () => void;
  onImportShapes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void; 
}

const HomeTab: React.FC<Props> = ({
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
  onImportShapes,
  onCopy,
  onPaste,
  onExport, // ✅ USE IT HERE
}) => {
  const [widthInput, setWidthInput] = useState(canvasWidth.toString());
  const [heightInput, setHeightInput] = useState(canvasHeight.toString());
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setWidthInput(canvasWidth.toString());
    setHeightInput(canvasHeight.toString());
  }, [canvasWidth, canvasHeight]);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setWidthInput(val);
    const parsed = parseInt(val);
    if (!isNaN(parsed)) setCanvasWidth(parsed);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHeightInput(val);
    const parsed = parseInt(val);
    if (!isNaN(parsed)) setCanvasHeight(parsed);
  };

  const handleSaveAsPNG = async () => {
    const canvasElement = document.getElementById('canvas-area');
    if (!canvasElement) return;
    const canvas = await html2canvas(canvasElement);
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'layout.png';
    link.click();
  };

  return (
    <div className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm flex flex-wrap md:flex-nowrap items-start gap-6 text-sm transition-all duration-200">
      {/* Insert Shape */}
      <div className="flex flex-col items-start space-y-1 min-w-[120px]">
        <span className="text-xs font-semibold text-gray-600 uppercase">Insert</span>
        <button
          onClick={onToggleShapeBox}
          className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-all duration-150"
          title="Insert new shape"
        >
          <FiPlusCircle size={16} /> Insert
        </button>
      </div>

      {/* History */}
      <div className="flex flex-col items-start space-y-1 min-w-[220px] border-l pl-4 border-gray-200">
        <span className="text-xs font-semibold text-gray-600 uppercase">History</span>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onUndo}
            disabled={!hasUndo}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md shadow-sm border transition-all duration-150 ${
              hasUndo
                ? 'bg-white hover:bg-gray-100 text-gray-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Undo2 size={14} /> Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!hasRedo}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md shadow-sm border transition-all duration-150 ${
              hasRedo
                ? 'bg-white hover:bg-gray-100 text-gray-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Redo2 size={14} /> Redo
          </button>
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 px-3 py-1.5 text-red-600 border border-red-400 bg-white hover:bg-red-100 rounded-md shadow-sm"
          >
            <Trash2 size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Clipboard */}
      <div className="flex flex-col items-start space-y-1 min-w-[160px] border-l pl-4 border-gray-200">
        <span className="text-xs font-semibold text-gray-600 uppercase">Clipboard</span>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onCopy}
            title="Copy"
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-md shadow-sm"
          >
            <Copy size={16} />
            <span className="hidden md:inline">Copy</span>
          </button>
          <button
            onClick={onPaste}
            title="Paste"
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-800 text-white rounded-md shadow-sm"
          >
            <ClipboardPaste size={16} />
            <span className="hidden md:inline">Paste</span>
          </button>
        </div>
      </div>

      {/* Canvas Size */}
      <div className="flex flex-col items-start space-y-1 min-w-[200px] border-l pl-4 border-gray-200">
        <span className="text-xs font-semibold text-gray-600 uppercase">Canvas Size</span>
        <div className="flex gap-2">
          <label className="flex items-center gap-1 text-gray-700">
            W:
            <input
              type="number"
              min={1}
              value={widthInput}
              onChange={handleWidthChange}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </label>
          <label className="flex items-center gap-1 text-gray-700">
            H:
            <input
              type="number"
              min={1}
              value={heightInput}
              onChange={handleHeightChange}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </label>
        </div>
      </div>

      {/* Export / Import */}
      <div className="flex flex-col items-start space-y-1 min-w-[260px] border-l pl-4 border-gray-200">
        <span className="text-xs font-semibold text-gray-600 uppercase">Export / Import</span>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onExport}
            className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-sm"
          >
            <FiUpload size={14} /> Export
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-md shadow-sm"
          >
            <FiDownload size={14} /> Import
          </button>
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={onImportShapes}
            className="hidden"
          />

          <button
            onClick={handleSaveAsPNG}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm"
          >
            <ImageDown size={14} /> PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
