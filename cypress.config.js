const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br',
    specPattern: 'cypress/integration/**/*.spec.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    reportFilename: 'index.html',
    overwrite: false,
    html: true,
    json: true,
  },
})
