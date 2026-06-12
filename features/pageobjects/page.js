import { $ } from '@wdio/globals';
import * as dotenv from 'dotenv';

dotenv.config({ path: './configuration/.env' });

export default class Page {
    get screenSelector() {
        throw new Error('screenSelector must be defined in subclass');
    }

    async waitForIsShown(isShown = true) {
        return $(this.screenSelector).waitForDisplayed({ reverse: !isShown });
    }
}
