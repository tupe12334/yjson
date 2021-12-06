import { flags } from "@oclif/command";
import { writeFileSync } from "fs";
import Command from "../base";

const PACKAGE_NAME_ARG_KEY = "packageName";

export default class Add extends Command {
  static description = "Add a npm package to your docs";
  static examples = [`$ yjson add lerna`];
  // static flags = {
  //   help: flags.string({ description: "name of the package", required: true }),
  // };
  static args = [{ name: PACKAGE_NAME_ARG_KEY, required: false }];
  async run(): Promise<void> {
    const { args } = this.parse(Add);
    const packageName = args[PACKAGE_NAME_ARG_KEY];
    const packageJson = this.packageJson;
    const packageVersion = packageJson.dependencies[packageName];
    const newYJson = this.yJson;
    newYJson.dependencies[packageName] = {
      version: packageVersion,
      addingDate: new Date(),
    };
    await this.writeYjson(newYJson);
  }
}
