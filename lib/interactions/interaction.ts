import { snakeCaseKeys } from "../utils/snake_case_keys";

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

export abstract class Interaction {
  protected interactionResolved: Promise<any>;
  protected resolve!: (value: any) => void;
  protected reject!: (reason?: any) => void;

  constructor(interaction: any) {
    snakeCaseKeys(interaction, this);
    snakeCaseKeys(interaction.data, this.data);
    this.interactionResolved = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  respondWith(response: any) {}
}
