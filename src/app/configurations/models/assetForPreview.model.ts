import { Asset } from "./asset.model";
import { Configuration } from "./configuration.model";

export interface AssetForPreview{
  asset: Asset,
  configuration: Configuration | undefined,
  areSpecialPoles: boolean
}
