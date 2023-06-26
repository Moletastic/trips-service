import { z } from 'zod';
import { NumberAsString, UnixTime } from '../../schemas/primitive.schemas';
import { Location } from '../../schemas/geolocation.schemas';

export const TripReading = z.object({
  time: UnixTime,
  speed: z.number(),
  speedLimit: z.number(),
  location: Location,
});

export type TTripReading = z.infer<typeof TripReading>;

export const TripCreate = z.object({
  readings: z.array(TripReading).min(5),
});

export type TTripCreate = z.infer<typeof TripCreate>;

export const TripFindParams = z.object({
  start_lte: NumberAsString.optional(),
  start_gte: NumberAsString.optional(),
  distance_gte: NumberAsString.optional(),
  limit: NumberAsString.optional(),
  offset: NumberAsString.optional(),
});

export type TTripFindParams = z.infer<typeof TripFindParams>;
