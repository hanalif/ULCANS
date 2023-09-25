import { AppConfirmationSelections } from "./app-configurations.enum";

export interface AppConfigData{
    code: AppConfirmationSelections,
    txt: string,
    shortTxt: string,
    imgLink: string
}
