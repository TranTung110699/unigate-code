/**
 * Created by hungvo on 28/09/17.
 */
const fs = require('fs');

function readWriteSync() {
  try {
    // fs.createReadStream('src/routes/admin-async.js').pipe(fs.createWriteStream('src/routes/admin.js'));
    // fs.createReadStream('src/routes/frontend-async.js').pipe(fs.createWriteStream('src/routes/frontend.js'));
  } catch (e) {
    console.log(e);
    console.log('copy file fail');
  }
}

readWriteSync();
