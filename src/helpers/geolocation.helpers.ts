import { EARTH_RADIUS_KM } from '../const/geolocation.const';
import { Location } from '../schemas/geolocation.schemas';

export const degreeToRad = (degree: number) => (degree * Math.PI) / 180;

export const getDistance = (a: Location, b: Location) => {
  const latA = degreeToRad(a.lat);
  const latB = degreeToRad(b.lat);
  const lonA = degreeToRad(a.lon);
  const lonB = degreeToRad(b.lon);
  const latDiff = latB - latA;
  const lonDiff = lonB - lonA;
  const delta =
    Math.pow(Math.sin(latDiff / 2.0), 2) + Math.cos(latA) * Math.cos(latB) * Math.pow(Math.sin(lonDiff / 2.0), 2);
  const c = 2 * Math.atan2(Math.sqrt(delta), Math.sqrt(1 - delta));

  return EARTH_RADIUS_KM * c * 1000;
};
