import { TTripFindParams } from '../../../routes/trips/trips.schemas';
import { TripsRepo } from '../repos/trips/trips.repo';

export class TripFindCase {
  constructor(private readonly tripsRepo: TripsRepo) {}

  find(params: TTripFindParams) {
    return this.tripsRepo.find(params);
  }
}
