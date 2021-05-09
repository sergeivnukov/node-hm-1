const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const util = require('util');
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
  .epilog('application')
  .argv;

const paths = {
  entry: path.normalize(path.resolve(__dirname, argv.entry)),
  output: path.normalize(path.resolve(__dirname, argv.output))
};

const asyncAccess = util.promisify(fs.access);
const asyncMkdir = util.promisify(fs.mkdir);

const groupFiles = async () => {
  // check entry folder
  try {
    await asyncAccess(paths.entry);
  } catch (err) {
    console.error(`Error: Can't find an entry folder - ${paths.entry} `);
    process.exit(1);
  }

  let outputFolderExists = true;

  try {
    await asyncAccess(paths.output);
  } catch (err) {
    outputFolderExists = false;
  }

  if (outputFolderExists) {
    console.error(`Error: Can't create a result folder, folder ${paths.output} it is already exists`);
    process.exit(1);
  }

  try {
    await asyncMkdir(paths.output);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('✓ Created the output folder');
  console.log('');
  console.log('Started to move files:');

  await parseFiles(paths.entry, paths.output);
};

groupFiles();
