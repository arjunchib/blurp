import { inject } from ".";
import { OnInteraction } from "./router";
import { DiscordService } from "./services/discord.service";
import { InitService } from "./services/init.service";
import { OptionsService } from "./services/options.service";
import { ApplicationCommand } from "./types/commands/application_command";

export type BlurpOptions = {
  commands: ApplicationCommand[];
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
  inject(
    OptionsService,
    new OptionsService({ ...options, applicationId, botToken, publicKey })
  );
  inject(DiscordService);
  const initService = new InitService();
  await initService.initialize();
}
