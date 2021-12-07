import Command, { AddActionsEnum } from "../baseCrud";
import Add from "./add";
export default class Update extends Command {
  static description =
    "Make sure that the y.json is up to date with the package.json";
  static examples = [`$ yjson update`];

  async run(): Promise<void> {
    for (const dependency of this.allDependenciesList()) {
      const dependencyName = dependency.name;
      if (this.yJson.dependencies[dependencyName]) {
      } else {
        await Add.run([dependencyName, `--action=${AddActionsEnum.Update}`]);
      }
    }
  }
}
