import { SystemInstructionsData } from "./system-instructions-data.model";
import { SystemInstructionsLink } from "./system-instructions-link.model";


export interface SystemInstructionsContentData {
  videoUrl?: string,
  imgUrl?: string,
  imgUrl2?: string,
  text?: string[],
  text2?: string[],
  subData?: SystemInstructionsData[],
  linksForMoreInformation?: SystemInstructionsLink[],
  note?: string,
  note2?: string

}
