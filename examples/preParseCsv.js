const csv = require('fast-csv');
const results = [];
const fs = require('fs');
const csvPath = 'examples/CLPrem_Coins_Axis_v1.csv';

var stream = fs.createReadStream(csvPath);

fs.createReadStream(csvPath, { headers: true })
  .pipe(csv())
  .on('data', function(data) {
    console.log(data);
  })
  .on('end', function() {
    console.log('done');
    console.timeEnd('readingcsv');
  });
