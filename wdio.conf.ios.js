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
    // First run on a fresh CI runner builds and signs WebDriverAgent via xcodebuild,
    // which alone can take longer than the default 2-minute session timeout.
    connectionRetryTimeout: 300000,
    capabilities: [{
        'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '18.5',
        'appium:platformName': 'iOS',
        'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 16',
        'appium:automationName': 'XCUITest',
        'appium:wdaLaunchTimeout': 300000,
        'appium:wdaConnectionTimeout': 300000,
        ...appCapability,
        'appium:fullReset': true
    }]
};
