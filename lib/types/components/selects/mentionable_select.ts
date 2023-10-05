import { DefaultValues, SelectParams } from "./select";
import { components } from "../../../api";
import { Component } from "../component";

export interface MentionableSelectParams extends SelectParams, DefaultValues {}

export interface MentionableSelect extends MentionableSelectParams {}

export class MentionableSelect extends Component<MentionableSelectParams> {
  toComponent(): components["schemas"]["MentionableSelect"] {
    return {
      type: 7,
      custom_id: this.customId,
      default_values: this.defaultValues as any,
      placeholder: this.placeholder,
      min_values: this.minValues,
      max_values: this.maxValues,
      disabled: this.disabled,
    };
  }
}
