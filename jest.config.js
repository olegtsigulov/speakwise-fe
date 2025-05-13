module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        // Handle CSS imports
        '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
        // Handle image imports
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js',
        // Использование моков для проблемных модулей
        "^axios$": "<rootDir>/src/__mocks__/axios.js",
        "^react-router-dom$": "<rootDir>/src/__mocks__/react-router-dom.jsx",
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            isolatedModules: true
        }],
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)'
    ],
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.ts'
    ],
    testMatch: [
        '**/__tests__/**/*.ts?(x)',
        '**/?(*.)+(spec|test).ts?(x)'
    ],
}; 