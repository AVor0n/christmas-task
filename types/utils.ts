export type DeepPartial<TObject> = TObject extends unknown[]
  ? TObject
  : TObject extends object
    ? {
      [TKey in keyof TObject]?: DeepPartial<TObject[TKey]>;
    }
    : TObject;

export type KeysOfType<O, T> = {
  [K in keyof O]: O[K] extends T
    ? `${K & string}`
    : O[K] extends Record<string, unknown>
      ? `${K & string}.${KeysOfType<O[K], T>}`
      : never;
}[keyof O];
