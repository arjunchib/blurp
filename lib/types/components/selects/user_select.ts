import { DefaultValues, SelectParams } from "./select";
import { components } from "../../../api";
import { Component } from "../component";

export interface UserSelectParams extends SelectParams, DefaultValues {}

export interface UserSelect extends UserSelectParams {}

export class UserSelect extends Component<UserSelectParams> {
  protected toComponent(): components["schemas"]["UserSelect"] {
    return {
      type: 5,
      custom_id: this.customId,
      default_values: this.defaultValues as any,
      placeholder: this.placeholder,
      min_values: this.minValues,
      max_values: this.maxValues,
      disabled: this.disabled,
    };
  }
}
