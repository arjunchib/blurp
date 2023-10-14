import { snakeCaseKeys } from "../utils/snake_case_keys";
import { Message, MessageParams } from "../types/responses/message";
import { Interaction } from "./interaction";
import { inject } from "..";
import { OptionsService } from "../services/options.service";
import { InteractionResponse } from "./interaction_response";
import { DiscordService } from "../services/discord.service";
import { ComponentType } from "../types/components/component_type";
import { SelectOption } from "../types/components/selects/select";

export interface MessageComponentInteractionData {
  customId: string;
  componentType: ComponentType;
  values?: string[];
  resolved?: any;
}

export interface MessageComponentInteraction extends Interaction {
  data: MessageComponentInteractionData;
}

export class MessageComponentInteraction extends Interaction {
  private blurpOptions = inject(OptionsService);
  private discord = inject(DiscordService);

  respondWith(response: string | number | MessageParams) {
    let type = 4;
    let data: any = {};
    if (typeof response === "object") {
      const message = new Message(response);
      type = message.update ? 7 : 4;
      data = message["toComponent"]();
    } else {
      data = { content: response.toString() };
    }
    this.resolve({ type, data });
    return new InteractionResponse(this);
  }

  defer(update?: boolean) {
    this.resolve({ type: update ? 6 : 5 });
  }

  async followupWith(response: string | number | Message) {
    let body: any = {};
    if (typeof response === "object") {
      snakeCaseKeys(response, body);
    } else {
      body = { content: response.toString() };
    }
    const { data, error } = await this.discord.POST(
      "/webhooks/{webhook_id}/{webhook_token}",
      {
        params: {
          path: {
            webhook_id: this.blurpOptions.applicationId,
            webhook_token: this.token,
          },
        },
        body,
      }
    );
    if (error) throw error;
    return new InteractionResponse(this, data.id);
  }
}
