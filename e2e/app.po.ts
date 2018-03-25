<<<<<<< HEAD
import { browser, by, element } from 'protractor';

export class AppPage {
=======
import { browser, element, by } from 'protractor';

export class FirestarterPage {
>>>>>>> a41f19bb9a5759d48edb55674429507ae160a07a
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
