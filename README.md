# `ansx` (ansi syntax)

ANSI Syntax is an EXPERIMENTAL markup language for ANSI escape sequences. Use it to render terminal apps!

- inspired by HTML (`class`, built-in elements)
- supports a subset of CSS (style)
- Built on top of JavaScript tagged template literals (no build step)

## Development

Run `pnpm start` to run the `./demo.ts` file.

## Example

```js
import { ansx } from "ansx";

function main() {
    const name = 'user';
    const output = ansx/* html */`
        <div>
            <h1>Greetings <span class="name">${name}</span></h1>
            <p>🫡  It is your lucky day!</p>
        </div>
        <style>
            h1 {
                color: green;
                margin-left: 3;
            }
            .name {
                color: black;
                background: cyan;
                padding-inline: 1;
            }
            p {
                color: yellow;
            }
        </style>
    `
    console.log(output);
}

main();
```
