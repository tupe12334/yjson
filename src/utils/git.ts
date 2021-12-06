import { spawnSync, execSync } from "child_process";
const gitConfigCommand = "git config --list";

export async function getUserEmail(): Promise<any> {
  const email = execSync(gitConfigCommand)
    .toString()
    .match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)![0];
  if (!email) throw new Error(`Missing email from ${gitConfigCommand}`);

  return email;
}
