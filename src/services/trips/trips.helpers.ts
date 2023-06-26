import { TTripReading } from '../../routes/trips/trips.schemas';

export const getOverspeedByReadings = (readings: TTripReading[]) => {
  const overspeedReadings = readings.reduce<number[]>((carry, item, i) => {
    if (item.speed >= item.speedLimit) {
      return [...carry, i];
    }
    return carry;
  }, []);

  const { overspeedCount } = overspeedReadings.reduce<{
    last: number;
    overspeedCount: number;
  }>(
    (carry, item) => {
      const isChained = item - 1 === carry.last;

      return {
        last: item,
        overspeedCount: isChained ? carry.overspeedCount : carry.overspeedCount + 1,
      };
    },
    { last: 0, overspeedCount: 0 },
  );
  return overspeedCount;
};

export const getBoundingBoxByReadings = (readings: TTripReading[]) => {
  if (!readings.length) {
    return [];
  }
  const latitudes = readings.map((reading) => reading.location.lat);
  const longitudes = readings.map((reading) => reading.location.lon);

  const maxLat = Math.max(...latitudes);
  const minLat = Math.min(...latitudes);

  const maxLon = Math.max(...longitudes);
  const minLon = Math.min(...longitudes);

  return [
    { lat: minLat, lon: minLon },
    { lat: minLat, lon: maxLon },
    { lat: maxLat, lon: minLon },
    { lat: maxLat, lon: maxLon },
  ];
};
