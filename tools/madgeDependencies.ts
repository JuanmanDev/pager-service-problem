import fs from 'fs';

// eslint-disable-next-line import/no-extraneous-dependencies
const madge = require('madge'); // :( this is corrently imported

const dependencyImagePath = 'tools/graphs/dependencyInjection.svg';

export async function GeneraMagdeDepenciesDiagram() {
  const files = fs.readdirSync('./src/implementation/DomainLogicServerless');

  const dependencies: { [key: string]: string[] } = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    const filename: string = file.substr(0, file.length - 3);
    // eslint-disable-next-line no-await-in-loop
    const module = await import(`../src/implementation/DomainLogicServerless/${filename}`);
    if (module.dependencies) {
      // INTERFACE
      const interfaceName = filename.substr(0, filename.length - 10);
      if (dependencies[interfaceName]) {
        dependencies[interfaceName].push(filename);
      } else {
        dependencies[interfaceName] = [filename];
      }

      if (dependencies[filename]) {
        dependencies[filename].push(...(Object.values(module.dependencies) as string[]));
      } else {
        dependencies[filename] = Object.values(module.dependencies);
      }
      // console.log(module.dependencies);
    }
  }

  madge(dependencies)
    .then((res: any) => res.image(dependencyImagePath))
    .then((writtenImagePath: string) => {
      console.log(`Image written to ${writtenImagePath}`);
    });
}

if (require.main === module) {
  GeneraMagdeDepenciesDiagram();
}
