#!/bin/env bun
try {
    const t = await Bun.build({
        entrypoints: ['./index.js'],
        outdir: './dist',
        external: ["tjs:*"], // default: []
        target: "bun"
    })
}
catch (e) { console.error(e) }


export type { }
//TODO: Run meson

