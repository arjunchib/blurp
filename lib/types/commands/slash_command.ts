import { Option } from "../options/option";
import { ApplicationCommand } from "./application_command";

export interface SlashCommand extends ApplicationCommand {
  /** the parameters for the command */
  options?: Option[];
}
