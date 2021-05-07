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
  .epilog('application')
  .argv;

const paths = {
  entry: path.normalize(path.resolve(__dirname, argv.entry)),
  output: path.normalize(path.resolve(__dirname, argv.output))
};

const groupFiles = () => {
  // check entry folder
  fs.access(paths.entry, (err) => {
    if (err) {
      console.error(`Error: Can't find an entry folder - ${paths.entry} `);
      process.exit(1);
    }

    // check if result folder already exists
    fs.access(paths.output, (err) => {
      if (err) {
        // create result folder
        fs.mkdir(paths.output, () => {
          console.log('✓ Created the output folder');
          console.log('');
          console.log('Started to move files:');

          // parse files
          parseFiles(paths.entry, paths.output);
        });
      } else {
        console.error(`Error: Can't create a result folder, folder ${paths.output} it is already exists`);
        process.exit(1);
      }
    });
  });
};

groupFiles();
