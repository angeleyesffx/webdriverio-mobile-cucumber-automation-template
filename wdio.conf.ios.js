import { join } from 'path';
import { existsSync } from 'fs';
import { config as baseConfig } from './wdio.conf.js';

const iosAppPath = join(process.cwd(), 'application/ios/test.app');
const hasApp = existsSync(iosAppPath);

// Falls back to Safari browser when no .app is present (e.g. CI without a real app)
const appCapability = hasApp
    ? {
        ...(process.env.BUNDLE_ID && { 'appium:bundleId': process.env.BUNDLE_ID }),
        'appium:app': iosAppPath
    }
    : { browserName: 'Safari' };

export const config = {
    ...baseConfig,
    port: 4723,
    specs: ['./features/**/*.feature'],
    capabilities: [{
        'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '18.5',
        'appium:platformName': 'iOS',
        'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 16',
        'appium:automationName': 'XCUITest',
        ...appCapability,
        'appium:fullReset': true
    }]
};
