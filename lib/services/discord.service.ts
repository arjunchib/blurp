import createClient from "openapi-fetch";
import { paths } from "../api";

export class DiscordService {
  public client: ReturnType<typeof createClient<paths>>;

  constructor(botToken: string) {
    this.client = createClient<paths>({
      baseUrl: "https://discord.com/api/v10",
      headers: new Headers({
        Authorization: `Bot ${botToken}`,
      }),
      // .clone() is broken in bun
      // can be removed once this issue is resolved
      // https://github.com/oven-sh/bun/pull/3908
      fetch: async (...args) => {
        const res = await fetch(...args);
        res.clone = () => res;
        return res;
      },
    });
  }

  private handleResponse<
    T extends {
      error?: {
        code: number;
        message: string;
        errors?: any;
      };
    }
  >(response: T): T {
    const { error } = response;
    if (error) {
      if (error.errors) console.error(error.errors);
      throw new Error(`${error.code} ${error.message}`);
    }
    return response;
  }

  async get(...args: Parameters<typeof this.client.GET>) {
    return this.handleResponse(await this.client.GET(...args));
  }

  async put(...args: Parameters<typeof this.client.PUT>) {
    return this.handleResponse(await this.client.PUT(...args));
  }

  async post(...args: Parameters<typeof this.client.POST>) {
    return this.handleResponse(await this.client.POST(...args));
  }

  async delete(...args: Parameters<typeof this.client.DELETE>) {
    return this.handleResponse(await this.client.DELETE(...args));
  }

  async options(...args: Parameters<typeof this.client.OPTIONS>) {
    return this.handleResponse(await this.client.OPTIONS(...args));
  }

  async head(...args: Parameters<typeof this.client.HEAD>) {
    return this.handleResponse(await this.client.HEAD(...args));
  }

  async patch(...args: Parameters<typeof this.client.PATCH>) {
    return this.handleResponse(await this.client.PATCH(...args));
  }

  async trace(...args: Parameters<typeof this.client.TRACE>) {
    return this.handleResponse(await this.client.TRACE(...args));
  }
}
