import { snakeCase } from "snake-case";
import type { BlurpOptions } from "../bootstrap";
import { inject } from "../inject";
import { DiscordServer } from "../server";
import { matchObject } from "../utils/match_object";
import { DiscordService } from "./discord.service";

type RequiredKeys<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
type InitOptions = RequiredKeys<
  BlurpOptions,
  "applicationId" | "botToken" | "publicKey"
>;

export class InitService {
  private discord: DiscordService;
  private commands: any[] = [];

  constructor(private options: InitOptions) {
    this.discord = inject(
      DiscordService,
      new DiscordService(this.options.botToken)
    );
  }

  async initialize() {
    this.setupCommands();
    if (this.options.global) await this.syncGlobalCommands();
    if (this.options.guilds) {
      await Promise.all(
        this.options.guilds.map((guild) => {
          this.syncGuildCommands(guild);
        })
      );
    }
    const discordServer = new DiscordServer(
      this.options.publicKey,
      this.options.router,
      this.options.port
    );
    discordServer.serve();
  }

  private setupCommands() {
    for (const command of this.options.commands) {
      const cmd: any = {};
      for (const [k, v] of Object.entries(command)) {
        cmd[snakeCase(k)] = v;
      }
      this.commands.push(cmd);
    }
  }

  private matchCommands(remoteCommands: any[], localCommands: any[]): boolean {
    if (remoteCommands.length !== localCommands.length) return false;
    return localCommands.every((localCommand) => {
      const remoteCommand = remoteCommands.find(
        (remoteCommand) => remoteCommand.name === localCommand.name
      );
      if (!remoteCommand) return false;
      // we partial match here since remoteCommand may have more properties
      return matchObject(remoteCommand, localCommand);
    });
  }

  private async syncGlobalCommands() {
    const globalCommands = await this.getGlobalCommands();
    if (!this.matchCommands(globalCommands, this.commands)) {
      await this.uploadGlobalCommands();
    }
  }

  private async syncGuildCommands(guildId: string) {
    const guildCommands = await this.getGuildCommands(guildId);
    if (!this.matchCommands(guildCommands, this.commands)) {
      await this.uploadGuildCommands(guildId);
    }
  }

  private async getGlobalCommands() {
    const { data, error } = await this.discord.get(
      "/applications/{application_id}/commands",
      {
        params: {
          path: {
            application_id: this.options.applicationId,
          },
        },
      }
    );
    if (error) throw new Error(error.message);
    if (!data) throw new Error("Could not get global commands");
    return data;
  }

  private async getGuildCommands(guildId: string) {
    const { data, error } = await this.discord.get(
      "/applications/{application_id}/guilds/{guild_id}/commands",
      {
        params: {
          path: {
            application_id: this.options.applicationId,
            guild_id: guildId,
          },
        },
      }
    );
    if (error) throw new Error(error.message);
    if (!data) throw new Error("Could not get guild commands");
    return data;
  }

  private async uploadGlobalCommands() {
    const { data, error } = await this.discord.put(
      "/applications/{application_id}/commands",
      {
        params: {
          path: {
            application_id: this.options.applicationId,
          },
        },
        body: this.commands,
      }
    );
    if (error) throw new Error(error.message);
    return data;
  }

  private async uploadGuildCommands(guildId: string) {
    console.log("updated guild command");
    const { data, error } = await this.discord.put(
      "/applications/{application_id}/guilds/{guild_id}/commands",
      {
        params: {
          path: {
            application_id: this.options.applicationId,
            guild_id: guildId,
          },
        },
        body: this.commands,
      }
    );
    if (error) throw new Error(error.message);
    return data;
  }
}
