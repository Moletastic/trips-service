import { CommonObject } from '../types/object.types';

export const removeEmptyProperties = <T>(object: CommonObject) => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, value]) => value !== null && value !== '' && typeof value !== 'undefined'),
  ) as T;
};
