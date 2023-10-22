import * as esbuild from "esbuild"

await esbuild.build({
  entryPoints: ["src/server/server.mjs", "src/cli/bin.mjs", "src/server/util/*"],
  bundle: true,
  platform: "node",
  target: ["node10.4"],
  outdir: "build",
})
