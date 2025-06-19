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
            <rect x="0" y="0" width="100" height="50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
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
                Square: <rect x="0" y="0" width="100" height="100" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} rx={shapeState.borderRadius ?? 0} ry={shapeState.borderRadius ?? 0}/>,
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
    const updated = [...shapeStates];
    updated[index] = { ...updated[index], ...newState };
    setShapeStates(updated);
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
              ${backgroundColor}
              `
            : backgroundColor
          : showGrid
            ? `
              repeating-linear-gradient(to right, #e5e7eb 0 1px, transparent 1px 20px),
              repeating-linear-gradient(to bottom, #e5e7eb 0 1px, transparent 1px 20px)
              `
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
          onDragStop={(_, d) => updateShapePositionSize(index, { x: d.x, y: d.y })}
          onResizeStop={(_, __, ref, ___, pos) =>
            updateShapePositionSize(index, {
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
              x: pos.x,
              y: pos.y,
            })
          }
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
                transition: shapeState.transition || 'transform 0.1s ease-in-out',
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
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => handleEditShape(index)}
                className="absolute top-2 right-10 p-1 bg-white border border-gray-300 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition"
              >
                <FiEdit />
              </button>

              {/* Delete Button */}
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => handleDeleteShape(index)}
                className="absolute top-2 right-2 p-1 bg-white border border-gray-300 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition"
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
