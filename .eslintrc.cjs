module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: 'eslint:recommended',
    overrides: [
        {
            env: { node: true },
            files: ['.eslintrc.cjs'],
            parserOptions: { sourceType: 'script' }
        }
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest'
    },
    globals: {
        browser: 'readonly',
        driver: 'readonly',
        $: 'readonly',
        $$: 'readonly'
    },
    rules: {
        'no-unused-vars': 'warn',
        'no-console': 'warn'
    }
}
