import fs from 'fs';
import path from 'path';
import util from 'util';
import log from './my-logger';

export class App {

  public readonly PROJECT_ROOT: string = process.cwd();
  public readonly README_FILE: string = this.PROJECT_ROOT + '/README.md';
  public readonly PKG_LOCK_FILE: string = this.PROJECT_ROOT + '/package-lock.json';

  // __dirname is where current file (app.ts) is located
  public readonly PKG_FILE: string = path.join(__dirname, '../package.json');
  public readonly TEST_FILE: string = this.PROJECT_ROOT + '/test/app.spec.ts';
  public readonly LOGGEE: string = path.basename(__filename);
  public readonly OLD_PROJECT_NAME: RegExp = /node-ts-seed/;
  public readonly OLD_PROJECT_DESC: RegExp = /Node Typescript Seed Project/;

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
      log.error(this.LOGGEE, `${err}`);
    }
  }
}

const app = new App();

const projectName = app.getProjectName();
log.debug(app.LOGGEE, `project name is ${projectName}`);
const projectDesc = app.capWords(projectName);

app.initFile(app.README_FILE, app.OLD_PROJECT_DESC, projectDesc);
log.debug(app.LOGGEE, `${app.OLD_PROJECT_DESC} in ${app.README_FILE} has been replaced to ${projectDesc}`);
app.initFile(app.PKG_LOCK_FILE, app.OLD_PROJECT_NAME, projectName);
log.debug(app.LOGGEE, `${app.OLD_PROJECT_NAME} in ${app.PKG_LOCK_FILE} has been replaced to ${projectName}`);
app.initFile(app.PKG_FILE, app.OLD_PROJECT_NAME, projectName);
log.debug(app.LOGGEE, `${app.OLD_PROJECT_NAME} in ${app.PKG_FILE} has been replaced to ${projectName}`);
app.initFile(app.TEST_FILE, app.OLD_PROJECT_NAME, projectName);
log.debug(app.LOGGEE, `${app.OLD_PROJECT_NAME} in ${app.TEST_FILE} has been replaced to ${projectName}`);

