import { join } from "path";

export function yJsonPath(): string {
  const packageJsonPath = join(process.cwd(), "y.json");
  return packageJsonPath;
}

export function yJsonAfterValidation(path: string) {
  try {
    return require(path);
  } catch (error) {}
}
