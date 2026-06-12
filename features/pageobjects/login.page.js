import { $, driver } from '@wdio/globals';
import Page from './page.js';

class LoginPage extends Page {
    get screenSelector()  { return '~Login-screen'; }
    get inputEmail()      { return $('~input-email'); }
    get inputPassword()   { return $('~input-password'); }
    get inputRepeatPwd()  { return $('~input-repeat-password'); }
    get btnLogin()        { return $('~button-LOGIN'); }
    get btnSignUp()       { return $('~button-SIGN UP'); }
    get tabLogin()        { return $('~button-login-container'); }
    get tabSignUp()       { return $('~button-sign-up-container'); }

    async open() {
        await $('~Home').waitForDisplayed({ timeout: 20000 });
        await $('~Login').click();
        await this.waitForIsShown();
    }

    async login(username, password) {
        await this.tabLogin.click();
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        if (await driver.isKeyboardShown()) {
            await $(this.screenSelector).click();
        }
        await this.btnLogin.scrollIntoView({ scrollableElement: await $(this.screenSelector) });
        await this.btnLogin.click();
    }

    async signUp(username, password) {
        await this.tabSignUp.click();
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.inputRepeatPwd.setValue(password);
        if (await driver.isKeyboardShown()) {
            await $(this.screenSelector).click();
        }
        await this.btnSignUp.scrollIntoView({ scrollableElement: await $(this.screenSelector) });
        await this.btnSignUp.click();
    }
}

export default new LoginPage();
