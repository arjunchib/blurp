import { Interaction } from "./interaction";
import { Choice } from "../types/choices";
import { snakeCaseKeys } from "../utils/snake_case_keys";
import { Option, SlashCommand } from "..";
import {
  ExpandRecursively,
  IsRequired,
  OptionType,
  OptionValueType,
} from "./slash_interaction";

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
  value?: any;
  options?: any;
  focused: boolean;
}

export interface AutocompleteInteraction {
  data: AutocompleteInteractionData;
}

export type Objectify<T extends Option[]> = {
  [P in T extends Option[] ? T[number] : never as P["name"]]: IsRequired<
    {
      type: OptionType<P>;
      value: OptionValueType<P>;
      options: P extends { options: Option[] }
        ? Objectify<P["options"]>
        : never;
      focused: boolean;
    },
    P["required"]
  >;
};

export class AutocompleteInteraction<
  T extends SlashCommand = SlashCommand
> extends Interaction {
  private _options?: any;

  get options(): ExpandRecursively<Objectify<NonNullable<T["options"]>>> {
    this._options ||= this.mappedOptions(this.data.options || []);
    return this._options;
  }

  private mappedOptions(options: any[]) {
    const mappedOptions: any = {};
    options?.forEach((option) => {
      mappedOptions[option.name] = { ...option };
      delete mappedOptions[option.name].name;
      if (option.options) {
        mappedOptions[option.name].options = this.mappedOptions(option.options);
      }
    });
    return mappedOptions;
  }

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
