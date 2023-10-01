import { Interaction, inject } from "..";
import { DiscordServer } from "../server";
import { DiscordService } from "../services/discord.service";
import { OptionsService } from "../services/options.service";
import { Message } from "../types/responses/message";
import { snakeCaseKeys } from "../utils/snake_case_keys";

export class InteractionResponse {
  private options = inject(OptionsService);
  private discord = inject(DiscordService);

  constructor(private interaction: Interaction, private messageId?: string) {}

  async edit(response: string | number | Message) {
    let body: any = {};
    if (typeof response === "object") {
      snakeCaseKeys(response, body);
    } else {
      body = { content: response.toString() };
    }
    const { data, error } = await this.discord.PATCH(
      "/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
      {
        params: {
          path: {
            webhook_id: this.options.applicationId,
            webhook_token: this.interaction.token,
            message_id: this.messageId || "@original",
          },
        },
        body,
      }
    );
    if (error) throw error;
    return data;
  }

  async delete() {
    const { data, error } = await this.discord.DELETE(
      "/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
      {
        params: {
          path: {
            webhook_id: this.options.applicationId,
            webhook_token: this.interaction.token,
            message_id: this.messageId || "@original",
          },
        },
      }
    );
    if (error) throw error;
    return data;
  }
}
