import { MeasureType } from "./measure-type.enum";

export interface AssetForPdf{
  assetId?: string,
  measureType?: MeasureType,
  environmentId?: string,
  clothPatternIndex?: number,
  configuraionId?: string,
  quantity?: number,
  systemTypeId?: string,
}
