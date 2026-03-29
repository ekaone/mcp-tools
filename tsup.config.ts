import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  banner: {
    js: "#!/usr/bin/env node",
  },
  clean: true,
  minify: true,
  sourcemap: true,
});
