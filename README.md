# ts-stupid-simple-result

Stupid-Simple Result Type in Typescript


# Install

```
npm i stupid-simple-result
```

# Usage

```typescript
const someAsyncFn = async (): Promise<string> => {
    if (Math.random() > 0.5) {
        throw new Error("Error Happend!!!")
    }
    return "OK"
}

// Somewhere else
import {toOk, toErr} from 'stupid-simple-result';

const doSomthing = async () => {
    const [ok, err] = await someAsyncFn().then(toOk).catch(toErr)
    if (err) { /* Do some error handling */ }
    console.log(ok) // OK
}

import {wrapPromise} from 'stupid-simple-result';
const doAnother = async () => {
    const [ok, err] = await wrapPromise(someAsyncFn())
    if (err) { /* Do some error handling */ }
    console.log(ok) // OK
}
```


# Why?

"Result" in Rust or some other languages that have Functional Features is great.

But sometime, we like more simple solution if it looks like stupid.
