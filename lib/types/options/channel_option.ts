import { ChannelType } from "./channel_type";
import { Option } from "./option";

export interface ChannelOption<N = string, R = boolean> extends Option<N, R> {
  type: 7;
  /** The channels shown will be restricted to these types */
  channelTypes?: ChannelType[];
}
