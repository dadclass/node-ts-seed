import fs from 'fs';
import path from 'path';
import util from 'util';
import logger from './logger';

export class App {
  protected readonly PROJECT_ROOT: string = process.cwd();
  public readonly README_FILE: string = this.PROJECT_ROOT + '/README.md';
  public readonly PKG_LOCK_FILE: string = this.PROJECT_ROOT + '/package-lock.json';
  public readonly PKG_FILE: string = path.join(__dirname, '../package.json'); // __dirname is where current file (app.ts) is located

  private readonly WRITE = util.promisify(fs.writeFile); // promisify() wraps fs.writeFile() to return a Promise
  private readonly READ = util.promisify(fs.readFile);

  public getProjectName(): string {
    return this.PROJECT_ROOT.substring(this.PROJECT_ROOT.lastIndexOf(path.sep) + 1);
  }

  public capWords(str: string): string {
    return str
      .toLowerCase()
      .split('-')
      .map(word => {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(' ');
  }

  public renameProject(filePath: string, fileContent: string, rxSearch: RegExp, strReplace: string): string {
    if (filePath === this.PKG_FILE) {
      return fileContent.replace(rxSearch, strReplace).replace(/dadclass\/node-ts-seed/g, '<change-me>');
    }
    return fileContent.replace(rxSearch, strReplace);
  }

  public async initFile(filePath: string, rxSearch: RegExp, strReplace: string) {

    let data: string;
    try {
      data = await this.READ(filePath, 'utf8');
      const replaced = this.renameProject(filePath, data, rxSearch, strReplace);
      await this.WRITE(filePath, replaced);
      data = await this.READ(filePath, 'utf8');
    } catch (err) {
      logger.error(`initFile>>> ${err}`);
    }
  }
}

const app = new App();

const projectName = app.getProjectName();
logger.debug(`project name is ${projectName}`);
const projectDesc = app.capWords(projectName);
logger.debug(`project description is ${projectDesc}`);

app.initFile(app.README_FILE, /Node Typescript Seed Project/, projectDesc.toUpperCase()); // TODO: remove toUpperCase()
app.initFile(app.PKG_LOCK_FILE, /node-ts-seed/, projectName.toUpperCase());
app.initFile(app.PKG_FILE, /node-ts-seed/, projectName.toUpperCase());
