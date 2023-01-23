
import { Environment } from "src/app/configurations/environments-and-types/models/environment.model";
import { Asset } from "src/app/configurations/models/asset.model";
import { Configuration } from "src/app/configurations/models/configuration.model";
import { MeasureType } from "./measure-type.enum";

export interface AssetForDisplay {
  asset?: Asset,
  configuratoin?: Configuration,
  environment?: Environment,
  measureType?: MeasureType,
}
