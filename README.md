Netlify Type Generator
===

Turn your Netlify CMS collections into TypeScript typings!

# Features

- Primitive types, e.g. `string`, `number` and `boolean`
- Extract object widgets into own type interfaces
- Single and nested lists
- Multi-select and single option values
- Optional fields
- Unknown widgets resolve to `any` type

# Installation

The package can be installed globally or as a `devDependency` using NPM or Yarn.

**NPM:**
```bash
npm install -g netlify-ts

# or

npm install -D netlify-ts
```

**Yarn:**
```bash
yarn global add netlify-ts

# or

yarn add -D netlify-ts
```

# Usage

## Method #1: CLI

The main method of usage is through the command-line. Having installed the package either globally or in project's `devDependencies`, simply call `netlify-ts` with a parameter pointing to your Netlify CMS admin `config.yml` file.

```bash
netlify-ts public/admin/config.yml
```

This generates by default a `netlify-types.ts` file in the project root containing types for your netlify content types.

### Custom output location

You can also specify a custom output location by providing a second optional parameter. Omitting the filename outputs a file in the given directory with the default filename (`netlify-types.ts`).


```bash
netlify-ts public/admin/config.yml src/my-types.ts
```

## Method #2: Programmatically

In case the CLI doesn't suit your project workflow or you need to invoke the type generation inside your code we've got you covered. The project exposes a `default` async function that returns the generated type file.

```javascript
const fs = require("fs").promises;
const netlifyTs = require("netlify-ts").default;

async function main() {
  const types = await netlifyTs("public/admin/config.yml");
  await fs.writeFile("my-types.ts", types);
}

main();
```

# License

MIT
