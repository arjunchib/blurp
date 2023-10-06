export abstract class Component<T = any> {
  constructor(params: T) {
    Object.assign(this, params);
  }

  protected abstract toComponent(): any;
}
