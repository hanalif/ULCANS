import { Entity } from "src/app/shared/models/entity.model";
import { AssetMeasures } from "./asset-measures.model";
import { Configuration } from "./configuration.model";

export interface Asset extends Entity{
    assetImgUrl: string,
    name: string,
    configurationId: string | undefined,
    measures: AssetMeasures,
    isInList: boolean
}
