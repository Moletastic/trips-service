import { z } from 'zod';

export const NumberAsString = z
  .string()
  .transform((number) => Number(number))
  .pipe(z.number());

export const UnixTime = z.number();

export type TUnixTime = z.infer<typeof UnixTime>;


