import { Autocomplete } from "./autocomplete";
import { Choices } from "./choices";
import { Option } from "./option";

export interface StringOption extends Option, Choices<string>, Autocomplete {
  /** the minimum allowed length (minimum of 0, maximum of 6000) */
  minLength?: number;
  /** the maximum allowed length (minimum of 1, maximum of 6000) */
  maxLength?: number;
}
