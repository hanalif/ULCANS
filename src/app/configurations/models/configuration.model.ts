import { ConfigurationMeasures } from "./configuration-measures.model"

export interface Configuration{
    id: string,
    name: string,
    imgUrl: string,
    imgUrlForPdf: string,
    hexagon: number,
    rhombus: number,
    measures: ConfigurationMeasures,
    pins: number,
    poles: number
}
