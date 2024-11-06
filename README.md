# `ansx` (ansi syntax)

ANSI Syntax is a markup language for ANSI escape sequences used to render terminal apps.

- inspired by HTML (`class`, built-in elements)
- supports a subset of CSS (style)
- Built on top of JavaScript tagged template literals (no build step)

## Example

```js
import { ansx } from 'ansx'

const text = ansx`
    <div>Hello <span>user</span>!</div>

    <style>
        span {
            color: cyan;
        }
    </style>
`

console.log(text);
```
