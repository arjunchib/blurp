import { Option } from "./option";
import { SubCommandOption } from "./sub_command_option";

export interface SubCommandGroupOption extends Option {
  /** The parameters for the options */
  options: SubCommandOption[];
}
