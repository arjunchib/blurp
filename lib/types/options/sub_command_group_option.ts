import { Option } from "./option";
import { SubCommandOption } from "./sub_command_option";

export interface SubCommandGroupOption<
  N = string,
  R = boolean,
  O = SubCommandOption
> extends Option<N, R> {
  type: 2;
  /** The parameters for the options */
  options: O[];
}
