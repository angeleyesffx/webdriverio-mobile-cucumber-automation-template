import { join } from 'path';
import { existsSync } from 'fs';
import { config as baseConfig } from './wdio.conf.js';

const androidAppPath = join(process.cwd(), 'application/android/test.apk');
const hasApp = existsSync(androidAppPath);

// Falls back to Chrome browser when no APK is present (e.g. CI without a real app)
const appCapability = hasApp
    ? {
        ...(process.env.APP_ID && { 'appium:bundleId': process.env.APP_ID }),
        'appium:app': androidAppPath
    }
    : { browserName: 'Chrome' };

export const config = {
    ...baseConfig,
    port: 4723,
    specs: ['./features/**/*.feature'],
    capabilities: [{
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '13.0',
        'appium:platformName': 'Android',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'sdk_gphone64_arm64',
        'appium:udid': process.env.ANDROID_UDID || 'emulator-5554',
        'appium:automationName': 'UIAutomator2',
        'appium:uiautomator2ServerInstallTimeout': 60000,
        ...appCapability,
        ...(process.env.UNLOCK_KEY && {
            'appium:unlockType': 'pin',
            'appium:unlockKey': process.env.UNLOCK_KEY
        }),
        'appium:fullReset': true
    }]
};
