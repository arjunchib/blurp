import { Interaction } from "./interaction";
import { Choice } from "../types/choices";
import { snakeCaseKeys } from "../utils/snake_case_keys";

export interface AutocompleteInteractionData<
  T = AutocompleteInteractionDataOption
> {
  id: string;
  name: string;
  type: 1;
  resolved?: any;
  options?: T[];
  guildId: string;
  targetId?: string;
}

interface AutocompleteInteractionDataOption {
  name: string;
  type: number;
  value: any;
  options?: any;
  focused: boolean;
}

export interface AutocompleteInteraction {
  data: AutocompleteInteractionData;
}

export class AutocompleteInteraction extends Interaction {
  respondWith(choices: Choice[]) {
    const data = {
      choices: choices.map((choice) => {
        const choiceSnake = {};
        snakeCaseKeys(choice, choiceSnake);
        return choiceSnake;
      }),
    };
    this.resolve({
      type: 8,
      data,
    });
  }
}
