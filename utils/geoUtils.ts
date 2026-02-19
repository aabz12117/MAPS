import { Coordinates } from "../types";

// Helper to convert Decimal to DMS for display
export const toDMS = (coordinate: number, type: 'lat' | 'lng'): string => {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);
  
  let direction = "";
  if (type === 'lat') direction = coordinate >= 0 ? "N" : "S";
  if (type === 'lng') direction = coordinate >= 0 ? "E" : "W";

  return `${degrees}°${minutes}'${seconds}"${direction}`;
};

// Parser: Converts DMS string to Decimal object
export const parseDMS = (dmsString: string): Coordinates | null => {
  // Normalize string
  const cleanStr = dmsString.trim().toUpperCase();
  
  // Regex for pairs like: 24°39'12.7"N 46°30'49.4"E
  // Matches: Numbers, symbols, optional direction
  const dmsRegex = /([0-9.]+)[°\s]([0-9.]+)[´'\s]([0-9.]+)["]?\s?([NSEW])/g;
  
  const matches = [...cleanStr.matchAll(dmsRegex)];
  
  if (matches.length !== 2) return null;

  const convert = (deg: string, min: string, sec: string, dir: string) => {
    let dd = parseFloat(deg) + parseFloat(min) / 60 + parseFloat(sec) / 3600;
    if (dir === 'S' || dir === 'W') {
      dd = dd * -1;
    }
    return dd;
  };

  const lat = convert(matches[0][1], matches[0][2], matches[0][3], matches[0][4]);
  const lng = convert(matches[1][1], matches[1][2], matches[1][3], matches[1][4]);

  return { lat, lng };
};

// Parser: Detects if input is Decimal (24.123, 46.123)
export const parseDecimal = (input: string): Coordinates | null => {
  const parts = input.split(',').map(s => s.trim());
  if (parts.length !== 2) return null;

  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);

  if (isNaN(lat) || isNaN(lng)) return null;

  return { lat, lng };
};

// Master Parser for Input Field
export const parseInputToCoordinates = (input: string): Coordinates | null => {
  // Try Decimal first
  const decimal = parseDecimal(input);
  if (decimal) return decimal;

  // Try DMS
  return parseDMS(input);
};

// Google Maps URL Extractor (Logic for Hidden Mode)
export const extractCoordsFromUrl = (url: string): Coordinates | null => {
  try {
    const decodedUrl = decodeURIComponent(url);
    
    // Pattern 1: @lat,lng
    const atMatch = decodedUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (atMatch) {
      return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
    }

    // Pattern 2: ?q=lat,lng or &q=lat,lng
    const qMatch = decodedUrl.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (qMatch) {
      return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) };
    }
    
    // Pattern 3: search/lat,lng
    const searchMatch = decodedUrl.match(/search\/(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (searchMatch) {
      return { lat: parseFloat(searchMatch[1]), lng: parseFloat(searchMatch[2]) };
    }

    return null;
  } catch (e) {
    return null;
  }
};