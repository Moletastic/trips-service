import { getDistance } from '../../../helpers/geolocation.helpers';
import { TTripReading } from '../../../routes/trips/trips.schemas';
import { OpenStreetMapRepo } from '../repos/openstreetmap/openstreetmap.repo';
import { TripsRepo } from '../repos/trips/trips.repo';
import { getBoundingBoxByReadings, getOverspeedByReadings } from '../trips.helpers';
import { Trip } from '../trips.schemas';

export class TripCreateCase {
  constructor(private readonly tripsRepo: TripsRepo, private readonly openStreetMapRepo: OpenStreetMapRepo) {}

  async createByReadings(readings: TTripReading[]) {
    const sortedReadings = readings.sort((a, b) => a.time - b.time);

    const [startReading, endReading] = [sortedReadings[0], sortedReadings.at!(-1) as TTripReading];

    const duration = endReading.time - startReading.time;

    const distance = getDistance(startReading.location, endReading.location).toFixed(2);

    const overspeedCount = getOverspeedByReadings(sortedReadings);

    const [startAddress, endAddress] = await Promise.all([
      this.openStreetMapRepo.getAddress(startReading.location),
      this.openStreetMapRepo.getAddress(endReading.location),
    ]);

    const boundingBox = getBoundingBoxByReadings(sortedReadings);

    const trip = Trip.parse({
      start: {
        time: startReading.time,
        lat: startReading.location.lat,
        lon: startReading.location.lon,
        address: startAddress.display_name,
      },
      end: {
        time: endReading.time,
        lat: endReading.location.lat,
        lon: endReading.location.lon,
        address: endAddress.display_name,
      },
      distance,
      duration,
      overspeedCount,
      boundingBox,
    });
    return this.tripsRepo.create(trip);
  }
}
