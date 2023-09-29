
import { Environment } from "src/app/configurations/environments-and-types/models/environment.model";
import { SystemType } from "src/app/configurations/environments-and-types/models/type.model";
import { Asset } from "src/app/configurations/models/asset.model";
import { Configuration } from "src/app/configurations/models/configuration.model";
import { MeasureType } from "./measure-type.enum";
import { SystemSideForDisplay } from "./system-side-for-display.mode";
import { PORVariant } from "src/app/configurations/environments-and-types/models/por-variant.model";

export interface AssetForDisplay {
  id?: string,
  asset?: Asset,
  configuratoin?: Configuration,
  areSpecialPoles?: boolean,
  initialIndexes: number[],

  //custom
  sideA?: SystemSideForDisplay,
  sideB?: SystemSideForDisplay,
  environment?: Environment,

  ulcansType?: SystemType,

  //por
  porSelection?: PORVariant

}
