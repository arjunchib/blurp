import { InitOptions } from "./init.service";

export class OptionsService {
  applicationId: string;

  constructor(options: InitOptions) {
    this.applicationId = options.applicationId;
  }
}
