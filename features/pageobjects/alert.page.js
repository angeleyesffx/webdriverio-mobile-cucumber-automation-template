import { $, driver } from '@wdio/globals';
import Page from './page.js';

const SELECTORS = {
    android: {
        title: '*//android.widget.TextView[@resource-id="com.wdiodemoapp:id/alert_title"]',
        message: '*//android.widget.TextView[@resource-id="android:id/message"]',
        button: (text) => `*//android.widget.Button[@text="${text.toUpperCase()}"]`,
    },
    ios: {
        alert: "-ios predicate string:type == 'XCUIElementTypeAlert'",
    },
};

class NativeAlertPage extends Page {
    get screenSelector() {
        return driver.isAndroid ? SELECTORS.android.title : SELECTORS.ios.alert;
    }

    async waitForIsShown(isShown = true) {
        return $(this.screenSelector).waitForExist({ timeout: 11000, reverse: !isShown });
    }

    async text() {
        if (driver.isIOS) {
            return $(SELECTORS.ios.alert).getText();
        }
        const title = await $(SELECTORS.android.title).getText();
        const message = await $(SELECTORS.android.message).getText();
        return `${title}\n${message}`;
    }

    async dismiss(buttonText = 'OK') {
        const selector = driver.isAndroid ? SELECTORS.android.button(buttonText) : `~${buttonText}`;
        await $(selector).click();
        await this.waitForIsShown(false);
    }
}

export default new NativeAlertPage();
