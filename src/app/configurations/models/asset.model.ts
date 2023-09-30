import { Entity } from "src/app/shared/models/entity.model";
import { AssetMeasures } from "./asset-measures.model";
import { MeasureType } from "src/app/shared/models/measure-type.enum";
import { AppConfirmationSelections } from "src/app/app-configurations/app-configurations.enum";

export interface Asset extends Entity{
    assetImgUrl: string,
    name: string,
    configurationId: string | undefined,
    measures: AssetMeasures,
    isInList: boolean,
    initialMeasureType: MeasureType,
    appConfig: AppConfirmationSelections
}
