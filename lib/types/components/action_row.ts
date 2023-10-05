import { components } from "../../api";
import { Component } from "./component";

export interface ActionRowParams {
  components: Component[];
}

export interface ActionRow extends ActionRowParams {}

export class ActionRow extends Component<ActionRowParams> {
  protected toComponent(): components["schemas"]["ActionRow"] {
    return {
      type: 1,
      components: this.components.map((component) =>
        component["toComponent"]()
      ),
    };
  }
}
