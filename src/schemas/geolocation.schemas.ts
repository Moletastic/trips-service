import { z } from 'zod';

export const Location = z.object({
  lat: z.number(),
  lon: z.number(),
});

export type Location = z.infer<typeof Location>;

