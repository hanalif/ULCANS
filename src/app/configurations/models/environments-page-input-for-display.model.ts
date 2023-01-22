import { MeasureType } from "src/app/shared/models/measure-type.enum";
import { Asset } from "./asset.model";
import { Configuration } from "./configuration.model";

export interface EnvironmentPageInputForDisplay{
  asset: Asset,
  measureType: MeasureType,
  configuration: Configuration
}
