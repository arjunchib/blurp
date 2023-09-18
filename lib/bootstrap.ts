import { OnInteraction } from "./router";
import { InitService } from "./services/init.service";

export type BlurpOptions = {
  commands: any[];
  router: OnInteraction;
  applicationId?: string;
  publicKey?: string;
  botToken?: string;
  global?: boolean;
  guilds?: string[];
  port?: number;
};

export async function bootstrap(options: BlurpOptions) {
  let { applicationId, botToken, publicKey } = options;
  applicationId ||= Bun.env.APPLICATION_ID!;
  botToken ||= Bun.env.BOT_TOKEN!;
  publicKey ||= Bun.env.PUBLIC_KEY!;
  if (!applicationId) throw new Error("No application id provided");
  if (!botToken) throw new Error("No bot token provided");
  if (!publicKey) throw new Error("No public key provided");
  const initService = new InitService({
    ...options,
    applicationId,
    botToken,
    publicKey,
  });
  await initService.initialize();
}
