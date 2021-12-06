import { join } from "path";
import { PackageJson } from "type-fest";
import { cloneDeep } from "lodash";
export function packageJsonPath() {
  const packageJsonPath = join(process.cwd(), "package.json");
  return packageJsonPath;
}

export function packageJsonAfterValidation(path: string): PackageJson {
  return require(path) as PackageJson;
}

export function addCommandToScript(
  packageJson: PackageJson,
  command: string,
  scriptName: string
): PackageJson {
  const newPackageJson = cloneDeep(packageJson);

  if (!newPackageJson.scripts)
    throw new Error("Scripts is missing in package.json");
  const script = newPackageJson.scripts[scriptName];
  if (script) {
    if (script.includes(command)) {
      return newPackageJson;
    } else {
      const newConcatScript = script + ` && ${command}`;
      newPackageJson.scripts[scriptName] = newConcatScript;
      return newPackageJson;
    }
  } else {
    newPackageJson.scripts[scriptName] = command;
  }
  return newPackageJson;
}
