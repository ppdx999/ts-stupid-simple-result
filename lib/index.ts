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

const NothingPassed = Symbol(
  "github.com/ppdx999/ts-stupid-simple-result:NothingPassed"
);
type NothingPassed = typeof NothingPassed;

export type Result<
  A,
  B = Error,
  C = NothingPassed,
  D = NothingPassed,
  E = NothingPassed,
  F = NothingPassed,
  G = NothingPassed,
  H = NothingPassed,
  I = NothingPassed
> = C extends NothingPassed
  ? Result2<A, B>
  : D extends NothingPassed
  ? Result3<A, B, C>
  : E extends NothingPassed
  ? Result4<A, B, C, D>
  : F extends NothingPassed
  ? Result5<A, B, C, D, E>
  : G extends NothingPassed
  ? Result6<A, B, C, D, E, F>
  : H extends NothingPassed
  ? Result7<A, B, C, D, E, F, G>
  : I extends NothingPassed
  ? Result8<A, B, C, D, E, F, G, H>
  : Result9<A, B, C, D, E, F, G, H, I>;

export const toOk = <T, E = Error>(v: T): Result<T, E> => [v, null];
export const toErr = <T, E = Error>(e: E): Result<T, E> => [null, e];

export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

export const wrapPromise = <T, E = Error>(p: Promise<T>): AsyncResult<T, E> =>
  p
    .then(toOk as (v: T) => Result<T, E>)
    .catch(
      (e) =>
        toErr(e instanceof Error ? e : new Error(String(e))) as Result<T, E>
    );

// just an alias of wrapPromise
export const R = wrapPromise;

const isOk = <T, E>(r: Result<T, E>): r is [T, null] => r[1] === null;

export const allOk = <T, E = Error>(
  ...rs: Result<T, E>[]
): Result<T[], E[]> => {
  const oks = rs.filter(isOk).map((r) => r[0]);
  const errs = rs.filter((r) => !isOk(r)).map((r) => r[1]!);

  return errs.length === 0 ? [oks, null] : [null, errs];
};

export const asyncAllOk = async <T, E = Error>(
  ...rs: AsyncResult<T, E>[]
): AsyncResult<T[], E[]> => {
  const isOk = (r: Result<T, E>): r is [T, null] => r[1] === null;

  const oks = (await Promise.all(rs)).filter(isOk).map((r) => r[0]);
  const errs = (await Promise.all(rs))
    .filter((r) => !isOk(r))
    .map((r) => r[1]!);

  return errs.length === 0 ? [oks, null] : [null, errs];
};
