import { MeasureType } from "./measure-type.enum";
import { SystemSide } from "./system-side.model";

export interface AssetForPdf{
  id: string,
  assetId: string,
  areSpecialPoles: boolean,
  sideA: SystemSide,
  sideB: SystemSide,
  quantity: number,
  systemTypeId: string,
  isCustomConfiguration: boolean,
  wasStartedFromCalculator: boolean,
  initialIndexses: number[];
}
