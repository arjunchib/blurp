const providerInstances = new Map();

export function inject<T extends new (...args: any) => any>(
  provider: T
): InstanceType<T> {
  let instance = providerInstances.get(provider);
  if (!instance) {
    instance = new provider();
    providerInstances.set(provider, instance);
  }
  return instance;
}
