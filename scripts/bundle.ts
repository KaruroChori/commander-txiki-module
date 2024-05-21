#!/bin/env bun
import { $ } from "bun"

await $`mkdir -p ./dist/src`
await $`mkdir -p ./dist/tests`
await $`mkdir -p ./dist/examples`
await $`mkdir -p ./dist/benchmarks`

try {
    const t = await Bun.build({
        entrypoints: ['./index.js'],
        outdir: './dist/src/',
        external: ["tjs:*"],
        target: "bun"
    })
}
catch (e) { console.error(e) }

await Bun.write("./dist/src/[module].c", `#include "../private.h"
#include "../utils.h"

void tjs__mod___MODULE___init(JSContext *ctx, JSValue ns) {
}`)
await $`mv ./dist/src/index.js ./dist/src/[module].js`
await $`cp ./typings/index.d.ts ./dist/src/[module].d.ts`
await $`cp ./LICENSE ./dist/LICENCE`


export type { }
