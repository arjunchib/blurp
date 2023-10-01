const providerInstances = new Map();

export function inject<T extends new (...args: any) => any>(
  token: T,
  instance?: InstanceType<T>
): InstanceType<T> {
  if (instance) {
    providerInstances.set(token, instance);
    return instance;
  }
  instance = providerInstances.get(token);
  if (!instance) {
    instance = new token();
    providerInstances.set(token, instance);
  }
  return instance!;
}

export function factory<T>(fn: () => T): new () => T {
  return fn as any;
}
