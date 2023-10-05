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
import type {
  BasicOptions,
  SubCommandOption,
} from "./types/options/sub_command_option";
import { Message, MessageParams } from "./types/responses/message";
import { Choice } from "./types/choices";
import { Button, ButtonParams } from "./types/components/button";
import { TextInput, TextInputParams } from "./types/components/text_input";
import { Component } from "./types/components/component";
import { Link, LinkParams } from "./types/components/link";
import {
  StringSelect,
  StringSelectParams,
} from "./types/components/selects/string_select";
import {
  UserSelect,
  UserSelectParams,
} from "./types/components/selects/user_select";
import {
  RoleSelect,
  RoleSelectParams,
} from "./types/components/selects/role_select";
import {
  MentionableSelect,
  MentionableSelectParams,
} from "./types/components/selects/mentionable_select";
import {
  ChannelSelect,
  ChannelSelectParams,
} from "./types/components/selects/channel_select";

export class Blurp {
  slashCommand<const T extends BasicOptions>(
    params: SlashCommand<T>
  ): SlashCommand<T>;
  slashCommand<const T extends SubCommandGroupOption | SubCommandOption>(
    params: SlashCommand<T>
  ): SlashCommand<T>;
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

  message(params: MessageParams) {
    return new Message(params);
  }

  choice(params: Choice) {
    return params;
  }

  button(params: ButtonParams) {
    return new Button(params);
  }

  link(params: LinkParams) {
    return new Link(params);
  }

  textInput(params: TextInputParams) {
    return new TextInput(params);
  }

  textSelect(params: StringSelectParams) {
    return new StringSelect(params);
  }

  userSelect(params: UserSelectParams) {
    return new UserSelect(params);
  }

  roleSelect(params: RoleSelectParams) {
    return new RoleSelect(params);
  }
  mentionableSelect(params: MentionableSelectParams) {
    return new MentionableSelect(params);
  }

  channelSelect(params: ChannelSelectParams) {
    return new ChannelSelect(params);
  }
}

export const b = new Blurp();
