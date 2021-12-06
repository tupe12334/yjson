import Command from "../base";
import Add, { AddActionsEnum } from "./add";
export default class Update extends Command {
  async run(): Promise<void> {
    if (!this.packageJson.dependencies)
      throw new Error("Package.json is missing dependencies property");

    for (const dependency of Object.entries(this.packageJson.dependencies)) {
      const dependencyName = dependency[0];
      if (this.yJson.dependencies[dependencyName]) {
      } else {
        await Add.run([dependencyName, `--action=${AddActionsEnum.Update}`]);
      }
    }
  }
}
