import { camelCase } from "camel-case";

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
    for (const [k, v] of Object.entries(interaction)) {
      // @ts-ignore
      this[camelCase(k)] = v;
    }
    this.interactionResolved = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  respondWith(response: any) {
    this.resolve(response);
  }
}
