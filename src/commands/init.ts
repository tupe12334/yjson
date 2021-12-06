import { writeFileSync } from "fs";
import Command from "../base";
import { getUserEmail } from "../utils/git";

export default class Init extends Command {
  static description = "init a y.json file in a repository";
  static examples = [`$ yjson init`];
  static flags = {
    ...Command.flags,
  };
  async run(): Promise<void> {
    const newPackageJson = this.packageJson;

    if (newPackageJson.scripts.postinstall) throw new Error("not valid"); // TODO give feedback
    if (newPackageJson.scripts.postuninstall) throw new Error("not valid"); // TODO give feedback
    newPackageJson.scripts.postinstall = "yjson add";
    newPackageJson.scripts.postuninstall = "yjson add";

    await this.writeJsonFile(newPackageJson, this.packageJsonPath);
    const yjsonObject = {
      name: this.packageJson.name,
      packageJsonPath: this.packageJsonPath,
      dependencies: {},
    };
    await this.writeYjson(yjsonObject);
  }
}
