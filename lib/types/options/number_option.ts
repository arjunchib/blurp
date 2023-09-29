import { Autocomplete } from "./autocomplete";
import { Choices } from "../choices";
import { Option } from "./option";
import { Value } from "./value";

export interface NumberOption<N = string, R = boolean>
  extends Option<N, R>,
    Choices<number>,
    Autocomplete,
    Value {
  type: 10;
}

export interface IntegerOption<N = string, R = boolean>
  extends Option<N, R>,
    Choices<number>,
    Autocomplete,
    Value {
  type: 4;
}
