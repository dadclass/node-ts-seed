import fs from "fs";
import path from "path";
import util from "util";

export class App {
  public readonly README_FILE: string = "README.1.md";
  public readonly PKG_LOCK_FILE: string = "package-lock.1.json";
  public readonly PKG_FILE: string = "package.1.json";

  public readonly WRITE = util.promisify(fs.writeFile);
  public readonly READ = util.promisify(fs.readFile);

  public buildPath(filename: string): string {
    return path.join(__dirname, `../${filename}`);
  }

  public getProjectName(): string {
    const projectRootPath: string = process.cwd();
    return projectRootPath.substring(projectRootPath.lastIndexOf(path.sep) + 1);
  }

  public capWords(str: string): string {
    return str
      .toLowerCase()
      .split("-")
      .map(word => {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(" ");
  }

  public async initFile(fileName: string, rxSearch: RegExp, strReplace: string) {
    const filePath: string = this.buildPath(fileName);

    let data: string;
    try {
      data = await this.READ(filePath, "utf8");
      const replaced = this.resetProject(fileName, data, rxSearch, strReplace);
      await this.WRITE(filePath, replaced);
      data = await this.READ(filePath, "utf8");
      console.log(data);
    } catch (err) {
      console.log(`initFile>>> $err`);
    }
  }

  public resetProject(
    fileName: string,
    fileContent: string,
    rxSearch: RegExp,
    strReplace: string
  ): string {
    if (fileName === this.PKG_FILE) {
      return fileContent
        .replace(rxSearch, projectName)
        .replace(/dadclass\/node-ts-seed/g, "<change-me>");
    }
    return fileContent.replace(rxSearch, strReplace);
  }
}
const app = new App();
// const projectName = app.getProjectName();
// const projectDesc = app.capWords(projectName);
// console.log(`project name is ${projectName}`);
// console.log(`project desc is ${projectDesc}`);

const projectDesc = "My New Project";
const projectName = "my-new-project";
app.initFile(app.README_FILE, /Node Typescript Seed Project/, projectDesc);
app.initFile(app.PKG_LOCK_FILE, /node-ts-seed/, projectName);
app.initFile(app.PKG_FILE, /node-ts-seed/, projectName);
