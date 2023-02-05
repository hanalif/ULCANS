import { MeasureType } from "src/app/shared/models/measure-type.enum";

export interface CalculatorFormValue{
  length: number,
  width: number,
  height: number,
  measureType: MeasureType
}
