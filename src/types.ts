
export interface ShapeState {
  id: string;
  title:string;
  type: string;
  width: number;
  height: number;
  x: number;
  y: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeStyle?: 'solid' | 'dashed' | 'dotted';
  rotation?: number;
  opacity?: number;
  transition?: string;
  borderRadius?: number;
  boxShadow?: string;
  zIndex?: number;
  pointerEvents?: 'auto' | 'none';
  fontSize?: number;
  fontColor?: string;
  fontWeight?: 'normal' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  fontFamily?: string;
  textShadow?: string;
}


export type AppState = {
  shapeStates: ShapeState[];
  canvasWidth: number;
  canvasHeight: number;
  foreground: string;
  background: string;
  stroke: string;
};
