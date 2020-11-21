/**
 * Vérifie si la chaîne de caractères 'key' est une clé de l'énumération 'enumeration'.
 *
 * @param enumeration
 * @param key
 */
export function hasKey<E>(enumeration: E, key: string): boolean {
  return Object.keys(enumeration).includes(key as any);
}

/**
 * Converti une chaîne de caractères en une clé d'une enumération.
 *
 * Si la chaîne de caractères n'existe pas, retourne la clé de l'énumération
 * passée en paramètres.
 */
export function toEnum<E>(
  enumeration: E,
  key: string,
  defaultEnum: E[keyof E]
): E[keyof E] {
  if (!key) {
    return defaultEnum;
  }

  key = key.toUpperCase();
  if (hasKey<E>(enumeration, key)) {
    return enumeration[key as keyof E];
  } else {
    return defaultEnum;
  }
}
