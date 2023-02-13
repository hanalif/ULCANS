import { MeasureType } from "./measure-type.enum";
import { SystemSide } from "./system-side.model";

export interface AssetForPdf{
  id: string,
  assetId: string,
  measureType: MeasureType,
  sideA: SystemSide,
  sideB: SystemSide
  configuraionId: string,
  quantity: number,
  systemTypeId: string,
}