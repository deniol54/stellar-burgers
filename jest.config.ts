/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from 'jest';

const config: Config = {
    // transform: {
    //     '\\.[jt]sx?$': 'ts-jest'
    // },
    // globals: {
    //     'ts-jest': {
    //         useESM: true
    //     }
    // },
    moduleNameMapper: {
      "^@pages": "<rootDir>/src/pages",
      "^@components": "<rootDir>/src/components",
      "^@ui": "<rootDir>/src/components/ui",
      "^@ui-pages": "<rootDir>/src/components/ui/pages",
      "^@utils-types": "<rootDir>/src/utils/types",
      "^@api": "<rootDir>/src/utils/burger-api.ts",
      "^@slices": "<rootDir>/src/services/slices",
      "^@selectors": "<rootDir>/src/services/selectors"
      },
    modulePaths: [
      "<rootDir>"
    ],
    extensionsToTreatAsEsm: ['.ts']
};

export default config;