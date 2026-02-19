export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationInfo {
  coordinates: Coordinates;
  dms: string;
  googleMapsUrl: string;
}

export enum AppMode {
  STANDARD = 'STANDARD',
  CLASSIFIED = 'CLASSIFIED'
}