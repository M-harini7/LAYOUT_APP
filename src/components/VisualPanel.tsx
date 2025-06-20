import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Rnd } from 'react-rnd';
import { ShapeState } from '../types';

interface Props {
  width: number;
  height: number;
  shapeStates: ShapeState[];
  setShapeStates: React.Dispatch<React.SetStateAction<ShapeState[]>>;
  handleEditShape: (index: number) => void;
  handleDeleteShape: (index: number) => void;
  backgroundColor: string;
  foregroundColor: string;
  strokeColor: string;
  selectedShapeIds: string[];
  showGrid: boolean;
  lightTheme: boolean;
  setSelectedShapeIds: React.Dispatch<React.SetStateAction<string[]>>;
}

// ✅ Utility: Get corners after rotation
function getRotatedCorners(x: number, y: number, width: number, height: number, rotation: number) {
  const rad = (rotation * Math.PI) / 180;
  const cx = x + width / 2;
  const cy = y + height / 2;

  const corners = [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height },
  ];

  return corners.map(({ x: px, y: py }) => {
    const dx = px - cx;
    const dy = py - cy;
    return {
      x: cx + dx * Math.cos(rad) - dy * Math.sin(rad),
      y: cy + dx * Math.sin(rad) + dy * Math.cos(rad),
    };
  });
}

// ✅ Utility: Check if all corners are inside canvas
function isInsideCanvas(corners: { x: number; y: number }[], canvasWidth: number, canvasHeight: number) {
  return corners.every(({ x, y }) => x >= 0 && x <= canvasWidth && y >= 0 && y <= canvasHeight);
}

const VisualPanel: React.FC<Props> = ({
  width,
  height,
  shapeStates,
  setShapeStates,
  handleEditShape,
  handleDeleteShape,
  backgroundColor,
  foregroundColor,
  selectedShapeIds,
  setSelectedShapeIds,
  showGrid,
  lightTheme
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getShapeElement = (shape: string, shapeState: ShapeState) => {
    const {
      fill = '#ffffff',
      stroke = '#cccccc',
      strokeWidth = 1,
      strokeStyle = 'solid',
    } = shapeState;

    const strokeDasharray =
      strokeStyle === 'dashed' ? '6,4' : strokeStyle === 'dotted' ? '2,2' : '0';

    switch (shape) {
      case 'Rectangle':
        return (
          <svg viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
            <rect x="0" y="0" width="100" height="50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} />
          </svg>
        );
      case 'Square':
      case 'Circle':
      case 'Ellipse':
      case 'Triangle':
      case 'Diamond':
      case 'Pentagon':
      case 'Hexagon':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {
              {
                Square: <rect x="0" y="0" width="100" height="100" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} rx={shapeState.borderRadius ?? 0} ry={shapeState.borderRadius ?? 0} />,
                Circle: <circle cx="50" cy="50" r="45" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} />,
                Ellipse: <ellipse cx="50" cy="50" rx="45" ry="30" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} />,
                Triangle: <polygon points="50,10 90,90 10,90" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} />,
                Diamond: <polygon points="50,5 95,50 50,95 5,50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} />,
                Pentagon: <polygon points="50,5 95,35 78,90 22,90 5,35" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} />,
                Hexagon: <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} />,
              }[shape]
            }
          </svg>
        );
      default:
        return <span className="text-sm text-gray-600">No Shape</span>;
    }
  };

  const updateShapePositionSize = (index: number, newState: Partial<ShapeState>) => {
    setShapeStates(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...newState };
      return updated;
    });
  };
  

  return (
    <div
      id="canvas-area"
      className="mx-auto border border-gray-300 relative shadow"
      style={{
        width,
        height,
        backgroundColor: backgroundColor?.startsWith('linear-gradient') ? undefined : backgroundColor,
        backgroundImage: backgroundColor?.startsWith('linear-gradient')
          ? showGrid
            ? `
              repeating-linear-gradient(to right, #e5e7eb 0 1px, transparent 1px 20px),
              repeating-linear-gradient(to bottom, #e5e7eb 0 1px, transparent 1px 20px),
              ${backgroundColor}`
            : backgroundColor
          : showGrid
            ? `
              repeating-linear-gradient(to right, #e5e7eb 0 1px, transparent 1px 20px),
              repeating-linear-gradient(to bottom, #e5e7eb 0 1px, transparent 1px 20px)`
            : 'none',
        backgroundRepeat: 'repeat',
        backgroundPosition: '0 0',
        overflow: 'hidden',
      }}
      onClick={() => setSelectedShapeIds([])}
    >
      {shapeStates.length === 0 && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg"
          style={{ color: foregroundColor }}
        >
          Click "Insert" to add shapes
        </div>
      )}

      {shapeStates.map((shapeState, index) => (
        <Rnd
          key={shapeState.id}
          size={{ width: shapeState.width, height: shapeState.height }}
          position={{ x: shapeState.x, y: shapeState.y }}
          bounds="parent"
          onDragStop={(_, d) => {
            const { width: w, height: h, rotation = 0 } = shapeState;
            const corners = getRotatedCorners(d.x, d.y, w, h, rotation);
            if (isInsideCanvas(corners, width, height)) {
              updateShapePositionSize(index, { x: d.x, y: d.y });
            }
          }}
          onResizeStop={(_, __, ref, ___, pos) => {
            const newWidth = parseInt(ref.style.width, 10);
            const newHeight = parseInt(ref.style.height, 10);
            const { rotation = 0 } = shapeState;
            const corners = getRotatedCorners(pos.x, pos.y, newWidth, newHeight, rotation);
            if (isInsideCanvas(corners, width, height)) {
              updateShapePositionSize(index, {
                width: newWidth,
                height: newHeight,
                x: pos.x,
                y: pos.y,
              });
            }
          }}
          onDrag={(_, d) => {
            const { width: w, height: h, rotation = 0 } = shapeState;
            const corners = getRotatedCorners(d.x, d.y, w, h, rotation);
            if (isInsideCanvas(corners, width, height)) {
              updateShapePositionSize(index, { x: d.x, y: d.y });
            }
          }}
          
          
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={(e: any) => {
            e.stopPropagation();
            setSelectedShapeIds((prev) =>
              prev.includes(shapeState.id)
                ? prev.filter((id) => id !== shapeState.id)
                : [...prev, shapeState.id]
            );
          }}
          className="group absolute"
          style={{
            zIndex: hoveredIndex === index ? 999 : shapeState.zIndex ?? index + 1,
            cursor: 'move',
          }}
        >
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              transform: `rotate(${shapeState.rotation ?? 0}deg)`,
              transformOrigin: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                opacity: shapeState.opacity ?? 1,
                boxShadow: shapeState.boxShadow || 'none',
                borderRadius: shapeState.borderRadius ? `${shapeState.borderRadius}px` : '0',
                pointerEvents: 'auto',
                position: 'relative',
              }}
            >
              {/* Shape */}
              {getShapeElement(shapeState.type, shapeState)}

              {/* Title Text */}
              {shapeState.title && (
                <div
                  className="absolute inset-0 flex items-center justify-center text-center break-words px-1"
                  style={{
                    color: shapeState.fontColor ?? '#000',
                    fontSize: shapeState.fontSize ?? 14,
                    fontWeight: shapeState.fontWeight ?? 'normal',
                    fontFamily: shapeState.fontFamily ?? 'Arial',
                    textAlign: shapeState.textAlign ?? 'center',
                    textShadow: shapeState.textShadow ?? '',
                    whiteSpace: 'pre-wrap',
                    pointerEvents: 'none',
                  }}
                >
                  {shapeState.title}
                </div>
              )}

              {/* Selection Border */}
              <div
                className={`absolute inset-0 border-2 rounded pointer-events-none ${
                  selectedShapeIds.includes(shapeState.id)
                    ? 'border-blue-600'
                    : 'border-transparent'
                }`}
              />

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none" />

              {/* Edit Button */}
              {/* Edit Button */}
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => handleEditShape(index)}
                className={`absolute top-2 right-10 p-1 border rounded-full transition opacity-0 group-hover:opacity-100 ${
                  lightTheme
                    ? 'bg-white border-gray-300 hover:bg-gray-200 text-gray-700'
                    : 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white'
                }`}
              >
                <FiEdit />
              </button>

              {/* Delete Button */}
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => handleDeleteShape(index)}
                className={`absolute top-2 right-2 p-1 border rounded-full transition opacity-0 group-hover:opacity-100 ${
                  lightTheme
                    ? 'bg-white border-gray-300 hover:bg-red-100 text-red-600'
                    : 'bg-gray-700 border-gray-600 hover:bg-red-800 text-red-400'
                }`}
              >
                <FiTrash2 />
              </button>

            </div>
          </div>
        </Rnd>
      ))}
    </div>
  );
};

export default VisualPanel;
