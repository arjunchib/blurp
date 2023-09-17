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

  get(...args: Parameters<typeof this.client.GET>) {
    console.log(args[0]);
    return this.client.GET(...args);
  }

  put(...args: Parameters<typeof this.client.PUT>) {
    return this.client.PUT(...args);
  }

  post(...args: Parameters<typeof this.client.POST>) {
    return this.client.POST(...args);
  }

  delete(...args: Parameters<typeof this.client.DELETE>) {
    return this.client.DELETE(...args);
  }

  options(...args: Parameters<typeof this.client.OPTIONS>) {
    return this.client.OPTIONS(...args);
  }

  head(...args: Parameters<typeof this.client.HEAD>) {
    return this.client.HEAD(...args);
  }

  patch(...args: Parameters<typeof this.client.PATCH>) {
    return this.client.PATCH(...args);
  }

  trace(...args: Parameters<typeof this.client.TRACE>) {
    return this.client.TRACE(...args);
  }
}
