import { SelectOption, SelectParams } from "./select";
import { components } from "../../../api";
import { Component } from "../component";

export interface StringSelectParams extends SelectParams {
  options: SelectOption[] | string[];
}

export interface StringSelect extends StringSelectParams {}

export class StringSelect extends Component<StringSelectParams> {
  protected toComponent(): components["schemas"]["StringSelect"] {
    return {
      type: 3,
      custom_id: this.customId,
      options: this.componentOptions,
      placeholder: this.placeholder,
      min_values: this.minValues,
      max_values: this.maxValues,
      disabled: this.disabled,
    };
  }

  private get componentOptions(): components["schemas"]["StringSelect"]["options"] {
    if (this.isStringArray(this.options)) {
      return this.options.map((option) => ({ label: option, value: option }));
    } else {
      return this.options;
    }
  }

  private isStringArray(arr: any[]): arr is string[] {
    return typeof arr?.[0] === "string";
  }
}
