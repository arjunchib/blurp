import { Interaction } from ".";

export interface OnInteraction {
  onInteraction(
    interaction: Interaction
  ): ((interaction: Interaction) => Promise<void> | void) | undefined;
}

export class Router implements OnInteraction {
  constructor(private controllers: (new (...args: any) => any)[]) {}

  onInteraction(
    interaction: Interaction
  ): ((interaction: Interaction) => Promise<void> | void) | undefined {
    const controllerClass = this.controllers.find((controller) => {
      const controllerName = controller.name
        .toLowerCase()
        .replace(/controller$/, "");
      return interaction?.data?.name === controllerName;
    });
    if (!controllerClass) return undefined;
    const controller = new controllerClass();
    if (interaction.type === 2) {
      if (interaction.data.type === 1) {
        return controller.chatInput.bind(controller);
      } else if (interaction.data.type === 2) {
        return controller.user.bind(controller);
      } else if (interaction.data.type === 3) {
        return controller.message.bind(controller);
      }
    } else if (interaction.type === 3) {
      return controller.messageComponent.bind(controller);
    } else if (interaction.type === 4) {
      return controller.autocomplete.bind(controller);
    } else if (interaction.type === 5) {
      return controller.modalSubmit.bind(controller);
    }
  }
}
