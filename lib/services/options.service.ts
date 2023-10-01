import { InitOptions } from "./init.service";

export interface OptionsService extends InitOptions {}

export class OptionsService {
  constructor(options: InitOptions) {
    Object.assign(this, options);
  }
}
