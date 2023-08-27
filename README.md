# ts-stupid-simple-result

Stupid-Simple Result Type in Typescript

# Usage

```typescript
const someAsyncFn = async (): Promise<string> => {
    if (Math.random() > 0.5) {
        throw new Error("Error Happend!!!")
    }
    return "OK"
}

// Somewhere else
import {toResult} from 'stupid-simple-result';

const doSomthing = async () => {
    const [ok, err] = await someAsyncFn().then(toResult)
    if (err) { /* Do some error handling */ }
    console.log(ok) // OK
}
```


# Why?

"Result" in Rust or some other languages that have Functional Features is great.

But sometime, we like more simple solution if it looks like stupid.
