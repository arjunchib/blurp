import { DefaultValues, SelectParams } from "./select";
import { components } from "../../../api";
import { Component } from "../component";

export interface RoleSelectParams extends SelectParams, DefaultValues {}

export interface RoleSelect extends RoleSelectParams {}

export class RoleSelect extends Component<RoleSelectParams> {
  protected toComponent(): components["schemas"]["RoleSelect"] {
    return {
      type: 6,
      custom_id: this.customId,
      default_values: this.defaultValues as any,
      placeholder: this.placeholder,
      min_values: this.minValues,
      max_values: this.maxValues,
      disabled: this.disabled,
    };
  }
}
