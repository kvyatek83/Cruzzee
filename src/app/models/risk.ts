import { GeoLine } from './geo-line';
import { RiskDescription } from './risk-description';

export interface Risk {
    line: GeoLine;
    riskDesc: RiskDescription;
}

export type AreaRisks = Array<Risk>;
