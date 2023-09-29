import { ChannelOption } from "./channel_option";
import { IntegerOption, NumberOption } from "./number_option";
import {
  AttachmentOption,
  BooleanOption,
  MentionableOption,
  Option,
  RoleOption,
  UserOption,
} from "./option";
import { StringOption } from "./string_option";

export type BasicOptions =
  | StringOption
  | IntegerOption
  | BooleanOption
  | UserOption
  | ChannelOption
  | RoleOption
  | MentionableOption
  | NumberOption
  | AttachmentOption;

export interface SubCommandOption<N = string, R = boolean, O = BasicOptions>
  extends Option<N, R> {
  type: 1;
  /** The parameters for the options */
  options: O[];
}
