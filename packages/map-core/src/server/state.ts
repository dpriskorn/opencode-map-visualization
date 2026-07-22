export interface MapView {
  center: [number, number];
  zoom: number;
  bounds: [[number, number], [number, number]];
}

export interface MarkerOptions {
  openPopup?: boolean;
  draggable?: boolean;
}

export interface PolygonOptions {
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  weight?: number;
  fitBounds?: boolean;
}

export interface LineOptions {
  color?: string;
  weight?: number;
  opacity?: number;
  dashArray?: string;
  fitBounds?: boolean;
}

export interface TitleOptions {
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
}

export interface MapState {
  view: MapView;
  markers: Map<string, { coordinates: [number, number]; text?: string; options?: MarkerOptions }>;
  polygons: Map<string, { coordinates: [number, number][]; options?: PolygonOptions }>;
  lines: Map<string, { coordinates: [number, number][]; options?: LineOptions }>;
}

export function createDefaultState(): MapState {
  return {
    view: {
      center: [0, 0],
      zoom: 2,
      bounds: [[-85, -180], [85, 180]],
    },
    markers: new Map(),
    polygons: new Map(),
    lines: new Map(),
  };
}
