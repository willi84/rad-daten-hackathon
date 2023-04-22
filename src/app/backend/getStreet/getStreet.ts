import axios from 'axios';

// API key als environment variabel: API_OPEN_ROUTESERVICE
const KEY = process.env.API_OPEN_ROUTESERVICE;

export const getNearestStreet = async (coord: Array<number>): Promise<string> => {
  const lon = coord[0];
  const lat = coord[1];
  const url = `https://api.openrouteservice.org/geocode/reverse?api_key=${KEY}&point.lon=${lon}&point.lat=${lat}&boundary.country=DE`;

  const response = await axios.get(url);
  const streetName = response.data.features[0].properties.name;
  return streetName;
};


export const getStreetsWithinBounds = async (coords: [number, number][]): Promise<string[]> => {
  const lons = coords.map((coord) => coord[0]);
  const lats = coords.map((coord) => coord[1]);
  const south = Math.min(...lats);
  const west = Math.min(...lons);
  const north = Math.max(...lats);
  const east = Math.max(...lons);
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${KEY}&boundary.rect.min_lon=${west}&boundary.rect.min_lat=${south}&boundary.rect.max_lon=${east}&boundary.rect.max_lat=${north}&boundary.country=DE`;
  const response = await axios.get(url);
  const streets = response.data.features.map((feature: any) => feature.properties.name);
  return streets;
};
