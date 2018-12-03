const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');


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
