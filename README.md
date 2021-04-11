

Install dependecies with:

```yarn```

Run tests with:

```yarn test```




You could generate a diagram with (But no with dependecy inyection!):
`yarn diagramDependencies`
_Remeber to install (Graphviz with Choco)[https://community.chocolatey.org/packages/Graphviz] to ensure is installed on path._
Result will be in `./tools/grpahs/*.svg`



<br>


# TODO

- Bind dependencies on async import to load only modules required by the code (Serverless!)
<br>

<br>

<br>

________________

Cloned repo from: https://github.com/Envek/aws-sam-typescript-layers-example 

Readme from the project:
# typescript-jest-example
This is an example project for the following articles on [medium.com](https://medium.com):
- [Testing with JEST in TypeScript](https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421)
- [Debug your tests in TypeScript with Visual Studio Code](https://bromix.medium.com/debug-your-tests-in-typescript-with-visual-studio-code-911a4cada9cd)

## Project setup
```
npm install
```

### Compile to typescript
```
npm run build
```

### Run tests
```
npm test
```
