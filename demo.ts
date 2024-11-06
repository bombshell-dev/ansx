import { ansx } from "./index.ts";

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
