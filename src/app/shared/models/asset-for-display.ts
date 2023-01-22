import { AssetMeasures } from "src/app/configurations/models/asset-measures.model";
import { Asset } from "src/app/configurations/models/asset.model";
import { Configuration } from "src/app/configurations/models/configuration.model";
import { EnvironmentCategory } from "./environment-category.model";
import { MeasureType } from "./measure-type.enum";

export interface AssetForDisplay {
  asset?: Asset,
  configuratoin?: Configuration,
  environment?: EnvironmentCategory,
  measureType?: MeasureType,
}
