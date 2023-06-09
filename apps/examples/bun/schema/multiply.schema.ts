import {
  ApplicationCommandOptionType,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v10";

export const MultiplySchema = {
  name: "multiply",
  description: "multiply operation",
  options: [
    {
      name: "a",
      description: "first operand",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "b",
      description: "second operand",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
} satisfies RESTPostAPIApplicationCommandsJSONBody;
