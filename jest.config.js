export default {
  preset: "ts-jest",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
