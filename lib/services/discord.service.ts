import createClient from "openapi-fetch";
import { paths } from "../api";
import { OptionsService } from "../services/options.service";
import { inject } from "..";
import { factory } from "../inject";

export const DiscordService = factory(function () {
  const options = inject(OptionsService);
  return createClient<paths>({
    baseUrl: "https://discord.com/api/v10",
    headers: new Headers({
      Authorization: `Bot ${options.botToken}`,
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
});
