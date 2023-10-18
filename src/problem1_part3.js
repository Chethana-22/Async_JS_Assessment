const fs = require('fs').promises;

 function createRandomJSONFile(filename) {
  const data = {
    key_1: Math.random(),
    key_2: Math.random(),
    key_3: Math.random(),
  };
  const jsonContent = JSON.stringify(data);

  try {
     fs.writeFile(filename, jsonContent);
    console.log(`${filename} created successfully.`);
  } catch (error) {
    throw new Error(`Error creating ${filename}: ${error.message}`);
  }
}

async function deleteFile(filename) {
  try {
    await fs.unlink(filename);
    console.log(`${filename} deleted successfully.`);
  } catch (error) {
    throw new Error(`Error deleting ${filename}: ${error.message}`);
  }
}

async function createAndDeleteFilesUsingAsync() {
  const filePromises = [];

  for (let i = 1; i <= 3; i++) {
    const filename = `asyncFile${i}.json`;

    const createPromise = createRandomJSONFile(filename);
    const deletePromise = deleteFile(filename);
    
    filePromises.push(createPromise, deletePromise);
  }

  try {
    await Promise.all(filePromises);
    console.log('All files created and deleted successfully.');
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

module.exports = createAndDeleteFilesUsingAsync;