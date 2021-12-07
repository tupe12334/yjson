import { flags } from "@oclif/command";
import Command from "./base";

export type Dependency = {
  name: string;
  version: string;
};

export enum AddActionsEnum {
  "Add" = "Add",
  "Update" = "Update",
  "Scan" = "Scan",
}

export default abstract class extends Command {
  static PACKAGE_NAME_ARG_KEY = "packageName";

  static flags = {
    packageJsonPath: flags.string({ char: "p" }),
  };
  static args = [{ name: this.PACKAGE_NAME_ARG_KEY, required: false }];

  async init() {
    super.init();
  }
  getDependencies(): Dependency[] {
    if (!this.packageJson.dependencies)
      throw new Error("Package.json is missing dependencies property");

    return Object.entries(this.packageJson.dependencies).map((dependency) => ({
      name: dependency[0],
      version: dependency[1],
    }));
  }
  getDevDependencies(): Dependency[] {
    if (!this.packageJson.devDependencies)
      throw new Error("Package.json is missing dependencies property");

    return Object.entries(this.packageJson.devDependencies).map(
      (dependency) => ({
        name: dependency[0],
        version: dependency[1],
      })
    );
  }
  allDependenciesList(): Dependency[] {
    const dependenciesLists = Object.values(this.getAllDependencies());
    return dependenciesLists.flat();
  }
  getAllDependencies(): {
    dependencies: Dependency[];
    devDependencies: Dependency[];
  } {
    return {
      dependencies: this.getDependencies(),
      devDependencies: this.getDevDependencies(),
    };
  }
}
