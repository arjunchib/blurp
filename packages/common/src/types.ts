import {
  APIApplicationCommandAutocompleteResponse,
  APIApplicationCommandInteraction,
  APIButtonComponent,
  APIButtonComponentWithURL,
  APIChatInputApplicationCommandInteraction,
  APICommandAutocompleteInteractionResponseCallbackData,
  APIInteractionResponse,
  APIInteractionResponseCallbackData,
  APIMessageApplicationCommandInteraction,
  APIMessageComponentInteraction,
  APIModalInteractionResponseCallbackData,
  APIModalSubmitInteraction,
  APIUserApplicationCommandInteraction,
  ButtonStyle,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v10";

import { Button } from "./components/button/button";
import { StringSelect } from "./components/select/string_select";
import { ChannelSelect } from "./components/select/channel_select";
import { MentionableSelect, RoleSelect, UserSelect } from ".";
import { TextInput } from "./components/text_input";

export { ChannelType } from "discord-api-types/v10";

export interface BaseInteraction {
  defer(): void;
  respondWith(response: InteractionResponse): void;
  followup(response: InteractionResponse): void;
}

export interface ApplicationCommandInteraction extends BaseInteraction {
  raw: APIApplicationCommandInteraction;
  defer(): void;
}

export interface ChatInputInteraction<M extends Model>
  extends ApplicationCommandInteraction {
  raw: APIChatInputApplicationCommandInteraction;
  options: M["options"];
}

export interface MessageInteraction extends ApplicationCommandInteraction {
  raw: APIMessageApplicationCommandInteraction;
}

export interface UserInteraction extends ApplicationCommandInteraction {
  raw: APIUserApplicationCommandInteraction;
}

export interface MessageComponentInteraction extends BaseInteraction {
  raw: APIMessageComponentInteraction;
  updateWith(response: APIInteractionResponse): void;
}

export interface AutocompleteInteraction<M extends Model> {
  respondWith(response: AutocompleteInteractionResponse): void;
  options: M["options"];
  focused: keyof M["options"];
}

export interface ModalSubmitInteraction extends BaseInteraction {
  raw: APIModalSubmitInteraction;
}

export type InteractionResponse =
  | MessageInteractionResponse
  | ModalInteractionResponse
  | string
  | number;

export interface MessageInteractionResponse
  extends Omit<APIInteractionResponseCallbackData, "components"> {
  components?: MessageComponent[][] | MessageComponent[] | MessageComponent;
}

export interface ModalInteractionResponse
  extends Omit<APIModalInteractionResponseCallbackData, "components"> {
  components?: MessageComponent[][] | ModalComponent[] | ModalComponent;
}

export type AutocompleteInteractionResponse =
  APICommandAutocompleteInteractionResponseCallbackData;

export type MessageComponent =
  | Button
  | StringSelect
  | UserSelect
  | RoleSelect
  | MentionableSelect
  | ChannelSelect;
export type ModalComponent = TextInput;

export class ActionRow {}

export type Model = {
  options?: {
    [key: string]: unknown;
  };
};

type Style<T extends APIButtonComponent> = Omit<T, "style"> & {
  style: keyof T["style"];
};

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type Schema = RESTPostAPIApplicationCommandsJSONBody;
