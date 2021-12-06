import { writeFileSync } from "fs";
import Command from "../base";

export default class Init extends Command {
  static description = "init a y.json file in a repository";
  static examples = [`$ yjson init`];
  static flags = {
    ...Command.flags,
  };
  async run(): Promise<void> {
    const yjsonObject = {
      name: this.packageJson.name,
      packageJsonPath: this.packageJsonPath,
      dependencies: {},
    };
    await this.writeYjson(yjsonObject);
  }
}
