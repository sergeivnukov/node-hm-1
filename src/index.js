const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const parseFiles = require('./parseFiles');

const argv = yargs
  .help('help')
  .alias('help', 'h')
  .version('0.0.1')
  .alias('version', 'v')
  .usage('Usage: node $0 [options]')
  .example('node $0 -e [path]')
  .option('entry', {
    alias: 'e',
    describe: 'Path to entry folder',
    demandOption: true
  })
  .option('output', {
    alias: 'o',
    describe: 'Path to output folder',
    default: '../output'
  })
  .option('delete', {
    alias: 'D',
    describe: 'Delete entry folder?',
    type: 'boolean',
    default: false
  })
  .epilog('application')
  .argv;

const paths = {
  entry: path.normalize(path.resolve(__dirname, argv.entry)),
  output: path.normalize(path.resolve(__dirname, argv.output))
};

global.paths = paths;
global.delete = argv.delete;

const groupFiles = () => {
  if (fs.existsSync(paths.output)) {
    console.error(`Error: Can't create a result folder, folder ${global.paths.output} it is already exists`);
    process.exit(1);
  } else {
    fs.mkdirSync(paths.output);
    console.log('✓ Created the output folder');
    console.log('');
  }

  console.log(`  ${argv.delete ? 'Started to move files:' : 'Started to copy files:'}`);
  parseFiles(paths.entry);

  console.log('');
  console.log('✓ Files was successfully grouped by first letter!');
  console.log(`  Result is here - ${paths.output}`);
  console.log('');
  process.exit(0);
};

groupFiles();
