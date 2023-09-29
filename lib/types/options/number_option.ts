import { Autocomplete } from "./autocomplete";
import { Choices } from "../choices";
import { Option } from "./option";
import { Value } from "./value";

export interface NumberOption<Name = string, Required = boolean>
  extends Option<Name, Required>,
    Choices<number>,
    Autocomplete,
    Value {
  type: 10;
}

export interface IntegerOption<Name = string, Required = boolean>
  extends Option<Name, Required>,
    Choices<number>,
    Autocomplete,
    Value {
  type: 4;
}
