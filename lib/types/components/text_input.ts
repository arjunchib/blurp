import { components } from "../../api";
import { Component } from "./component";

export interface TextInputParams {
  customId: string;
  style?: "short" | "paragraph";
  label: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}

export interface TextInput extends TextInputParams {}

export class TextInput extends Component<TextInputParams> {
  toComponent(): components["schemas"]["InputText"] {
    return {
      type: 4,
      custom_id: this.customId,
      style: this.componentStyle,
      label: this.label,
      min_length: this.minLength,
      max_length: this.maxLength,
      required: this.required,
      value: this.value,
      placeholder: this.placeholder,
    };
  }

  private get componentStyle() {
    return this.style === "paragraph" ? 2 : 1;
  }
}
