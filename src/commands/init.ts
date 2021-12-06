import Command from "@oclif/command";

export default class Init extends Command {
  static description = "init a y.json file in a repository";

  static examples = [`$ yjson init`];
  run(): PromiseLike<any> {
    throw new Error("Method not implemented.");
  }
}
