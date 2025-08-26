declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element | null, opts?: MapOptions);
  }

  class Marker {
    constructor(opts?: MarkerOptions);
    addListener(eventName: string, handler: Function): MapsEventListener;
    setMap(map: Map | null): void;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map?: Map | StreetViewPanorama, anchor?: MVCObject): void;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    styles?: MapTypeStyle[];
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    zoomControlOptions?: ZoomControlOptions;
  }

  interface MarkerOptions {
    position?: LatLng | LatLngLiteral;
    map?: Map | null;
    icon?: string | Icon | Symbol;
    title?: string;
    animation?: Animation;
  }

  interface InfoWindowOptions {
    content?: string | Element;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface ZoomControlOptions {
    position?: ControlPosition;
  }

  interface MapTypeStyle {
    elementType?: string;
    featureType?: string;
    stylers?: MapTypeStyler[];
  }

  interface MapTypeStyler {
    color?: string;
    visibility?: string;
  }

  interface Symbol {
    path: SymbolPath | string;
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    scale?: number;
  }

  enum SymbolPath {
    CIRCLE = 0,
    FORWARD_CLOSED_ARROW = 1,
    FORWARD_OPEN_ARROW = 2,
    BACKWARD_CLOSED_ARROW = 3,
    BACKWARD_OPEN_ARROW = 4
  }

  enum Animation {
    BOUNCE = 1,
    DROP = 2
  }

  enum ControlPosition {
    BOTTOM_CENTER = 11,
    BOTTOM_LEFT = 10,
    BOTTOM_RIGHT = 12,
    LEFT_BOTTOM = 6,
    LEFT_CENTER = 4,
    LEFT_TOP = 5,
    RIGHT_BOTTOM = 9,
    RIGHT_CENTER = 8,
    RIGHT_TOP = 7,
    TOP_CENTER = 2,
    TOP_LEFT = 1,
    TOP_RIGHT = 3
  }

  interface MapsEventListener {
    remove(): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
  }

  class MVCObject {}
  class StreetViewPanorama {}
  interface Icon {}
}

export {};