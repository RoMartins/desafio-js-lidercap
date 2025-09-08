// eslint-disable-next-line no-undef
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@main/(.*)$': '<rootDir>/src/main/$1',
        '^@application/(.*)$': '<rootDir>/src/application/$1',
        '^@domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@infra/(.*)$': '<rootDir>/src/infra/$1',
        '^@kernel/(.*)$': '<rootDir>/src/kernel/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    },
    testMatch: ['**/tests/integration/**/*.test.ts'],
};
