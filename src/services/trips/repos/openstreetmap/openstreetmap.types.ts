export interface OpenStreetMapAddress {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    house_number: string;
    road: string;
    neighbourhood: string;
    suburb: string;
    county: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  }[];
  boundingbox: string[];
}
