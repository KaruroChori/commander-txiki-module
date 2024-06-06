#!/bin/env bun
import { $ } from "bun"

await $`mkdir -p ./dist/src`
await $`mkdir -p ./dist/tests`
await $`mkdir -p ./dist/examples`
await $`mkdir -p ./dist/benchmarks`
await $`mkdir -p ./dist/bundle`

try {
    const t = await Bun.build({
        entrypoints: ['./index.js'],
        outdir: './dist/src/',
        external: ["tjs:*"],
        target: "bun",
        minify: {
        whitespace: true,
        identifiers: false,
        syntax: true,
      },
    })
}
catch (e) { console.error(e) }

await Bun.write("./dist/src/module.c", `#include "module.h"
#include "../../utils.h"

void tjs__mod___MODULE___init(JSContext *ctx, JSValue ns) {
}`)
await Bun.write("./dist/src/module.h", `#pragma once

#include "../../private.h"
#include "../../utils.h"

#ifdef __cplusplus
extern "C" {
#endif
void tjs__mod___MODULE___init(JSContext *ctx, JSValue ns);
#ifdef __cplusplus
}
#endif`)
await $`mv ./dist/src/index.js ./dist/bundle/[module].js`
await $`cp ./typings/index.d.ts ./dist/bundle/[module].d.ts`
await $`cp ./LICENSE ./dist/LICENCE`


export type { }
