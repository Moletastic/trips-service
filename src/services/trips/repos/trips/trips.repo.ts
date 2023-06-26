import { Filter, FindOptions } from 'mongodb';
import { MongoPlug } from '../../../../db/mongo';
import { TTrip, TTripDocument } from '../../trips.schemas';
import { TTripFindParams } from '../../../../routes/trips/trips.schemas';
import { removeEmptyProperties } from '../../../../helpers/object.helpers';
import { CommonObject } from '../../../../types/object.types';

export class TripsRepo {
  constructor(private readonly connection: MongoPlug) {}

  getCollection() {
    return this.connection.getConnection().collection('trips');
  }

  async find(params: TTripFindParams): Promise<TTripDocument[]> {
    const { limit, offset, start_gte, start_lte, distance_gte } = params;
    const start: Filter<TTripDocument['start']> = removeEmptyProperties({
      $gte: start_gte,
      $lte: start_lte,
    });
    const filter: Filter<TTripDocument> = removeEmptyProperties({
      distance: distance_gte,
    });
    if (Object.keys(start).length) {
      filter.start = start;
    }
    const options: FindOptions<TTripDocument> = removeEmptyProperties({
      limit: limit ?? 2,
      skip: offset,
    });
    const result = await this.getCollection()
      .find<TTrip>(filter as CommonObject, options)
      .toArray();
    return result as TTripDocument[];
  }

  async create(trip: TTrip): Promise<TTripDocument> {
    const result = await this.getCollection().insertOne(trip);
    return { ...trip, _id: result.insertedId };
  }
}
