import React, { useState, useEffect, useRef } from 'react';
import { ShapeState } from '../types';
import {
  FiX, FiMove, FiDroplet, FiSliders, FiRefreshCw, FiLayout, FiType
} from 'react-icons/fi';

import {
  NumberInput,
  TextInput,
  SelectInput,
  RangeInput,
  ColorInput,
} from './FormInputs';

interface Props {
  shape: ShapeState;
  onUpdate: (updated: Partial<ShapeState>) => void;
  onClose: () => void;
}

const ShapeEdit: React.FC<Props> = ({ shape, onUpdate, onClose }) => {
  const originalShapeRef = useRef<ShapeState>(shape);

  const [title, setTitle] = useState(shape.title ?? '');
  const [width, setWidth] = useState(shape.width);
  const [height, setHeight] = useState(shape.height);
  const [x, setX] = useState(shape.x);
  const [y, setY] = useState(shape.y);
  const [fill, setFill] = useState(shape.fill ?? '#ffffff');
  const [stroke, setStroke] = useState(shape.stroke ?? '#cccccc');
  const [strokeWidth, setStrokeWidth] = useState(shape.strokeWidth ?? 1);
  const [strokeStyle, setStrokeStyle] = useState<'solid' | 'dashed' | 'dotted'>(shape.strokeStyle ?? 'solid');
  const [rotation, setRotation] = useState(shape.rotation ?? 0);
  const [opacity, setOpacity] = useState(shape.opacity ?? 1);
  const [transition, setTransition] = useState(shape.transition ?? '');
  const [borderRadius, setBorderRadius] = useState(shape.borderRadius ?? 0);
  const [zIndex, setZIndex] = useState(shape.zIndex ?? 1);
  const [boxShadowX, setBoxShadowX] = useState(0);
  const [boxShadowY, setBoxShadowY] = useState(0);
  const [boxShadowBlur, setBoxShadowBlur] = useState(0);
  const [boxShadowSpread, setBoxShadowSpread] = useState(0);
  const [boxShadowColor, setBoxShadowColor] = useState('#000000');
  const [boxShadow, setBoxShadow] = useState('');
  const [fontSize, setFontSize] = useState(shape.fontSize ?? 14);
  const [fontColor, setFontColor] = useState(shape.fontColor ?? '#000000');
  const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>(shape.fontWeight ?? 'normal')
  const [fontFamily, setFontFamily] = useState(shape.fontFamily ?? 'Arial');
  const [textShadowX, setTextShadowX] = useState(0);
  const [textShadowY, setTextShadowY] = useState(0);
  const [textShadowBlur, setTextShadowBlur] = useState(0);
  const [textShadowColor, setTextShadowColor] = useState('#000000');
  const [textShadow, setTextShadow] = useState('');

  const handleReset = () => {
    const original = originalShapeRef.current;
  
    // Basic fields
    setTitle(original.title ?? '');
    setWidth(original.width);
    setHeight(original.height);
    setX(original.x);
    setY(original.y);
    setFill(original.fill ?? '#ffffff');
    setStroke(original.stroke ?? '#cccccc');
    setStrokeWidth(original.strokeWidth ?? 1);
    setStrokeStyle(original.strokeStyle ?? 'solid');
    setRotation(original.rotation ?? 0);
    setOpacity(original.opacity ?? 1);
    setTransition(original.transition ?? '');
    setBorderRadius(original.borderRadius ?? 0);
    setZIndex(original.zIndex ?? 1);
  
    // Font properties
    setFontSize(original.fontSize ?? 14);
    setFontColor(original.fontColor ?? '#000000');
    setFontWeight(original.fontWeight ?? 'normal');
    setFontFamily(original.fontFamily ?? 'Arial');
  
    // Box shadow (parse original or fallback)
    const box = original.boxShadow ?? '0px 0px 0px 0px #000000';
    const boxMatch = box.match(/(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(\d+)px\s+(#[0-9a-fA-F]{6})/);
    const [bx, by, blur, spread, color] = boxMatch ? boxMatch.slice(1) : ['0', '0', '0', '0', '#000000'];
  
    const boxShadowString = `${bx}px ${by}px ${blur}px ${spread}px ${color}`;
    setBoxShadowX(parseInt(bx));
    setBoxShadowY(parseInt(by));
    setBoxShadowBlur(parseInt(blur));
    setBoxShadowSpread(parseInt(spread));
    setBoxShadowColor(color);
    setBoxShadow(boxShadowString);
  
    // Text shadow (parse original or fallback)
    const text = original.textShadow ?? '0px 0px 0px #000000';
    const textMatch = text.match(/(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(#[0-9a-fA-F]{6})/);
    const [tx, ty, tBlur, tColor] = textMatch ? textMatch.slice(1) : ['0', '0', '0', '#000000'];
  
    const textShadowString = `${tx}px ${ty}px ${tBlur}px ${tColor}`;
    setTextShadowX(parseInt(tx));
    setTextShadowY(parseInt(ty));
    setTextShadowBlur(parseInt(tBlur));
    setTextShadowColor(tColor);
    setTextShadow(textShadowString);
  
    // Immediately propagate reset values to visual panel
    onUpdate({
      title: original.title ?? '',
      width: original.width,
      height: original.height,
      x: original.x,
      y: original.y,
      fill: original.fill ?? '#ffffff',
      stroke: original.stroke ?? '#cccccc',
      strokeWidth: original.strokeWidth ?? 1,
      strokeStyle: original.strokeStyle ?? 'solid',
      rotation: original.rotation ?? 0,
      opacity: original.opacity ?? 1,
      transition: original.transition ?? '',
      borderRadius: original.borderRadius ?? 0,
      zIndex: original.zIndex ?? 1,
      boxShadow: boxShadowString,
      fontSize: original.fontSize ?? 14,
      fontColor: original.fontColor ?? '#000000',
      fontWeight: original.fontWeight ?? 'normal',
      fontFamily: original.fontFamily ?? 'Arial',
      textShadow: textShadowString,
    });
  };
  

  useEffect(() => {
    const shadow = `${boxShadowX}px ${boxShadowY}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor}`;
    setBoxShadow(shadow);
  }, [boxShadowX, boxShadowY, boxShadowBlur, boxShadowSpread, boxShadowColor]);
  useEffect(() => {
    const tShadow = `${textShadowX}px ${textShadowY}px ${textShadowBlur}px ${textShadowColor}`;
    setTextShadow(tShadow);
  }, [textShadowX, textShadowY, textShadowBlur, textShadowColor]);

  useEffect(() => {
    onUpdate({
      title,
      width,
      height,
      x,
      y,
      fill,
      stroke,
      strokeWidth,
      strokeStyle,
      rotation,
      opacity,
      transition,
      borderRadius,
      boxShadow,
      zIndex,
      fontSize,
      fontColor,
      fontWeight,
      fontFamily,
      textShadow,
    });
  }, [
    title,
    width,
    height,
    x,
    y,
    fill,
    stroke,
    strokeWidth,
    strokeStyle,
    rotation,
    opacity,
    transition,
    borderRadius,
    boxShadow,
    zIndex,
    fontSize,
    fontColor,
    fontWeight,
    fontFamily,
    textShadow,
  ]);

  useEffect(() => {
    if (originalShapeRef.current.id !== shape.id) {
      originalShapeRef.current = shape;
    
    setTitle(shape.title ?? '');
    setWidth(shape.width);
    setHeight(shape.height);
    setX(shape.x);
    setY(shape.y);
    setFill(shape.fill ?? '#ffffff');
    setStroke(shape.stroke ?? '#cccccc');
    setStrokeWidth(shape.strokeWidth ?? 1);
    setStrokeStyle(shape.strokeStyle ?? 'solid');
    setRotation(shape.rotation ?? 0);
    setOpacity(shape.opacity ?? 1);
    setTransition(shape.transition ?? '');
    setBorderRadius(shape.borderRadius ?? 0);
    setZIndex(shape.zIndex ?? 1);
    setFontSize(shape.fontSize ?? 14);
    setFontColor(shape.fontColor ?? '#000000');
    setFontWeight(shape.fontWeight ?? 'normal');
    setFontFamily(shape.fontFamily ?? 'Arial');
  
    // ✅ Fix: Set original shape only when shape ID changes
    originalShapeRef.current = shape;
  
    // Optional: Reset box shadow and text shadow too
    const box = shape.boxShadow ?? '0px 0px 0px 0px #000000';
    const boxMatch = box.match(/(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(\d+)px\s+(#[0-9a-fA-F]{6})/);
    const [bx, by, blur, spread, color] = boxMatch ? boxMatch.slice(1) : ['0', '0', '0', '0', '#000000'];
    setBoxShadowX(parseInt(bx));
    setBoxShadowY(parseInt(by));
    setBoxShadowBlur(parseInt(blur));
    setBoxShadowSpread(parseInt(spread));
    setBoxShadowColor(color);
  
    const text = shape.textShadow ?? '0px 0px 0px #000000';
    const textMatch = text.match(/(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(#[0-9a-fA-F]{6})/);
    const [tx, ty, tBlur, tColor] = textMatch ? textMatch.slice(1) : ['0', '0', '0', '#000000'];
    setTextShadowX(parseInt(tx));
    setTextShadowY(parseInt(ty));
    setTextShadowBlur(parseInt(tBlur));
    setTextShadowColor(tColor);
    }
  }, [shape.id]); // ✅ Only runs when shape ID changes
  
  

  return (
    <div className="w-80 p-4 bg-white border-l border-gray-200 shadow-lg fixed right-0 top-0 h-full z-50 overflow-y-auto text-sm rounded-l-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <FiSliders className="text-blue-500" /> Edit Shape
        </h2>
        <div className="flex gap-3">
          <button onClick={handleReset} title="Reset to original" className="text-gray-500 hover:text-blue-600 transition">
            <FiRefreshCw size={16} />
          </button>
          <button onClick={onClose} title="Close" className="text-gray-400 hover:text-red-500 transition">
            <FiX size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <section>
          <h3 className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-2 uppercase">
            <FiType /> Title
          </h3>
          <div className="bg-gray-50 p-2 rounded-md">
            <TextInput label="Shape Title" value={title} onChange={setTitle} />
          </div>
        </section>

        {/* Title Styling */}
        <section>
          <h3 className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-2 uppercase">
            <FiType className="text-purple-600" /> Title Styling
          </h3>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-md">
            <NumberInput label="Font Size" value={fontSize} onChange={setFontSize} />
            <ColorInput label="Font Color" value={fontColor} onChange={setFontColor} />
            <SelectInput label="Font Weight" value={fontWeight} options={['normal', 'bold']} onChange={setFontWeight} />
            <SelectInput label="Font Family" value={fontFamily} options={['Arial', 'Georgia', 'Courier New', 'Times New Roman']} onChange={setFontFamily} />
          </div>
        </section>

        {/* Text Shadow */}
        <section>
          <h3 className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-2 uppercase">
            <FiLayout /> Text Shadow
          </h3>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-md">
            <NumberInput label="X Offset" value={textShadowX} onChange={setTextShadowX} />
            <NumberInput label="Y Offset" value={textShadowY} onChange={setTextShadowY} />
            <NumberInput label="Blur Radius" value={textShadowBlur} onChange={setTextShadowBlur} />
            <ColorInput label="Shadow Color" value={textShadowColor} onChange={setTextShadowColor} />
          </div>
        </section>

        {/* Size & Position */}
        <section>
          <h3 className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-2 uppercase">
            <FiMove /> Size & Position
          </h3>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-md">
            <NumberInput label="Width" value={width} onChange={setWidth} />
            <NumberInput label="Height" value={height} onChange={setHeight} />
            <NumberInput label="X" value={x} onChange={setX} />
            <NumberInput label="Y" value={y} onChange={setY} />
          </div>
        </section>

        {/* Color & Stroke */}
        <section>
          <h3 className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-2 uppercase">
            <FiDroplet /> Color & Stroke
          </h3>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-md">
            <ColorInput label="Fill" value={fill} onChange={setFill} />
            <ColorInput label="Stroke" value={stroke} onChange={setStroke} />
            <NumberInput label="Stroke Width" value={strokeWidth} onChange={setStrokeWidth} />
            <SelectInput
              label="Stroke Style"
              value={strokeStyle}
              options={['solid', 'dashed', 'dotted']}
              onChange={setStrokeStyle}
            />
          </div>
        </section>

        {/* Effects */}
        <section>
          <h3 className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-2 uppercase">
            <FiSliders className="text-green-600" /> Effects
          </h3>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-md">
            <NumberInput label="Rotation (°)" value={rotation} onChange={setRotation} />
            <RangeInput label="Opacity" value={opacity} onChange={setOpacity} step={0.05} min={0} max={1} />
          </div>
        </section>

        {/* Box Shadow */}
        <section>
          <h3 className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-2 uppercase">
            <FiLayout /> Box Shadow
          </h3>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-md">
            <NumberInput label="X Offset" value={boxShadowX} onChange={setBoxShadowX} />
            <NumberInput label="Y Offset" value={boxShadowY} onChange={setBoxShadowY} />
            <NumberInput label="Blur Radius" value={boxShadowBlur} onChange={setBoxShadowBlur} />
            <NumberInput label="Spread Radius" value={boxShadowSpread} onChange={setBoxShadowSpread} />
            <ColorInput label="Shadow Color" value={boxShadowColor} onChange={setBoxShadowColor} />
          </div>
        </section>

        {/* More Features */}
        <section>
          <h3 className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-2 uppercase">
            <FiLayout /> More Features
          </h3>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-md">
            <NumberInput label="Border Radius" value={borderRadius} onChange={setBorderRadius} />
            <NumberInput label="Z-Index" value={zIndex} onChange={setZIndex} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShapeEdit;
