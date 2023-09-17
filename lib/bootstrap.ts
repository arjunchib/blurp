import { inject } from ".";
import { InitService } from "./services/init.service";

export interface BlurpOptions {
  commands: any[];
  controllers: any[];
  global?: boolean;
  guilds?: string[];
}

export async function bootstrap(options: BlurpOptions) {
  const initService = inject(InitService);
  await initService.initialize(options);
}
