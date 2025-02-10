// import { createRequire } from 'module';
// import { extname } from 'path';
// import { promises as fs } from 'fs';

// /**
//  * @param {string} definitionPath Path to the Swagger definition file
//  */
// export async function loadDefinition(definitionPath) {
//   const loadModule = async () => {
//     const esmodule = await import(definitionPath);
//     return esmodule.default;
//   };

//   const loadCJS = () => {
//     const require = createRequire(import.meta.url);
//     return require(definitionPath);
//   };

//   const loadJson = async () => {
//     const fileContents = await fs.readFile(definitionPath);
//     return JSON.parse(fileContents);
//   };

//   const LOADERS = {
//     '.js': loadModule,
//     '.mjs': loadModule,
//     '.cjs': loadCJS,
//     '.json': loadJson,
//   };

//   const loader = LOADERS[extname(definitionPath)];

//   if (!loader) {
//     throw new Error(`Definition file should be one of: ${Object.keys(LOADERS).join(', ')}`);
//   }

//   return await loader();
// }
