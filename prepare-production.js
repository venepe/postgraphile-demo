const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

const LETS_ENCRYPT_CERT_DIR = '/etc/letsencrypt/live/babelpack.com';
const CERT_DIR = path.resolve(__dirname, 'etc/letsencrypt/live/babelpack.com');

glob('./@(Docker*|docker*)', {}, function(er, files) {
  console.log(files);
  files.forEach(function(file) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }
      const result = data.replace(/3000/g, '80');

      fs.writeFile(file, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });
  });
});

fs.ensureSymlink(LETS_ENCRYPT_CERT_DIR, CERT_DIR, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Let\'s Encrypt symlink created');
  }
});
