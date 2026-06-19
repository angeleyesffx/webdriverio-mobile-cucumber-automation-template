export const config = {
    runner: 'local',
    specs: [],
    exclude: [],
    maxInstances: 1,
    capabilities: [],

    logLevel: 'info',
    logLevels: {
        '@wdio/appium-service': 'debug',
    },
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [['appium', { command: './node_modules/.bin/appium' }]],

    framework: 'cucumber',

    specFileRetries: 1,
    specFileRetriesDelay: 2,
    specFileRetriesDeferred: false,

    reporters: ['spec'],

    cucumberOpts: {
        import: ['./features/step-definitions/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
    },

    afterScenario: async function (_world, result) {
        if (!result.passed) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            await browser.saveScreenshot(`./reports/screenshots/failure_${timestamp}.png`);
        }
    },
};
