export interface Choices<T extends string | number> {
  /** Choices for the user to pick from, max 25 */
  choices?: T[];
}
