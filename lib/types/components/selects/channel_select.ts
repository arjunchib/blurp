import { DefaultValues, SelectParams } from "./select";
import { components } from "../../../api";
import { ChannelType } from "../../options/channel_type";
import { Component } from "../component";

export interface ChannelSelectParams extends SelectParams, DefaultValues {
  channelTypes: ChannelType[];
}

export interface ChannelSelect extends ChannelSelectParams {}

export class ChannelSelect extends Component<ChannelSelectParams> {
  toComponent(): components["schemas"]["ChannelSelect"] {
    return {
      type: 8,
      custom_id: this.customId,
      channel_types: this.channelTypes as any[],
      default_values: this.defaultValues as any,
      placeholder: this.placeholder,
      min_values: this.minValues,
      max_values: this.maxValues,
      disabled: this.disabled,
    };
  }
}
