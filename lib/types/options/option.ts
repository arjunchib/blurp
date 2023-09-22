import { Localizations } from "./localizations";

export interface Option {
  /** Type of option */
  type?: number;
  /** {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming | 1-32 character name} */
  name: string;
  /** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
  nameLocalizations?: Localizations;
  /** 1-100 character description */
  description: string;
  /** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
  descriptionLocalizations?: Localizations;
  /** If the parameter is required or optional--default `false` */
  required?: boolean;
}

export interface BooleanOption extends Option {}
export interface UserOption extends Option {}
export interface RoleOption extends Option {}
export interface MentionableOption extends Option {}
export interface AttachmentOption extends Option {}
