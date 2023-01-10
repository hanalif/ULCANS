import { MeasureType } from "./measure-type.enum";

export interface AssetForPdf{
  assetId: string,
  measureType: MeasureType,
  enviormentId: string
}
