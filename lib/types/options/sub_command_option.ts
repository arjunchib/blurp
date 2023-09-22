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

export interface SubCommandOption extends Option {
  /** The parameters for the options */
  options: (
    | StringOption
    | IntegerOption
    | BooleanOption
    | UserOption
    | ChannelOption
    | RoleOption
    | MentionableOption
    | NumberOption
    | AttachmentOption
  )[];
}
