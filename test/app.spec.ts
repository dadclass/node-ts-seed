import { expect } from 'chai';
import { App } from '../src/app';

describe('App', () => {
    let app: App;

    beforeEach( () => {
        app = new App();
    });

    it('getProjectName() returns project root folder name', () => {
        expect(app.getProjectName()).to.equal('node-ts-seed');
    });

    it('capWords() returns capitalized words separated by spaces from the input of hyphen separated words', () => {
        expect(app.capWords("this-is-A-test")).to.equal('This Is A Test');
    });
});