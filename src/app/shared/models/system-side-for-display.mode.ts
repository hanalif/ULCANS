import { Environment } from "src/app/configurations/environments-and-types/models/environment.model";

export interface SystemSideForDisplay{
  side: string,
  environment: Environment,
  clothPatternUrl: string
}
