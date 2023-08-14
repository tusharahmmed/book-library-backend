const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Partial<T> => {
  const finalObject: Partial<T> = {};

  for (const element of keys) {
    if (obj && Object.hasOwnProperty.call(obj, element)) {
      finalObject[element] = obj[element];
    }
  }
  return finalObject;
};

export default pick;
