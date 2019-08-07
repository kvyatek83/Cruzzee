import { GeoLine } from './geo-line';

export interface TripDetails {
    route: Array<GeoLine>;
    departureDate: number;
    vesselContents: string;
}
