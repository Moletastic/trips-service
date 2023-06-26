import axios from 'axios';
import { OPENSTREETMAP_API_URL } from './openstreetmap.const';
import { Location } from '../../../../schemas/geolocation.schemas';
import { OpenStreetMapAddress } from './openstreetmap.types';

const instance = axios.create({
  baseURL: OPENSTREETMAP_API_URL,
});

export class OpenStreetMapRepo {
  async getAddress(location: Location): Promise<OpenStreetMapAddress> {
    const endpoint = `/reverse?lat=${location.lat}&lon=${location.lon}&format=jsonv2`;
    const response = await instance.get<OpenStreetMapAddress>(endpoint);
    return response.data;
  }
}
