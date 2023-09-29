import { Option } from "./option";
import { SubCommandOption } from "./sub_command_option";

export interface SubCommandGroupOption<Name = string, Required = boolean>
  extends Option<Name, Required> {
  type: 2;
  /** The parameters for the options */
  options: SubCommandOption[];
}
