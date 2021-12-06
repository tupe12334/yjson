import { spawnSync, execSync } from "child_process";

export async function getUserEmail(): Promise<any> {
  return execSync("git config --list")
    .toString()
    .match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)![0];
}
