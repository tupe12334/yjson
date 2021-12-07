import { flags } from "@oclif/command";
import { writeFileSync } from "fs";
import Command, { AddActionsEnum } from "../baseCrud";
import { getUserEmail } from "../utils/git";

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
  static args = [{ name: Command.PACKAGE_NAME_ARG_KEY, required: false }];
  async run(): Promise<void> {
    const { args, flags } = this.parse(Add);
    const addAllPromise = this.addAllMissingPackages();
    const packageName = args[Command.PACKAGE_NAME_ARG_KEY];
    if (!packageName) {
      await addAllPromise;
      this.log("Running on all dependencies and add them to the y.json");
    } else {
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

  async addAllMissingPackages(): Promise<void> {
    if (!this.packageJson.dependencies)
      throw new Error("Package.json is missing dependencies property");

    for (const dependency of Object.entries(this.packageJson.dependencies)) {
      const dependencyName = dependency[0];
      if (this.yJson.dependencies[dependencyName]) {
      } else {
        await Add.run([dependencyName, `--action=${AddActionsEnum.Add}`]);
      }
    }
  }
}
