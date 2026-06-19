import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

import LoginPage from '../pageobjects/login.page.js';
import AlertPage from '../pageobjects/alert.page.js';
import { DataPool } from '../utils/Datapool.js';

Given(/^I am on the login page$/, async () => {
    await LoginPage.open();
});

When(/^I login with valid credentials$/, async () => {
    await LoginPage.login(DataPool.credentials.valid.username, DataPool.credentials.valid.password);
});

When(/^I sign up with valid credentials$/, async () => {
    await LoginPage.signUp(
        DataPool.credentials.valid.username,
        DataPool.credentials.valid.password
    );
});

When(/^I login with invalid credentials$/, async () => {
    await LoginPage.login(
        DataPool.credentials.invalid.username,
        DataPool.credentials.invalid.password
    );
});

When(/^I login with empty credentials$/, async () => {
    await LoginPage.login(DataPool.credentials.empty.username, DataPool.credentials.empty.password);
});

Then(/^I should see a native alert saying (.+)$/, async (message) => {
    await AlertPage.waitForIsShown();
    expect(await AlertPage.text()).toContain(message);
    await AlertPage.dismiss();
});
