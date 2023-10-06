import { Interaction } from "./interactions/interaction";
import { MessageComponentInteraction } from "./interactions/message_component_interaction";
import { AutocompleteInteraction } from "./interactions/autocomplete_interaction";
import { SlashInteraction } from "./interactions/slash_interaction";

export interface OnInteraction {
  onInteraction(interaction: any): Route | undefined;
}

export interface Route {
  controller: (interaction: Interaction) => Promise<void> | void;
  interaction: new (args: any) => Interaction;
}

export class Router implements OnInteraction {
  private controllerInstance?: any;

  constructor(private controllers: (new (...args: any) => any)[]) {}

  onInteraction(interaction: any): Route | undefined {
    const controllerClass = this.controllers.find((controller) => {
      const controllerName = controller.name
        .toLowerCase()
        .replace(/controller$/, "");
      const interactionName =
        interaction?.data?.name || interaction?.message?.interaction?.name;
      return interactionName === controllerName;
    });
    if (!controllerClass) return undefined;
    this.controllerInstance = new controllerClass();
    if (interaction.type === 2) {
      if (interaction.data.type === 1) {
        return this.createRoute("slash");
      } else if (interaction.data.type === 2) {
        return this.createRoute("user");
      } else if (interaction.data.type === 3) {
        return this.createRoute("message");
      }
    } else if (interaction.type === 3) {
      return this.createRoute("messageComponent", MessageComponentInteraction);
    } else if (interaction.type === 4) {
      return this.createRoute("autocomplete", AutocompleteInteraction);
    } else if (interaction.type === 5) {
      return this.createRoute("modalSubmit");
    }
  }

  private createRoute(
    methodName: string,
    interactionClass?: new (args: any) => Interaction
  ): Route | undefined {
    if (!this.controllerInstance?.[methodName]) return undefined;
    return {
      controller: this.controllerInstance[methodName].bind(
        this.controllerInstance
      ),
      interaction: interactionClass || SlashInteraction,
    };
  }
}
