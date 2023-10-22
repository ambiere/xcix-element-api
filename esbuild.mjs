import * as esbuild from "esbuild"

await esbuild.build({
  entryPoints: ["src/server/server.mjs", "src/cli/bin.mjs", "src/server/util/*"],
  bundle: true,
  platform: "node",
  target: ["node14.0", "node16.0", "node18.0"],
  outdir: "build",
})
