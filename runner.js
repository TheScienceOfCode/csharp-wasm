// Entry module published at <pages-url>/runner.js
//
//   const {init} = await import('https://thescienceofcode.github.io/csharp-wasm/runner.js');
//   const runner = await init({onProgress: (loaded, total) => {}});
//   const result = await runner.run('Console.WriteLine("Hola");');
//   // {success, stdOut, stdErr, diagnostics}
//
// The compiler runs on the page's main thread (no web worker), so a runaway program freezes whatever
// hosts it: load it inside a disposable iframe and discard the iframe on timeout.
// WasmSharpWorker is imported by path: the package entry (WasmCompiler) also pulls Comlink from unpkg at runtime,
// which is only needed for the web-worker mode that this runner does not use.
import { WasmSharpWorker } from "./node_modules/@wasmsharp/core/WasmSharpWorker.js";

const PREAMBLE = "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n";

export async function init({ onProgress } = {}) {
  const module = await WasmSharpWorker.initializeAsync(
    {},
    { onDownloadResourceProgress: (loaded, total) => onProgress?.(loaded, total) },
  );
  return {
    /** Compiles and runs a C# program (top-level statements allowed). Common usings are added. */
    async run(code) {
      const compilation = await module.createCompilationAsync(PREAMBLE + code);
      return await compilation.run();
    },
  };
}
