import { Localizations } from "../options/localizations";

export interface ApplicationCommand {
  /** {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-naming | Name of command }, 1-32 characters */
  name: string;
  /** Localization dictionary for `name` field. Values follow the same restrictions as `name` */
  nameLocalizations?: Localizations;
  /** Description for slash commands, 1-100 characters. Empty string for user and message commands */
  description: string;
  /** Localization dictionary for `description` field. Values follow the same restrictions as `description` */
  descriptionLocalizations?: Localizations;
  /** Set of {@link https://discord.com/developers/docs/topics/permissions | permissions} represented as a bit set */
  defaultMemberPermission?: string;
  /** Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
  dmPermission?: boolean;
  /** Indicates whether the command is {@link https://discord.com/developers/docs/interactions/application-commands#agerestricted-commands | age-restricted} */
  nsfw?: boolean;
}
