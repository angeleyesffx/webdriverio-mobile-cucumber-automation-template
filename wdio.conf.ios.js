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
    // Simulator boot (~2min) + log capture & app install (~2min) + a cold WDA
    // xcodebuild compile (verified via showXcodeLog: it's genuinely compiling,
    // not stuck) can together take 10+ minutes on a GitHub-hosted macOS runner.
    // The outer client timeout must exceed setup time + the inner WDA timeout,
    // otherwise it aborts before WDA's own timeout has a chance to fire.
    connectionRetryTimeout: 900000,
    capabilities: [{
        'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '18.5',
        'appium:platformName': 'iOS',
        'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 16',
        'appium:automationName': 'XCUITest',
        'appium:wdaLaunchTimeout': 600000,
        'appium:wdaConnectionTimeout': 600000,
        // Surface xcodebuild's own output if WDA fails to build/launch instead
        // of just seeing a silent client-side timeout.
        'appium:showXcodeLog': true,
        ...appCapability,
        'appium:fullReset': true
    }]
};
