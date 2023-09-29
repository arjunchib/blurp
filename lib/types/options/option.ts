import { Localizations } from "./localizations";

export interface Option<Name = string, Required = boolean> {
  /** Type of option */
  type?: number;
  /** {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming | 1-32 character name} */
  name: Name;
  /** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
  nameLocalizations?: Localizations;
  /** 1-100 character description */
  description: string;
  /** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
  descriptionLocalizations?: Localizations;
  /** If the parameter is required or optional--default `false` */
  required?: Required;
}

export interface BooleanOption<Name = string, Required = boolean>
  extends Option<Name, Required> {
  type: 5;
}
export interface UserOption<Name = string, Required = boolean>
  extends Option<Name, Required> {
  type: 6;
}
export interface RoleOption<Name = string, Required = boolean>
  extends Option<Name, Required> {
  type: 8;
}
export interface MentionableOption<Name = string, Required = boolean>
  extends Option<Name, Required> {
  type: 9;
}
export interface AttachmentOption<Name = string, Required = boolean>
  extends Option<Name, Required> {
  type: 11;
}
