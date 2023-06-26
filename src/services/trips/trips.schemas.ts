import { z } from "zod";
import { UnixTime } from "../../schemas/primitive.schemas";
import { Location } from "../../schemas/geolocation.schemas";
import { WithId } from "mongodb";

export const TripSpot = z.object({
  time: UnixTime,
  lat: z.number(),
  lon: z.number(),
  address: z.string(),
});

export const Trip = z.object({
  start: TripSpot,
  end: TripSpot,
  distance: z.number(),
  duration: z.number(),
  overspeedCount: z.number(),
  boundingBox: z.array(Location).length(4),
});

export type TTrip = z.infer<typeof Trip>;

export type TTripDocument = WithId<TTrip>;
