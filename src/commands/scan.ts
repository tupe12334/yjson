import Command, { AddActionsEnum } from "../baseCrud";
import Add from "./add";
export default class Scan extends Command {
  static description =
    "Make sure that the y.json is up to date with the package.json";
  static examples = [`$ yjson scan`];

  async run(): Promise<void> {
    if (!this.packageJson.dependencies)
      throw new Error("Package.json is missing dependencies property");

    for (const dependency of Object.entries(this.packageJson.dependencies)) {
      const dependencyName = dependency[0];
      if (this.yJson.dependencies[dependencyName]) {
      } else {
        await Add.run([dependencyName, `--action=${AddActionsEnum.Scan}`]);
      }
    }
  }
}
