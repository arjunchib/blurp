const providerInstances = new Map();

export function inject<T extends new (...args: any) => any>(
  token: T
): InstanceType<T> {
  let instance = providerInstances.get(token);
  if (!instance) {
    instance = new token();
    providerInstances.set(token, instance);
  }
  return instance;
}

export function preInject<T extends new (...args: any) => any>(
  token: T,
  instance: InstanceType<T>
): InstanceType<T> {
  providerInstances.set(token, instance);
  return instance;
}
