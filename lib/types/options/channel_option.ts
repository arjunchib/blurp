import { ChannelType } from "./channel_type";
import { Option } from "./option";

export interface ChannelOption extends Option {
  /** The channels shown will be restricted to these types */
  channelTypes?: ChannelType[];
}
