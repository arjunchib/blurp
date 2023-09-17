export function matchObject(a: any, b: any): boolean {
  return Object.keys(b).every((k) => {
    if (typeof a[k] !== typeof b[k]) return false;
    if (typeof a[k] === "object") return matchObject(a[k], b[k]);
    return a[k] === b[k];
  });
}
