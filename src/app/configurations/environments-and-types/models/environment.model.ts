import { ClothPattern } from "./clothPattern.model";

export interface Environment{
  id: string,
  typeName: string,
  imgUrlowResolution: string,
  clothPatterns: ClothPattern[]
}
