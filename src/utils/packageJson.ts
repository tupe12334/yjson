import { join } from "path";

export function packageJsonPath() {
  const packageJsonPath = join(process.cwd(), "package.json");
  return packageJsonPath;
}

export function packageJsonAfterValidation(path: string) {
  return require(path);
}
