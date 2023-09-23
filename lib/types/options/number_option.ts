import { Autocomplete } from "./autocomplete";
import { Choices } from "../choices";
import { Option } from "./option";
import { Value } from "./value";

export interface NumberOption
  extends Option,
    Choices<number>,
    Autocomplete,
    Value {}

export interface IntegerOption
  extends Option,
    Choices<number>,
    Autocomplete,
    Value {}
