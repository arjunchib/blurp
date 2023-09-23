import { Localizations } from "./options/localizations";

export interface Choices<T extends string | number> {
  /** Choices for the user to pick from, max 25 */
  choices?: Choice<T>[];
}

export interface Choice<T = string | number> {
  name: string;
  nameLocalizations?: Localizations[];
  value: T;
}
