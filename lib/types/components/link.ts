import { components } from "../../api";
import { BaseButtonParams } from "./button";
import { Component } from "./component";

export interface LinkParams extends BaseButtonParams {
  url?: string;
}

export interface Link extends LinkParams {}

export class Link extends Component<LinkParams> {
  protected toComponent(): components["schemas"]["Button"] {
    return {
      type: 2,
      style: 5,
      emoji: this.emoji,
      label: this.label,
      disabled: this.disabled,
      url: this.url,
    };
  }
}
