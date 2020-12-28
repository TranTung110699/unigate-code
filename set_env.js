// You can run command like `node set_env.js ggg` to change content of .env file
const fs = require('fs');

function readWriteSync() {
  const env = process.argv[2] || '';
  if (env) {
    try {
      const data = fs.readFileSync('.envs/' + env, 'utf-8');
      fs.writeFileSync('build/settings.js', data, 'utf-8');
      console.log('env ' + env + ' setup');
    } catch (e) {
      console.log('File ./envs/' + env + ' does NOT exist');
    }
  } else {
    console.log('Help: node set_env.js ggg');
  }
}

readWriteSync();
