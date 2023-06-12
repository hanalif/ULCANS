import { AssetMeasures } from "./asset-measures.model";
import { Configuration } from "./configuration.model";

export interface Asset{
    id: string,
    assetImgUrl: string,
    name: string,
    configurationId: string | undefined,
    measures: AssetMeasures,
    isInList: boolean
}
