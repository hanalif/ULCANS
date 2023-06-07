import { SystemInstructionsData } from "./system-instructions-data.model";

export interface SystemInstructionsContentData {
  videoUrl?: string,
  imgUrl?: string,
  imgUrl2?: string,
  text?: string[],
  text2?: string[],
  subData?: SystemInstructionsData[],
  linksForMoreInformation?: string[],
  note?: string,
  note2?: string

}
