# csharp-wasm

Compilador y ejecutor de C# que corre dentro del navegador (Roslyn sobre .NET WebAssembly, mediante [WasmSharp](https://github.com/JakeYallop/WasmSharp)). Lo usan los ejercicios de C# de [Aprende a Programar con IA](https://github.com/TheScienceOfCode/Programar-con-IA).

Publicado en GitHub Pages: `https://thescienceofcode.github.io/csharp-wasm/runner.js` (carpeta `docs/`).

```js
const {init} = await import('https://thescienceofcode.github.io/csharp-wasm/runner.js');
const runner = await init({onProgress: (loaded, total) => {}});
const result = await runner.run('Console.WriteLine("Hola");');
// {success, stdOut, stdErr, diagnostics}
```

- Sin dependencias externas en tiempo de ejecución (no usa el modo worker ni Comlink). Descarga única de ~40 MB (el navegador la guarda en caché). Se ejecuta en el hilo principal: cárgalo dentro de un iframe desechable.
- Reconstruir: `npm install && npm run build` (genera `docs/`).
- Las versiones están fijadas (`@wasmsharp/core` 0.10.0, `vite` 6.4.5).

## Licencias de terceros

WasmSharp (Apache-2.0), Roslyn y el runtime de .NET (MIT).
