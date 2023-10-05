import { Emoji } from "../emoji";

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Emoji;
  default?: boolean;
}

export interface SelectDefaultValue {
  id: string;
  type: "user" | "role" | "channel";
}

export interface DefaultValues {
  defaultValues?: SelectDefaultValue[];
}

export interface SelectParams {
  customId: string;
  placeholder?: string;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}
