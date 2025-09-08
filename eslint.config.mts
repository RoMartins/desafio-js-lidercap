import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default defineConfig([
    {
        ignores: ['dist'],

        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'space-before-function-paren': ['error', 'never'],
            'arrow-spacing': ['error', { before: true, after: true }],
            'key-spacing': ['error', { beforeColon: false, afterColon: true }],
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'eol-last': ['error', 'always'],
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
            'no-duplicate-imports': 'error',
            'no-console': 'warn',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^I[A-Z]',
                        match: true,
                    },
                },
            ],
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    prettier,
    {
        rules: {
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]);
