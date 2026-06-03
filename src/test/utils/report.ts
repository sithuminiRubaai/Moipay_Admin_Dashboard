export {};

const fs = require('fs');
const path = require('path');
const report = require('multiple-cucumber-html-reporter');

const resultDir = path.resolve(process.cwd(), 'test-result');

if (!fs.existsSync(resultDir)) {
  console.log(`Report directory not found: ${resultDir}`);
  process.exit(0);
}

const jsonFiles = fs
  .readdirSync(resultDir)
  .filter((file: string) => file.toLowerCase().endsWith('.json'));

if (jsonFiles.length === 0) {
  console.log(`No JSON files found in '${resultDir}'. Skipping HTML report generation.`);
  process.exit(0);
}

report.generate({
  jsonDir: resultDir,
  reportPath: resultDir,
  durationInMS: true,
  displayDuration: false,
  pageTitle: 'Automation testing Report',
  metadata: {
    browser: {
      name: 'chrome',
      version: '120',
    },
    device: 'Sithumini Nimesha',
    platform: {
      name: 'Windows',
      version: '10',
    },
  },
  customData: {
    title: 'Playwright Cucumber Automation using Typescript',
    data: [
      { label: 'Project', value: 'Sample Project' },
      { label: 'Release', value: '1.2.3' },
      { label: 'Cycle', value: 'B11221.34321' },
    ],
  },
});
