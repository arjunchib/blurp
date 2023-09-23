import { snakeCaseKeys } from "./utils/snake_case_keys";
import { Message } from "./types/responses/message";

export interface Interaction {
  id: string;
  applicationId: string;
  type: number;
  data?: any;
  guildId?: string;
  channel?: any;
  channelId?: string;
  member?: any;
  user?: any;
  token: string;
  version: string;
  message?: any;
  appPermissions?: string;
  locale?: string;
  guildLocale?: string;
}

export class Interaction {
  protected interactionResolved: Promise<any>;
  private resolve!: (value: any) => void;
  private reject!: (reason?: any) => void;

  constructor(interaction: any) {
    snakeCaseKeys(interaction, this);
    this.interactionResolved = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

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
