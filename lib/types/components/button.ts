import { Emoji } from "./emoji";
import { components } from "../../api";
import { Component } from "./component";

export interface BaseButtonParams {
  label?: string;
  emoji?: Emoji;
  disabled?: boolean;
}

export interface ButtonParams extends BaseButtonParams {
  style?: "primary" | "secondary" | "success" | "danger";
  customId?: string;
}

export interface Button extends ButtonParams {}

export class Button extends Component<ButtonParams> {
  protected toComponent(): components["schemas"]["Button"] {
    return {
      type: 2,
      style: this.componentStyle,
      emoji: this.emoji,
      label: this.label,
      disabled: this.disabled,
      custom_id: this.customId,
    };
  }

  private get componentStyle(): components["schemas"]["Button"]["style"] {
    switch (this.style) {
      case "primary":
        return 1;
      case "secondary":
        return 2;
      case "success":
        return 3;
      case "danger":
        return 4;
      default:
        return 1;
    }
  }
}
