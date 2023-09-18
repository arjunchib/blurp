export interface OnInteraction {
  onInteraction(interaction: any): any | Promise<any>;
}

export class NameRouter implements OnInteraction {
  static errorResponse = {
    type: 4,
    data: { content: "Error!" },
  };

  constructor(private controllers: (new (...args: any) => any)[]) {}

  onInteraction(interaction: any) {
    const controllerClass = this.controllers.find((controller) => {
      const controllerName = controller.name
        .toLowerCase()
        .replace(/controller$/, "");
      return interaction?.data?.name === controllerName;
    });
    if (!controllerClass) return NameRouter.errorResponse;
    const controller = new controllerClass();
    if (interaction.type === 2) {
      if (interaction.data.type === 1) {
        return controller.chatInput(interaction);
      } else if (interaction.data.type === 2) {
        return controller.user(interaction);
      } else if (interaction.data.type === 3) {
        return controller.message(interaction);
      }
    } else if (interaction.type === 3) {
      return controller.messageComponent(interaction);
    } else if (interaction.type === 4) {
      return controller.autocomplete(interaction);
    } else if (interaction.type === 5) {
      return controller.modalSubmit(interaction);
    }
  }
}
