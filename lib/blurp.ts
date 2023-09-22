import { snakeCase } from "snake-case";
import { Command } from ".";
import { SlashCommand } from "./types/commands/slash_command";
import { ChannelOption } from "./types/options/channel_option";
import { IntegerOption, NumberOption } from "./types/options/number_option";
import {
  AttachmentOption,
  BooleanOption,
  MentionableOption,
  RoleOption,
  UserOption,
} from "./types/options/option";
import { StringOption } from "./types/options/string_option";
import { SubCommandGroupOption } from "./types/options/sub_command_group_option";
import { SubCommandOption } from "./types/options/sub_command_option";

export class Blurp {
  slashCommand(params: SlashCommand): Command {
    const command: any = {};
    for (const [k, v] of Object.entries(params)) {
      command[snakeCase(k)] = v;
    }
    return command;
  }

  subcommand(params: SubCommandOption): SubCommandOption {
    return { ...params, type: 1 };
  }

  subcommandGroup(params: SubCommandGroupOption): SubCommandGroupOption {
    return { ...params, type: 2 };
  }

  string(params: StringOption): StringOption {
    return { ...params, type: 3 };
  }

  integer(params: IntegerOption): IntegerOption {
    return { ...params, type: 4 };
  }

  boolean(params: BooleanOption): BooleanOption {
    return { ...params, type: 5 };
  }

  user(params: UserOption): UserOption {
    return { ...params, type: 6 };
  }

  channel(params: ChannelOption): ChannelOption {
    return { ...params, type: 7 };
  }

  role(params: RoleOption): RoleOption {
    return { ...params, type: 8 };
  }

  mentionable(params: MentionableOption): MentionableOption {
    return { ...params, type: 9 };
  }

  number(params: NumberOption): NumberOption {
    return { ...params, type: 10 };
  }

  attachment(params: AttachmentOption): AttachmentOption {
    return { ...params, type: 11 };
  }
}

export const b = new Blurp();

b.slashCommand({
  name: "sasssda",
  description: "ASdadasd",
  options: [
    b.subcommand({
      name: "asdasd",
      description: "sadasd",
      options: [
        b.string({
          name: "asd",
          description: "asd",
        }),
      ],
    }),
    b.subcommandGroup({
      name: "asdasd",
      description: "sadasd",
      options: [
        b.subcommand({
          name: "asd",
          description: "asd",
          options: [
            b.string({
              name: "asdas",
              description: "ASDasd",
            }),
          ],
        }),
      ],
    }),
  ],
});
