import { InitService } from "./services/init.service";

export interface BlurpOptions {
  commands: any[];
  controllers: any[];
  applicationId: string;
  botToken: string;
  global?: boolean;
  guilds?: string[];
}

export async function bootstrap(options: BlurpOptions) {
  if (!options.applicationId) throw new Error("No application id provided");
  if (!options.botToken) throw new Error("No bot token provided");
  const initService = new InitService(options);
  await initService.initialize();
}