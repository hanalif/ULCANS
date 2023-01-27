
import { Environment } from "src/app/configurations/environments-and-types/models/environment.model";
import { Asset } from "src/app/configurations/models/asset.model";
import { Configuration } from "src/app/configurations/models/configuration.model";
import { MeasureType } from "./measure-type.enum";
import { SystemSideForDisplay } from "./system-side-for-display.mode";
import { SystemSide } from "./system-side.model";

export interface AssetForDisplay {
  asset?: Asset,
  configuratoin?: Configuration,
  sideA: SystemSideForDisplay,
  sideB: SystemSideForDisplay,
  environment?: Environment,
  measureType?: MeasureType,
}
