import { MeasureType } from "./measure-type.enum";

export interface AssetForPdf{
  assetId: string,
  measureType: MeasureType,
  environmentId: string,
  configuraionId: string,
  quantity: number

}
