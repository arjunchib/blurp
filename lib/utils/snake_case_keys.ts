import { camelCase } from "camel-case";

export function snakeCaseKeys(from: Record<string, any>, to: any) {
  for (const [k, v] of Object.entries(from)) {
    to[camelCase(k)] = v;
  }
}
