type Result2<A, B> = [A, null] | [null, B];
type Result3<A, B, C> = [A, B, null] | [null, null, C];
type Result4<A, B, C, D> = [A, B, C, null] | [null, null, null, D];
type Result5<A, B, C, D, E> = [A, B, C, D, null] | [null, null, null, null, E];
type Result6<A, B, C, D, E, F> =
  | [A, B, C, D, F, null]
  | [null, null, null, null, null, E];
type Result7<A, B, C, D, E, F, G> =
  | [A, B, C, D, F, G, null]
  | [null, null, null, null, null, null, E];
type Result8<A, B, C, D, E, F, G, H> =
  | [A, B, C, D, F, G, H, null]
  | [null, null, null, null, null, null, null, E];
type Result9<A, B, C, D, E, F, G, H, I> =
  | [A, B, C, D, F, G, H, I, null]
  | [null, null, null, null, null, null, null, null, E];

// combine all result types into one
export type Result<
  A,
  B,
  C = undefined,
  D = undefined,
  E = undefined,
  F = undefined,
  G = undefined,
  H = undefined,
  I = undefined
> =
  | Result2<A, B>
  | Result3<A, B, C>
  | Result4<A, B, C, D>
  | Result5<A, B, C, D, E>
  | Result6<A, B, C, D, E, F>
  | Result7<A, B, C, D, E, F, G>
  | Result8<A, B, C, D, E, F, G, H>
  | Result9<A, B, C, D, E, F, G, H, I>;

export const toOk = <T, E = Error>(v: T): Result<T, E> => [v, null];
export const toErr = <T, E = Error>(e: E): Result<T, E> => [null, e];

export const wrapPromise = <T, E = Error>(
  p: Promise<T>
): Promise<Result<T, E>> =>
  p
    .then(toOk as (v: T) => Result<T, E>)
    .catch(
      (e) =>
        toErr(e instanceof Error ? e : new Error(String(e))) as Result<T, E>
    );
