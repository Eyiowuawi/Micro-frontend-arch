/**
 * Helper function to load remote modules at runtime
 * This prevents webpack from trying to resolve them during build
 */
export function loadRemoteModule<T = any>(
  remoteName: string,
  modulePath: string
): Promise<T> {
  // This is evaluated at runtime, not during build
  return import(/* webpackIgnore: true */ `${remoteName}/${modulePath}` as any);
}
