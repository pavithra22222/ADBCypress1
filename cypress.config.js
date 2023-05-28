const { defineConfig } = require("cypress");

const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");

// import { sqlQueryPlugin } from 'cypress-multiple-db-sql-server';

const { sqlQueryPlugin } = require('cypress-multiple-db-sql-server');
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({

  //for only junit reports
  /*
  reporter: 'mocha-junit-reporter',
  reporterOptions: {
    mochafile: 'cypress/reports/junitreport-[hash].xml',
    toConsole: true
  },*/

  //for mocha html reports

  /*reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'test-report',
    overwrite: false,
    saveJson: true,
    saveHtml: true,

    reportFilename: 'cypressreport',
    timestamp: 'yyyy_mm_dd_hh_MM',

    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },*/

  //for multiple/both mocha html and junit reports

  reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
  reporter: 'cypress-multi-reporters',

  reporterOptions: {
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      saveJson: true,
      saveHtml: true,

      reportFilename: "cypressreport",
      timestamp: "yyyy_mm_dd_hh_MM",
      charts: true,
      reportPageTitle: "custom-title",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },

    mochaJunitReporterReporterOptions: {
      mochafile: "cypress/reports/junitreport-[hash].xml",
      toConsole: true,
    },
  },

  mochaJunitReporterReporterOptions: {
    mochafile: 'cypress/reports/junitreport-[hash].xml',
    toConsole: true
  },


  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  taskTimeout: 80000,
  pageLoadTimeout: 150000,

  env: {
    envurl: 'env3',
    appUrl: 'https://www.amazon.in',
    titlekeyword: "Online",
    env1: 'https://www.google.com',
    env2: 'https://www.bing.com',
    env3: 'https://noumena-web-staging.web.app/login',
    env4: 'https://noumena-web.web.app/',

    db: {
      authentication: {
        type: 'default',
        options: {
          userName: 'sa',
          password: 'sqladmin@123'
        }
      },
      server: '172.16.0.56',
      options: {
        database: '',
        encrypt: true,
        rowCollectionOnRequestCompletion: true,
        trustServerCertificate: true,
        port: 1433, // Default Port
      }
    }

  },


  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', { downloadFile })
      on('task', { ...sqlQueryPlugin });
      // implement node event listeners here
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse(),
      });

      preprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );
      allureWriter(on, config);
      return config;

    },

    // specPattern: 'cypress/E2E/*.js',
    defaultCommandTimeout: 15000,
    retries: 0,

    // setupNodeEvents,
    specPattern: ["cypress/E2E/features/*.feature", 'cypress/E2E/*.js'],
    baseUrl: "https://www.amazon.in",
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    },

  },
});

