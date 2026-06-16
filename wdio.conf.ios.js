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
    // Simulator boot (~100s) + app install (~20s) + WDA xcodebuild from a cold
    // derived-data cache (2-5min) can together exceed a 5-minute session timeout,
    // so the client-side budget needs more headroom than any single inner step.
    connectionRetryTimeout: 600000,
    capabilities: [{
        'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '18.5',
        'appium:platformName': 'iOS',
        'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 16',
        'appium:automationName': 'XCUITest',
        'appium:wdaLaunchTimeout': 540000,
        'appium:wdaConnectionTimeout': 540000,
        // Surface xcodebuild's own output if WDA fails to build/launch instead
        // of just seeing a silent client-side timeout.
        'appium:showXcodeLog': true,
        ...appCapability,
        'appium:fullReset': true
    }]
};
