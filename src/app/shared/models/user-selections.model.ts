
import { PatternsSelections } from "./patterns-selections.enum";
import { SystemSide } from "./system-side.model";

export interface UserSelections{
  id: string,
  initialIndexses: number[],

  wasStartedFromCalculator: boolean,
  assetId: string,
  areSpecialPoles: boolean,
  isCustomConfiguration: boolean,




  //custom
  sideA?: SystemSide,
  sideB?: SystemSide,
  systemTypeId?: string,


  //POR
  porVariantSelectionId?: string,
}
