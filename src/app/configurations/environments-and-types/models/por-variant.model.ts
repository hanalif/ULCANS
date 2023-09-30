import { nsnSide } from "./nsn-side.model";

export interface PORVariant{
    id: string,
    environment: string,
    sideA: nsnSide,
    sideB: nsnSide
}
