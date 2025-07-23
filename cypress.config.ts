const { defineConfig } = require('cypress');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

export default defineConfig({
  video: true,
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 60000,
  chromeWebSecurity: false,
  port: 8080,
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/reports/screenshots',
  videosFolder: 'cypress/reports/videos',
  theme: 'dark',
  e2e: {
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
    specPattern: 'cypress/integration/**/*.feature',
    excludeSpecPattern: ['*.md']
  },
});
