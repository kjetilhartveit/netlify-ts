import yargs from "yargs";
import ora from "ora";
import { OUTPUT_FILENAME } from "./constants";
import { outputFile } from "./output";
import { loadConfig } from "./input";
import { generateTypes } from "./generate";
import type { NetlifyTsOptions } from "./types";

interface CommandArguments extends NetlifyTsOptions {
  input: string;
  output?: string;
}

const args = yargs
  .command<CommandArguments>("$0 [options] <input> [output]", "Output generated types from input")
  .option("label", {
    demandOption: false,
    default: true,
    describe: `use 'label_singular' or 'label' as interface name`,
    type: "boolean",
  })
  .demandCommand(2).argv;

let spinner: ora.Ora;

export const run = async (): Promise<void> => {
  try {
    const { input, output = OUTPUT_FILENAME, label } = await args;

    spinner = ora("Loading config").start();

    const collections = loadConfig(input);

    spinner.succeed().start("Generating types");

    const types = generateTypes(collections, { label });

    spinner.succeed().start("Saving file");

    outputFile(output, types);

    spinner.succeed();
  } catch (error: any) {
    spinner.fail(error.message);
  }
};
