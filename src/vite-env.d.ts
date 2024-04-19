/// <reference types="vite/client" />

interface Point {
  x: number;
  y: number;
  name: string;
  multi?: boolean;
  start?: boolean;
  position?: string;
  end?: boolean;
}

interface LineSegment {
  color: string;
  line: number;
  points: Point[];
}

interface MetroLineMapProps {
  data: LineSegment[];
  width: number;
  height: number;
}
