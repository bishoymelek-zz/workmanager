<<<<<<< HEAD
import { AppPage } from './app.po';

describe('work-manager App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
=======
import { FirestarterPage } from './app.po';

describe('firestarter App', () => {
  let page: FirestarterPage;

  beforeEach(() => {
    page = new FirestarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
>>>>>>> a41f19bb9a5759d48edb55674429507ae160a07a
  });
});
