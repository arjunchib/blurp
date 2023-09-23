import { snakeCaseKeys } from "../utils/snake_case_keys";
import { Message } from "../types/responses/message";
import { Interaction } from "./interaction";

export interface SlashInteractionData<T = SlashInteractionDataOption> {
  id: string;
  name: string;
  type: 1;
  resolved?: any;
  options?: T[];
  guildId: string;
  targetId?: string;
}

export interface SlashInteractionDataOption {
  name: string;
  type: number;
  value: any;
  options?: any;
}

export interface SlashInteraction {
  data: SlashInteractionData;
}

export class SlashInteraction extends Interaction {
  respondWith(response: string | number | Message) {
    let type = 4;
    let data: any = {};
    if (typeof response === "object") {
      type = response.update ? 7 : 4;
      delete response.update;
      snakeCaseKeys(response, data);
    } else {
      data = { content: response.toString() };
    }
    this.resolve({
      type,
      data,
    });
  }
}
