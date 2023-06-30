import { Entity } from "src/app/shared/models/entity.model";
import { AssetMeasures } from "./asset-measures.model";
import { Configuration } from "./configuration.model";
import { MeasureType } from "src/app/shared/models/measure-type.enum";

export interface Asset extends Entity{
    assetImgUrl: string,
    name: string,
    configurationId: string | undefined,
    measures: AssetMeasures,
    isInList: boolean,
    initialMeasureType: MeasureType
}
