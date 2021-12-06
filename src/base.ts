import Command, { flags } from "@oclif/command";
import { writeFileSync } from "fs";
import {
  packageJsonAfterValidation,
  packageJsonPath,
} from "./utils/packageJson";
import { yJsonAfterValidation, yJsonPath } from "./utils/yJson";
import { format } from "prettier";

export default abstract class extends Command {
  static flags = {
    packageJsonPath: flags.string({ char: "p" }),
  };
  packageJsonPath!: string;
  packageJson: any;
  yJsonPath!: string;
  yJson: any;
  async init() {
    //@ts-ignore
    const { flags } = this.parse(this.constructor);
    this.packageJsonPath = packageJsonPath();
    this.packageJson = packageJsonAfterValidation(this.packageJsonPath);
    this.packageJsonPath = packageJsonPath();
    this.yJsonPath = yJsonPath();
    this.yJson = yJsonAfterValidation(this.yJsonPath);
    //@ts-ignore
    this.flags = flags;
  }

  async writeYjson(content: Object) {
    await writeFileSync(
      this.yJsonPath,
      format(JSON.stringify(content), { parser: "json" })
    );
  }
}