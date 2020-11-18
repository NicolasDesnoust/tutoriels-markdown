/**
 * Empêche un module d'être chargé plus d'une fois.
 * Cette fonction est principalement utilisée par le module Core.
 */
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import Core modules in the AppModule only.`
    );
  }
}
