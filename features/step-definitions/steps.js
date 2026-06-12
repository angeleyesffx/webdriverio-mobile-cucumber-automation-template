import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

import LoginPage from '../pageobjects/login.page.js';
import AlertPage from '../pageobjects/alert.page.js';

Given(/^I am on the login page$/, async () => {
    await LoginPage.open();
});

When(/^I login with (.+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password);
});

When(/^I sign up with (.+) and (.+)$/, async (username, password) => {
    await LoginPage.signUp(username, password);
});

Then(/^I should see a native alert saying (.+)$/, async (message) => {
    await AlertPage.waitForIsShown();
    expect(await AlertPage.text()).toContain(message);
    await AlertPage.dismiss();
});
