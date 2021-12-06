import { writeFileSync } from "fs";
import Command from "../base";
import { getUserEmail } from "../utils/git";
import { addCommandToScript } from "../utils/packageJson";

const POST_INSTALL_COMMAND = "yjson update";
const POST_UNINSTALL_COMMAND = "yjson update";

export default class Init extends Command {
  static description = "init a y.json file in a repository";
  static examples = [`$ yjson init`];
  static flags = {
    ...Command.flags,
  };
  async run(): Promise<void> {
    const newPackageJson = this.packageJson;
    const packageJsonWithPostinstall = addCommandToScript(
      newPackageJson,
      POST_INSTALL_COMMAND,
      "postinstall"
    );
    const packageJsonWithAllCommand = addCommandToScript(
      packageJsonWithPostinstall,
      POST_UNINSTALL_COMMAND,
      "postuninstall"
    );
    await this.writeJsonFile(packageJsonWithAllCommand, this.packageJsonPath);
    const yjsonObject = {
      name: this.packageJson.name,
      packageJsonPath: this.packageJsonPath,
      dependencies: {},
    };
    await this.writeYjson(yjsonObject);
  }
}
