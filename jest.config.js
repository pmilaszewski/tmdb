module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFiles: ['./jest/setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  fakeTimers: {
    enableGlobally: true,
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-reanimated|expo-modules-core|expo)/)',
  ],
  testMatch: ['<rootDir>/components/**/*.test.tsx'],
}
