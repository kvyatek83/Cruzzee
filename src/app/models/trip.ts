import { GeoLine } from './geo-line';
import { TripDescription } from './trip-description';

export interface Trip {
    route: Array<GeoLine>;
    tripDescription: TripDescription;
}
