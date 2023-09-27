
import { SystemSide } from "./system-side.model";

export interface UserSelections{
  id: string,
  assetId: string,
  areSpecialPoles: boolean,
  sideA: SystemSide,
  sideB: SystemSide,
  systemTypeId: string,
  isCustomConfiguration: boolean,
  wasStartedFromCalculator: boolean,
  initialIndexses: number[],
  isPORSelcetions: boolean,
  porVariantSelectionId?: string
}
