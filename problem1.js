const fs = require('fs');

const createAndDeleteUsingCallbacks = require('./src/problem1_part1');
const createAndDeleteFilesUsingPromises = require('./src/problem1_part2');
const createAndDeleteFilesUsingAsync = require('./src/problem1_part3');

function createRandomJSONFile(filename, callback) {
  const data = {
    key1: Math.random(),
    key2: Math.random(),
    key3: Math.random(),
  };
  const jsonContent = JSON.stringify(data);

  fs.writeFile(filename, jsonContent, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null, filename);
    }
  });
}

function deleteFile(filename, callback) {
  fs.unlink(filename, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null, filename);
    }
  });
}

// console.log("-------Using Callback functions-------");
createAndDeleteUsingCallbacks(createRandomJSONFile, deleteFile);

// console.log("-------Using Promises and Callback---------");
createAndDeleteFilesUsingPromises(createRandomJSONFile, deleteFile);

// console.log("-------Using Async and Await---------");
createAndDeleteFilesUsingAsync();

