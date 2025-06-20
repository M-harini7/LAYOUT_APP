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
  lightTheme: boolean;
}

const ShapeEdit: React.FC<Props> = ({ shape, onUpdate, onClose, lightTheme }) => {
  const originalShapeRef = useRef<ShapeState>(shape);
  const isInternalUpdate = useRef(false);

  // Utility to wrap setters to track user-initiated changes
  const wrapSetter = <T,>(setter: React.Dispatch<React.SetStateAction<T>>) => (val: T) => {
    isInternalUpdate.current = true;
    setter(val);
  };

  // Shape states
  const [title, setTitle] = useState('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [fill, setFill] = useState('#ffffff');
  const [stroke, setStroke] = useState('#cccccc');
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [strokeStyle, setStrokeStyle] = useState<'solid' | 'dashed' | 'dotted'>('solid');
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [transition, setTransition] = useState('');
  const [borderRadius, setBorderRadius] = useState(0);
  const [zIndex, setZIndex] = useState(1);

  const [boxShadowX, setBoxShadowX] = useState(0);
  const [boxShadowY, setBoxShadowY] = useState(0);
  const [boxShadowBlur, setBoxShadowBlur] = useState(0);
  const [boxShadowSpread, setBoxShadowSpread] = useState(0);
  const [boxShadowColor, setBoxShadowColor] = useState('#000000');
  const [boxShadow, setBoxShadow] = useState('');

  const [fontSize, setFontSize] = useState(14);
  const [fontColor, setFontColor] = useState('#000000');
  const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
  const [fontFamily, setFontFamily] = useState('Arial');

  const [textShadowX, setTextShadowX] = useState(0);
  const [textShadowY, setTextShadowY] = useState(0);
  const [textShadowBlur, setTextShadowBlur] = useState(0);
  const [textShadowColor, setTextShadowColor] = useState('#000000');
  const [textShadow, setTextShadow] = useState('');

  const handleReset = () => {
    const original = originalShapeRef.current;
  
    isInternalUpdate.current = false; // we'll call onUpdate manually instead
  
    // Reset state
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
    setFontSize(original.fontSize ?? 14);
    setFontColor(original.fontColor ?? '#000000');
    setFontWeight(original.fontWeight ?? 'normal');
    setFontFamily(original.fontFamily ?? 'Arial');
  
    const box = original.boxShadow ?? '0px 0px 0px 0px #000000';
    const boxMatch = box.match(/(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(\d+)px\s+(#[0-9a-fA-F]{6})/);
    const [bx, by, blur, spread, color] = boxMatch ? boxMatch.slice(1) : ['0', '0', '0', '0', '#000000'];
    const boxShadow = `${bx}px ${by}px ${blur}px ${spread}px ${color}`;
    setBoxShadowX(parseInt(bx));
    setBoxShadowY(parseInt(by));
    setBoxShadowBlur(parseInt(blur));
    setBoxShadowSpread(parseInt(spread));
    setBoxShadowColor(color);
    setBoxShadow(boxShadow);
  
    const text = original.textShadow ?? '0px 0px 0px #000000';
    const textMatch = text.match(/(-?\d+)px\s+(-?\d+)px\s+(\d+)px\s+(#[0-9a-fA-F]{6})/);
    const [tx, ty, tBlur, tColor] = textMatch ? textMatch.slice(1) : ['0', '0', '0', '#000000'];
    const textShadow = `${tx}px ${ty}px ${tBlur}px ${tColor}`;
    setTextShadowX(parseInt(tx));
    setTextShadowY(parseInt(ty));
    setTextShadowBlur(parseInt(tBlur));
    setTextShadowColor(tColor);
    setTextShadow(textShadow);
  
    // 🔄 Immediately update parent
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
      fontSize: original.fontSize ?? 14,
      fontColor: original.fontColor ?? '#000000',
      fontWeight: original.fontWeight ?? 'normal',
      fontFamily: original.fontFamily ?? 'Arial',
      boxShadow,
      textShadow,
    });
  };
  
  

  useEffect(() => {
    const box = `${boxShadowX}px ${boxShadowY}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor}`;
    setBoxShadow(box);
  }, [boxShadowX, boxShadowY, boxShadowBlur, boxShadowSpread, boxShadowColor]);

  useEffect(() => {
    const text = `${textShadowX}px ${textShadowY}px ${textShadowBlur}px ${textShadowColor}`;
    setTextShadow(text);
  }, [textShadowX, textShadowY, textShadowBlur, textShadowColor]);

  useEffect(() => {
    if (isInternalUpdate.current) {
      onUpdate({
        title, width, height, x, y, fill, stroke,
        strokeWidth, strokeStyle, rotation, opacity,
        transition, borderRadius, boxShadow, zIndex,
        fontSize, fontColor, fontWeight, fontFamily, textShadow,
      });
      isInternalUpdate.current = false;
    }
  }, [
    title, width, height, x, y, fill, stroke,
    strokeWidth, strokeStyle, rotation, opacity,
    transition, borderRadius, boxShadow, zIndex,
    fontSize, fontColor, fontWeight, fontFamily, textShadow,
  ]);

  useEffect(() => {
    if (!originalShapeRef.current) {
      originalShapeRef.current = shape;
    }

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
  }, [shape]);

  return (
    <div className={`w-80 p-4 fixed right-0 top-0 h-full z-50 overflow-y-auto text-sm rounded-l-2xl border-l shadow-lg
      ${lightTheme ? 'bg-white text-gray-800 border-gray-200' : 'bg-gray-900 text-gray-100 border-gray-700'}`}>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-base font-semibold flex items-center gap-2 ${lightTheme ? 'text-gray-800' : 'text-gray-100'}`}>
          <FiSliders className="text-blue-500" /> Edit Shape
        </h2>
        <div className="flex gap-3">
          <button onClick={handleReset} title="Reset to original"
            className={`transition ${lightTheme ? 'text-gray-500 hover:text-blue-600' : 'text-gray-400 hover:text-blue-400'}`}>
            <FiRefreshCw size={16} />
          </button>
          <button onClick={onClose} title="Close"
            className={`transition ${lightTheme ? 'text-gray-400 hover:text-red-500' : 'text-gray-500 hover:text-red-400'}`}>
            <FiX size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {[
          {
            icon: <FiType />,
            title: 'Title',
            content: <TextInput label="Shape Title" value={title} onChange={wrapSetter(setTitle)} lightTheme={lightTheme} />,
          },
          {
            icon: <FiType className="text-purple-600" />,
            title: 'Title Styling',
            content: (
              <>
                <NumberInput label="Font Size" value={fontSize} onChange={wrapSetter(setFontSize)} lightTheme={lightTheme} />
                <ColorInput label="Font Color" value={fontColor} onChange={wrapSetter(setFontColor)} lightTheme={lightTheme} />
                <SelectInput label="Font Weight" value={fontWeight} options={['normal', 'bold']} onChange={wrapSetter(setFontWeight)} lightTheme={lightTheme} />
                <SelectInput label="Font Family" value={fontFamily} options={['Arial', 'Georgia', 'Courier New', 'Times New Roman']} onChange={wrapSetter(setFontFamily)} lightTheme={lightTheme} />
              </>
            ),
          },
          {
            icon: <FiLayout />,
            title: 'Text Shadow',
            content: (
              <>
                <NumberInput label="X Offset" value={textShadowX} onChange={wrapSetter(setTextShadowX)} lightTheme={lightTheme} />
                <NumberInput label="Y Offset" value={textShadowY} onChange={wrapSetter(setTextShadowY)} lightTheme={lightTheme} />
                <NumberInput label="Blur Radius" value={textShadowBlur} onChange={wrapSetter(setTextShadowBlur)} lightTheme={lightTheme} />
                <ColorInput label="Shadow Color" value={textShadowColor} onChange={wrapSetter(setTextShadowColor)} lightTheme={lightTheme} />
              </>
            ),
          },
          {
            icon: <FiMove />,
            title: 'Size & Position',
            content: (
              <>
                <NumberInput label="Width" value={width} onChange={wrapSetter(setWidth)} lightTheme={lightTheme} />
                <NumberInput label="Height" value={height} onChange={wrapSetter(setHeight)} lightTheme={lightTheme} />
                <NumberInput label="X" value={x} onChange={wrapSetter(setX)} lightTheme={lightTheme} />
                <NumberInput label="Y" value={y} onChange={wrapSetter(setY)} lightTheme={lightTheme} />
              </>
            ),
          },
          {
            icon: <FiDroplet />,
            title: 'Color & Stroke',
            content: (
              <>
                <ColorInput label="Fill" value={fill} onChange={wrapSetter(setFill)} lightTheme={lightTheme} />
                <ColorInput label="Stroke" value={stroke} onChange={wrapSetter(setStroke)} lightTheme={lightTheme} />
                <NumberInput label="Stroke Width" value={strokeWidth} onChange={wrapSetter(setStrokeWidth)} lightTheme={lightTheme} />
                <SelectInput label="Stroke Style" value={strokeStyle} options={['solid', 'dashed', 'dotted']} onChange={wrapSetter(setStrokeStyle)} lightTheme={lightTheme} />
              </>
            ),
          },
          {
            icon: <FiSliders className="text-green-600" />,
            title: 'Effects',
            content: (
              <>
                <NumberInput label="Rotation (°)" value={rotation} onChange={wrapSetter(setRotation)} lightTheme={lightTheme} />
                <RangeInput label="Opacity" value={opacity} onChange={wrapSetter(setOpacity)} step={0.05} min={0} max={1} lightTheme={lightTheme} />
              </>
            ),
          },
          {
            icon: <FiLayout />,
            title: 'Box Shadow',
            content: (
              <>
                <NumberInput label="X Offset" value={boxShadowX} onChange={wrapSetter(setBoxShadowX)} lightTheme={lightTheme} />
                <NumberInput label="Y Offset" value={boxShadowY} onChange={wrapSetter(setBoxShadowY)} lightTheme={lightTheme} />
                <NumberInput label="Blur Radius" value={boxShadowBlur} onChange={wrapSetter(setBoxShadowBlur)} lightTheme={lightTheme} />
                <NumberInput label="Spread Radius" value={boxShadowSpread} onChange={wrapSetter(setBoxShadowSpread)} lightTheme={lightTheme} />
                <ColorInput label="Shadow Color" value={boxShadowColor} onChange={wrapSetter(setBoxShadowColor)} lightTheme={lightTheme} />
              </>
            ),
          },
          {
            icon: <FiLayout />,
            title: 'More Features',
            content: (
              <>
                <NumberInput label="Border Radius" value={borderRadius} onChange={wrapSetter(setBorderRadius)} lightTheme={lightTheme} />
                <NumberInput label="Z-Index" value={zIndex} onChange={wrapSetter(setZIndex)} lightTheme={lightTheme} />
              </>
            ),
          },
        ].map(({ icon, title, content }, index) => (
          <section key={index}>
            <h3 className={`flex items-center gap-2 text-xs font-bold mb-2 uppercase ${lightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
              {icon} {title}
            </h3>
            <div className={`grid grid-cols-2 gap-2 p-2 rounded-md ${lightTheme ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
              {content}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ShapeEdit;
