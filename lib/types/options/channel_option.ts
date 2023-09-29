import { ChannelType } from "./channel_type";
import { Option } from "./option";

export interface ChannelOption<Name = string, Required = boolean>
  extends Option<Name, Required> {
  type: 7;
  /** The channels shown will be restricted to these types */
  channelTypes?: ChannelType[];
}
