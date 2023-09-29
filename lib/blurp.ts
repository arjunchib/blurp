import { SlashCommand } from "./types/commands/slash_command";
import { ChannelOption } from "./types/options/channel_option";
import { IntegerOption, NumberOption } from "./types/options/number_option";
import {
  AttachmentOption,
  BooleanOption,
  MentionableOption,
  Option,
  RoleOption,
  UserOption,
} from "./types/options/option";
import { StringOption } from "./types/options/string_option";
import { SubCommandGroupOption } from "./types/options/sub_command_group_option";
import {
  BasicOptions,
  SubCommandOption,
} from "./types/options/sub_command_option";
import { Message } from "./types/responses/message";
import { Choice } from "./types/choices";

export class Blurp {
  slashCommand<const T extends Option>(
    params: SlashCommand<T>
  ): SlashCommand<T> {
    return params;
  }

  subcommand<
    const N extends string,
    const R extends boolean,
    const O extends BasicOptions
  >(
    params: Omit<SubCommandOption<N, R, O>, "type">
  ): SubCommandOption<N, R, O> {
    return { ...params, type: 1 };
  }

  subcommandGroup<
    const N extends string,
    const R extends boolean,
    const O extends SubCommandOption
  >(
    params: Omit<SubCommandGroupOption<N, R, O>, "type">
  ): SubCommandGroupOption<N, R, O> {
    return { ...params, type: 2 };
  }

  string<const N extends string, const R extends boolean>(
    params: Omit<StringOption<N, R>, "type">
  ): StringOption<N, R> {
    return { ...params, type: 3 };
  }

  integer<const N extends string, const R extends boolean>(
    params: Omit<IntegerOption<N, R>, "type">
  ): IntegerOption<N, R> {
    return { ...params, type: 4 };
  }

  boolean<const N extends string, const R extends boolean>(
    params: Omit<BooleanOption<N, R>, "type">
  ): BooleanOption<N, R> {
    return { ...params, type: 5 };
  }

  user<const N extends string, const R extends boolean>(
    params: Omit<UserOption<N, R>, "type">
  ): UserOption<N, R> {
    return { ...params, type: 6 };
  }

  channel<const N extends string, const R extends boolean>(
    params: Omit<ChannelOption<N, R>, "type">
  ): ChannelOption<N, R> {
    return { ...params, type: 7 };
  }

  role<const N extends string, const R extends boolean>(
    params: Omit<RoleOption<N, R>, "type">
  ): RoleOption<N, R> {
    return { ...params, type: 8 };
  }

  mentionable<const N extends string, const R extends boolean>(
    params: Omit<MentionableOption<N, R>, "type">
  ): MentionableOption<N, R> {
    return { ...params, type: 9 };
  }

  number<const N extends string, const R extends boolean>(
    params: Omit<NumberOption<N, R>, "type">
  ): NumberOption<N, R> {
    return { ...params, type: 10 };
  }

  attachment<const N extends string, const R extends boolean>(
    params: Omit<AttachmentOption<N, R>, "type">
  ): AttachmentOption<N, R> {
    return { ...params, type: 11 };
  }

  message(params: Message) {
    return params;
  }

  choice(params: Choice) {
    return params;
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
