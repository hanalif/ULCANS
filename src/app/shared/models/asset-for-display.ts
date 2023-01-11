import { AssetMeasures } from "src/app/configurations/models/asset-measures.model";
import { Asset } from "src/app/configurations/models/asset.model";
import { Configuration } from "src/app/configurations/models/configuration.model";
import { EnviormentCategory } from "./enviorment-category.model";

export interface AssetForDisplay {
  asset: Asset,
  configuratoin: Configuration,
  enviorment: EnviormentCategory
}
