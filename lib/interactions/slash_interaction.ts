import { snakeCaseKeys } from "../utils/snake_case_keys";
import { Message } from "../types/responses/message";
import { Interaction } from "./interaction";
import { SlashCommand, StringOption } from "..";
import {
  AttachmentOption,
  BooleanOption,
  MentionableOption,
  Option,
  RoleOption,
  UserOption,
} from "../types/options/option";
import { IntegerOption, NumberOption } from "../types/options/number_option";
import { SubCommandOption } from "../types/options/sub_command_option";
import { SubCommandGroupOption } from "../types/options/sub_command_group_option";
import { ChannelOption } from "../types/options/channel_option";

export interface SlashInteractionData {
  id: string;
  name: string;
  type: 1;
  resolved?: any;
  options?: SlashInteractionDataOption[];
  guildId: string;
  targetId?: string;
}

export interface SlashInteractionDataOption {
  name: string;
  type: number;
  value: string | number;
  options?: any;
}

export interface SlashInteraction<T> extends Interaction {
  data: SlashInteractionData;
}

// expands object types recursively
type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

type IsRequired<T, K> = K extends true | undefined ? T : T | undefined;

type OptionType<T> = T extends SubCommandOption
  ? "subcommand"
  : T extends SubCommandGroupOption
  ? "subcommand_group"
  : T extends StringOption
  ? "string"
  : T extends IntegerOption
  ? "integer"
  : T extends BooleanOption
  ? "boolean"
  : T extends UserOption
  ? "user"
  : T extends ChannelOption
  ? "channel"
  : T extends RoleOption
  ? "role"
  : T extends MentionableOption
  ? "mentionable"
  : T extends NumberOption
  ? "number"
  : T extends AttachmentOption
  ? "attachment"
  : never;

type OptionValueType<T> = T extends StringOption
  ? string
  : T extends IntegerOption | NumberOption
  ? number
  : T extends BooleanOption
  ? boolean
  : T extends UserOption
  ? any
  : T extends ChannelOption
  ? any
  : T extends RoleOption
  ? any
  : T extends MentionableOption
  ? any
  : T extends NumberOption
  ? any
  : T extends AttachmentOption
  ? any
  : never;

type Objectify<T extends Option[]> = {
  [P in T extends Option[] ? T[number] : never as P["name"]]: IsRequired<
    {
      type: OptionType<P>;
      value: OptionValueType<P>;
    },
    P["required"]
  >;
};

export class SlashInteraction<
  T extends SlashCommand = SlashCommand
> extends Interaction {
  get options(): ExpandRecursively<Objectify<NonNullable<T["options"]>>> {
    return {} as any;
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
