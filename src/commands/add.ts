import { flags } from "@oclif/command";
import { writeFileSync } from "fs";
import Command from "../base";
import { getUserEmail } from "../utils/git";

const PACKAGE_NAME_ARG_KEY = "packageName";

export enum AddActionsEnum {
  "Add" = "Add",
  "Update" = "Update",
}

export default class Add extends Command {
  static description = "Add a npm package to your docs";
  static examples = [`$ yjson add lerna`];
  static flags = {
    action: flags.enum({
      char: "a",
      options: Object.values(AddActionsEnum),
      default: AddActionsEnum.Add,
      required: false,
    }),
    ...Command.flags,
  };
  static args = [{ name: PACKAGE_NAME_ARG_KEY, required: false }];
  async run(): Promise<void> {
    const { args, flags } = this.parse(Add);
    const packageName = args[PACKAGE_NAME_ARG_KEY];
    const email = await getUserEmail();
    const packageJson = this.packageJson;
    if (!packageJson.dependencies)
      throw new Error("Package.json is missing dependencies property");

    const packageVersion = packageJson.dependencies[packageName];
    const newYJson = this.yJson;
    newYJson.dependencies[packageName] = {
      version: packageVersion,
      addingDate: new Date(),
      blame: email,
      action: flags.action,
    };
    await this.writeYjson(newYJson);
  }
}
